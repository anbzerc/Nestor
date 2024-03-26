import argparse
import configparser

import numpy as np
import speech_recognition as sr
from faster_whisper import WhisperModel
from datetime import datetime, timedelta
from queue import Queue
from time import sleep
from sys import platform

## File to record user's voice calling nestor to know whats is the transcription when called

print("Setup de Nestor")

parser = argparse.ArgumentParser()
parser.add_argument("--model", default="medium", help="Model to use",
                    choices=["tiny", "base", "small", "medium", "large"])
parser.add_argument("--non_english", action='store_true',
                    help="Don't use the english model.")
parser.add_argument("--energy_threshold", default=1000,
                    help="Energy level for mic to detect.", type=int)
parser.add_argument("--record_timeout", default=2,
                    help="How real time the recording is in seconds.", type=float)
parser.add_argument("--phrase_timeout", default=3,
                    help="How much empty space between recordings before we "
                         "consider it a new line in the transcription.", type=float)

if 'linux' in platform:
    parser.add_argument("--default_microphone", default='pulse',
                        help="Default microphone name for SpeechRecognition. "
                             "Run this with 'list' to view available Microphones.", type=str)
args = parser.parse_args()

# The last time a recording was retrieved from the queue.
phrase_time = None
# Thread safe Queue for passing data from the threaded recording callback.
data_queue = Queue()
# We use SpeechRecognizer to record our audio because it has a nice feature where it can detect when speech ends.
recorder = sr.Recognizer()
recorder.energy_threshold = args.energy_threshold
# Definitely do this, dynamic energy compensation lowers the energy threshold dramatically to a point where the SpeechRecognizer never stops recording.
recorder.dynamic_energy_threshold = False

# Important for linux users.
# Prevents permanent application hang and crash by using the wrong Microphone
if 'linux' in platform:
    mic_name = args.default_microphone
    if not mic_name or mic_name == 'list':
        print("Available microphone devices are: ")
        for index, name in enumerate(sr.Microphone.list_microphone_names()):
            print(f"Microphone with name \"{name}\" found")
    else:
        for index, name in enumerate(sr.Microphone.list_microphone_names()):
            if mic_name in name:
                source = sr.Microphone(sample_rate=16000, device_index=index)
                break
else:
    source = sr.Microphone(sample_rate=16000)

# Load / Download model


audio_model = WhisperModel("./models/whisper-large-v3-french-distil-dec16/ctranslate2", device="cuda",
                           compute_type="float16")
medium_model = WhisperModel("medium", device="cuda", compute_type="float16")

record_timeout = args.record_timeout
phrase_timeout = args.phrase_timeout

transcription_large = ['']
transcription_medium = ['']

with source:
    recorder.adjust_for_ambient_noise(source)


def record_callback(_, audio: sr.AudioData) -> None:
    """
    Threaded callback function to receive audio data when recordings finish.
    audio: An AudioData containing the recorded bytes.
    """
    # Grab the raw bytes and push it into the thread safe queue.
    data = audio.get_raw_data()
    data_queue.put(data)


# Create a background thread that will pass us raw audio bytes.
# We could do this manually but SpeechRecognizer provides a nice helper.
recorder.listen_in_background(source, record_callback, phrase_time_limit=record_timeout)

# Cue the user that we're ready to go.
print("Model loaded.\n")
print(
    "Le but est de dire 10 fois 'Nestor' avec des tons et des intonations différentes de façon à savoir quand vous l'appellerez")
n = 1
while n <= 10:
    try:
        now = datetime.utcnow()
        # Pull raw recorded audio from the queue.
        print("Enregistrement effectués : {}/10 \n Veuillez dire 'Nestor'".format(n))
        if not data_queue.empty():
            print(n, "fois")
            phrase_complete = False
            # If enough time has passed between recordings, consider the phrase complete.
            # Clear the current working audio buffer to start over with the new data.
            if phrase_time and now - phrase_time > timedelta(seconds=phrase_timeout):
                phrase_complete = True
            # This is the last time we received new audio data from the queue.
            phrase_time = now

            # Combine audio data from queue
            audio_data = b''.join(data_queue.queue)
            data_queue.queue.clear()

            # Convert in-ram buffer to something the model can use directly without needing a temp file.
            # Convert data from 16 bit wide integers to floating point with a width of 32 bits.
            # Clamp the audio stream frequency to a PCM wavelength compatible default of 32768hz max.
            audio_np = np.frombuffer(audio_data, dtype=np.int16).astype(np.float32) / 32768.0

    # Read the transcription. with medium and large models

        #Large :

            result_large, info = audio_model.transcribe(audio_np, language="fr")
            text_tmp = ""
            for segment in result_large:
                text_tmp += segment.text
            text_large_with_punc = text_tmp.strip()

            # Add a copy without punctuation
            punc = '''!()-[]{};:"\,<>./?@#$%^&*_~'''
            text_large_without_punc = ""

            for ele in text_large_with_punc:
                if ele not in punc:
                    text_large_without_punc += ele

        # Medium :

            result_medium, info1 = medium_model.transcribe(audio_np, language="fr")
            text_tmp = ""
            for segment in result_medium:
                text_tmp += segment.text
            text1_medium_with_punc = text_tmp.strip()

            # Add a copy without punctuation

            text1_medium_without_punc = ""

            for ele in text1_medium_with_punc:
                if ele not in punc:
                    text1_medium_without_punc += ele

            # If we detected a pause between recordings, add a new item to our transcription.
            # Otherwise edit the existing one.

            if phrase_complete:
                transcription_large.append(text_large_with_punc)
                transcription_large.append(text_large_without_punc)
                transcription_medium.append(text1_medium_with_punc)
                transcription_medium.append(text1_medium_without_punc)
            else:
                # should not happen
                print("Veuillez attendre 3 secondes entre les dictées")

            # Clear the console to reprint the updated transcription.
            # os.system('cls' if os.name == 'nt' else 'clear')
            n += 1
            # Flush stdout.
            print('', end='', flush=True)
        else:
            # Infinite loops are bad for processors, must sleep.
            sleep(0.1)
    except KeyboardInterrupt:
        break

config = configparser.ConfigParser()
config.read("config.ini")
config["Nestor voice config"] = {"medium": "$$".join(transcription_medium),
                                 "large": "$$".join(transcription_large)
                                 }
with open("Docs/config.ini", "w") as configfile:
    config.write(configfile)

print("\n\nTranscription:")
for line in transcription_large:
    print(line)
