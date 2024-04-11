import json

from flask import Flask, render_template, request

import sys

sys.path.append('../Nestor/')
from Api.Plugins import get_plugins_list

app = Flask(__name__)


@app.route("/")
def hello_world():
    return render_template('main.html')


@app.route('/plugins/')
def hello():
    return render_template('Plugins.html')



@app.route('/api/plugins/list', methods=['GET'])
def api_get_plugins_list():
    return get_plugins_list()

@app.route('/api/plugins/install', methods=['POST'])
def install_plugin_api():
    response_json = json.loads(request.data)
    name = response_json["name"]
    action = response_json["action"]
    print("Installing", name)
    return "true"

@app.route('/api/plugins/remove', methods=['POST'])
def remove_plugin_api():
    response_json = json.loads(request.data)
    name = response_json["name"]
    action = response_json["action"]
    print("Installing", name)
    return "true"