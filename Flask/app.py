import queue
import sys
from threading import Thread

from faster_whisper import WhisperModel
from flask import Flask, render_template, request
from flask_cors import cross_origin

from Nestor import Nestor

sys.path.append('../Nestor/')
from Api.Plugins import *

def main():
    app = Flask(__name__)

    root_path = str(pathlib.Path().absolute()).replace("/Flask", "")

    # Set audio datas queues
    audio_data_queues = queue.Queue()

    # Set model
    #model = "whisper-large-v3-french"
    model = "small"
    # Get an instance of Nestor in a thread
    nestor = Nestor(audio_data_queues, model=model)
    nestor_thread = Thread(target=nestor.main)
    nestor_thread.start()
    @app.route("/")
    def hello_world():
        return render_template('main.html')


    @app.route('/plugins/')
    def hello():
        return render_template('Plugins.html')


    @app.route('/api/list', methods=['GET'])
    @cross_origin()
    def api_get_plugins_list():
        return get_plugins_list()

    @app.route('/api/plugins/install', methods=['POST'])
    @cross_origin()
    def install_plugin_api():
        response_json = request.get_json(force=True)
        name = response_json["name"]
        Thread(target=download_plugin(name, root_path)).start()
        print("Installing", name)
        return "true"


    @app.route('/api/plugins/remove', methods=['POST'])
    @cross_origin()
    def remove_plugin_api():
        response_json = request.get_json(force=True)
        name = response_json["name"]
        Thread(target=remove_plugin(name, root_path)).start()
        print("Removing", name)
        return "true"


    @app.route('/api/plugins/list', methods=['GET'])
    @cross_origin()
    def get_installed_plugin_list():
        return json.dumps(list_installed_plugins(root_path))

    @app.route('/api/nestor/audio', methods=['POST'])
    @cross_origin()
    def get_analyzed_audio():
        # Grab audio file in the request
        data = request.files['audio']
        saving_path = root_path+"/"+data.filename
        print("Saving to ", saving_path)
        data.save(saving_path)
        transcribe(saving_path)
        # then add datas to audio_data_queue
        #Thread(target=transcribe, args=(root_path+"/temp.wav",)).start()
        return "true"
    # Launch app
    app.run()
def transcribe(audio_file):
    audio_model = WhisperModel("small", device="cuda")
    result, index = audio_model.transcribe(audio_file)
    text_tmp=''
    for segment in result:
        text_tmp += segment.text
    text = text_tmp.strip()
    print(text)
if __name__ == '__main__':
    main()
