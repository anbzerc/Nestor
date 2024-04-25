import argparse
import pathlib
from threading import Thread

import numpy as np
import speech_recognition as sr
from faster_whisper import WhisperModel
from datetime import datetime, timedelta
from queue import Queue
from time import sleep
from sys import platform

from Utils import Colors
from PluginControl import PluginControl
from Utils.ActionParser import action_parser, get_plugins_litterals
from Utils.Verbose import verbose_print

class Nestor ():
    def __init__(self, audio_data_queue: Queue, model: str):
        """
        init constructor for Nestor instance
        :param audio_data_queue: a queue in which the audio data from the node frontend will be added
        """
        #
        # Queues
        #

        # Thread safe Queue for passing data from the threaded recording callback.
        self.data_queue = audio_data_queue

        # One queue to check if we continue another for the text data
        self.must_continue = Queue()
        self.text_data = Queue()
        if model == "whisper-large-v3-french" :
            self.audio_model = WhisperModel("./models/whisper-large-v3-french/ctranslate2", device="cuda")
        elif model == "whisper-large-v3-french-distil-dec16":
            self.audio_model = WhisperModel("./models/whisper-large-v3-french-distil-dec16/ctranslate2", device="cuda",
                                       compute_type="float16")
        elif model == "small":
            self.audio_model = WhisperModel("small", device="cuda")
        elif model == "medium":
            self.audio_model = WhisperModel("medium", device="cuda")
    def main(self):
        # Arguments parser

        # Set verbose mode
        is_verbose = True

        # Blank variable which will contain the transcription
        transcription = ['']
        # Variable which contain Nestor folder absolute path
        root_path = str(pathlib.Path().absolute()).split("Nestor")[0] + "Nestor"

        #
        #   Set an instance of our PluginControl class
        #
        PluginControlInstance = PluginControl()
        # And load plugins
        PluginControlInstance.load_plugins(is_verbose)


        print(Colors.info_message("Nestor ready.\n"))

        #
        # Main loop
        #
        while True:
            # Try except in order to end program if there's a Ctrl+c
            try:
                now = datetime.utcnow()
                # Pull raw recorded audio from the queue.
                if not self.data_queue.empty():
                    # This is the last time we received new audio data from the queue.
                    phrase_time = now

                    # Combine audio data from queue
                    audio_data = b''.join(self.data_queue.queue)
                    self.data_queue.queue.clear()

                    # Convert in-ram buffer to something the model can use directly without needing a temp file.
                    # Convert data from 16 bit wide integers to floating point with a width of 32 bits.
                    # Clamp the audio stream frequency to a PCM wavelength compatible default of 32768hz max.
                    audio_np = np.frombuffer(audio_data, dtype=np.int16).astype(np.float32) / 32768.0

                    # Read the transcription and save its duration
                    transcription_start_time = datetime.utcnow()
                    result, info = self.audio_model.transcribe(audio_np, language="fr", vad_filter=True)  # we set VAD filter on

                    # Iterate in segment because it's FasterWhisper
                    text_tmp = ""

                    for segment in result:
                        text_tmp += segment.text
                    text = text_tmp.strip()

                    transcription_end_time = datetime.utcnow()
                    transcription_duration = transcription_end_time - transcription_start_time

                    verbose_print(is_verbose, Colors.message_detected(transcription_duration, text))

                    # Add text to our transcription list
                    transcription.append(text)

                    # Dirty hotword check

                    if "nestor" in text.lower():

                        # Check if user said end command, if so we parse action only one time, and we cut the transcription given to the action parser
                        # after the 'merci nestor'
                        # If there's not 'merci nestor', we will call the plugin in a loop

                        if "merci nestor" not in text.lower():
                            # Parse user's input to know which action to do nad save its realization time
                            parsing_start_time = datetime.utcnow()

                            action_parsed = action_parser(text, root_path)

                            parsing_end_time = datetime.utcnow()
                            parsing_duration = parsing_end_time - parsing_start_time

                            # Check if action parsing was successful
                            if action_parsed["state"]:

                                # get the parsed name of the plugin to run
                                name = action_parsed["plugin"]

                                # Check if this name is not None

                                if name is not None:

                                    # and if so, we call the proper plugin, in a thread because we didn't get the end word 'merci Nestor'
                                    verbose_print(is_verbose, Colors.action_detected(parsing_duration, name))
                                    plugin = PluginControlInstance.get_plugin_by_name(name)

                                    # Clear text data queue and must_continue queue and
                                    # push the first data in text data queue and True in must continue queue
                                    self.text_data.queue.clear()
                                    self.text_data.put(text)

                                    self.must_continue.queue.clear()
                                    self.must_continue.put(True)

                                    # Set the thread in which the plugin will run
                                    thread = Thread(target=plugin.run, args=(self.must_continue, self.text_data))
                                    # Then start the thread
                                    thread.start()

                                    #
                                    # Loop to continue sending text to plugin (in its Thread) while close command has not been said,
                                    # and while the last element of must_continue queue is True (when the plugin end,
                                    # it add False to this queue)
                                    #
                                    print(Colors.info_message("Plugin loop started"))
                                    while self.must_continue.queue[-1]:

                                        # sleep for processor
                                        sleep(0.01)

                                        # Check if we got new audio, if so we'll do the same as before to transcribe audio
                                        # and we'll add transcribed text to text data queue
                                        if not self.data_queue.empty():

                                            # This is the last time we received new audio data from the queue.
                                            phrase_time = now
                                            # same as above
                                            audio_data = b''.join(self.data_queue.queue)
                                            self.data_queue.queue.clear()
                                            audio_np = np.frombuffer(audio_data, dtype=np.int16).astype(
                                                np.float32) / 32768.0

                                            # Read the transcription and save its duration
                                            transcription_start_time = datetime.utcnow()
                                            result, info = self.audio_model.transcribe(audio_np, language="fr")

                                            # Iterate in segment because it's FasterWhisper
                                            text_tmp = ""
                                            for segment in result:
                                                text_tmp += segment.text
                                            text = text_tmp.strip()
                                            transcription_end_time = datetime.utcnow()
                                            transcription_duration = transcription_end_time - transcription_start_time

                                            verbose_print(is_verbose, Colors.message_detected(transcription_duration, text))

                                            transcription.append(text)

                                            # Check if there's not 'merci nestor' in transcription
                                            if "merci nestor" in text.lower():
                                                # If so we put the transcription in queue and break the loop
                                                self.text_data.put(text.lower().split("merci nestor")[0] + "merci nestor")
                                                break
                                            else:
                                                # Add these data to data queue to give them to the plugin in its thread and iterate pne more time
                                                self.text_data.put(text)
                                    print(Colors.info_message("Plugin loop ended"))

                                # If action is None, display a proper message
                                else:
                                    print(Colors.parsing_error(parsing_duration, action_parsed["name"]))

                            # If action parsing's state is False, print Error message
                            else:
                                print(Colors.parsing_error(parsing_duration, action_parsed["input"]))

                        # If there's "merci nestor" in user input, we will parse action, etc, only one time
                        # and we give the text before "merci nestor"

                        else:
                            parsing_start_time = datetime.utcnow()
                            #parse action                 we split text by merci nestor, then select the part before merci nestor and add it for the plugin
                            action_parsed = action_parser(text.lower().split("merci nestor")[0] + "merci nestor", root_path)
                            parsing_end_time = datetime.utcnow()
                            parsing_duration = parsing_end_time - parsing_start_time

                            if action_parsed[0]:
                                # Get plugin name in action parser's return
                                name = action_parsed["plugin"]

                                # Get an instance of this plugin
                                plugin = PluginControlInstance.get_plugin_by_name(name)

                                # And execute run() method of the plugin in a thread
                                thread = Thread(plugin.run(text, ))
                                # Launch thread
                                thread.start()
                                # Print return in verbose

                                verbose_print(is_verbose, Colors.action_detected(parsing_duration, name))
                            else:
                                print(Colors.parsing_error(parsing_duration, action_parsed["plugin"]))
                    else:
                        verbose_print(is_verbose, Colors.not_for_nestor(transcription_duration, text))

                # If the audio data queue is empty, sleep a bit and restart
                else:
                    # Infinite loops are bad for processors, must sleep.
                    sleep(0.1)
            except KeyboardInterrupt:
                break

        print("\n\nTranscription:")
        for line in transcription:
            print(line)


