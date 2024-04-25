import json
import queue
import subprocess
from threading import Thread

import flask
from flask import Flask, render_template, request
import sys
from flask_cors import cross_origin

from Nestor import Nestor

sys.path.append('../Nestor/')
from Api.Plugins import *

def main():
    app = Flask(__name__)

    root_path=str(pathlib.Path().absolute()).replace("/Flask", "")

    # Set audio datas queues
    audio_data_queues = queue.Queue()

    # Set model
    model = "whisper-large-v3-french"
    # Get an instance of Nestor in a thread
    nestor = Nestor(audio_data_queues, model=model)
    nestor_thread = Thread(nestor.main())
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
    def get_analyze_audio():
        return ""
        # TODO addaudio to audio_data_queues
    # Launch app
    app.run()

if __name__ == '__main__':
    main()
