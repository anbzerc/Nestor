import configparser
import importlib
import json
import os
import pathlib
import pprint

import jsonpickle
import ollama
import yaml

from PluginControl import PluginControl


def action_parser(user_input: str, root_path: str):
    """Function which parse user input to understand which action to do. This function try to determine the command
    thanks to litterals given by the plugin, then if plugin wasn't found, try with the model

    :param user_input: the str of the user's input
    :param root_path: Nestor folder absolute path"""
    #TODO process litterals

    # Try with the model
    prompt = ""

    #Initialize variable
    target = ""

    #
    # Get prompt in config file
    #

    with open(root_path + "/Docs/prompt_prod.txt", encoding="utf8") as file:
        prompt = file.read()
    prompt_list = prompt.split("##Separator")

    category_dic, all_plugins_infos = get_plugins_models_datas()
    # Get all categories in categ_dic then format to put them into model's input
    # see a plugin's plugin.yaml file to understand the strucuture
    categories = {}
    for name, value in category_dic.items():
        categ_temp = value["category"]
        if categ_temp in categories.keys():
            categories[categ_temp].append(name)
        else:
            categories[categ_temp] = [name]

    # Format the message TODO interpolations
    message = prompt_list[0] + "\n -".join(list(categories.keys())) + prompt_list[1] + "special instruction" + \
              prompt_list[2] + "test example" + \
              prompt_list[3] + user_input

    # Send user's input to the model
    response = ollama.generate(model="mistral-temp-0.1", prompt=message, options="")["response"]
    response_json = "{" + response.split("{")[1].split("}")[0] + "}"

    try:
        response_parsed = json.loads(response_json)
    except:
        return False, response_json
    # print(response["response"])

    # Get category and target in model's return in this function to prevent errors in main
    try:

        category = response_parsed["category"]
        if "target" in response_parsed:
            target = response_parsed["target"]

            plugin_name = categories[category]
            return {"state": True, "plugin": plugin_name, "input": user_input, "action": category, "target": target}

        return {"state": True, "plugin": None, "input": user_input, "action": category, "target": None}

    except:
        return {"state": False, "input": user_input}






def get_plugins_litterals():
    """
    Method which fetch all litteral from plugins, see the docs for more details
    """
    base_path = str(pathlib.Path().absolute()).split("Nestor")[0] + "Nestor/Plugins"
    list_dir = os.listdir(base_path)

    #Remove default files from folder list
    list_dir.remove("__pycache__")
    list_dir.remove("__init__.py")

    # Create the dic which will be returned
    litterals_dic = {}

    # Then iterate the list
    for element in list_dir:
        file_path = base_path + f"/{element}/plugin.yaml"
        file = open(file_path, "r")
        decoded_yaml = yaml.safe_load(file)
        litterals = decoded_yaml["litterals"]
        litterals_dic[element] = litterals
    return litterals_dic


def get_plugins_models_datas():
    """
    Method which fetch all models datas from plugins, see the docs for more details
    """
    base_path = str(pathlib.Path().absolute()).split("Nestor")[0] + "Nestor/Plugins"
    list_dir = os.listdir(base_path)

    #Remove default files from folder list
    list_dir.remove("__pycache__")
    list_dir.remove("__init__.py")

    # Create the dic which will be returned
    models_dic = {}

    # Dic with all decoded info
    all_plugins_infos = {}

    # Then iterate the list
    for element in list_dir:
        file_path = base_path + f"/{element}/plugin.yaml"
        file = open(file_path, "r")
        decoded_yaml = yaml.safe_load(file)
        all_plugins_infos[element] = decoded_yaml
        models = decoded_yaml["model"]
        models_dic[element] = models

    return models_dic, all_plugins_infos


get_plugins_models_datas()

print(action_parser("Ouvre spotify", "/home/tim/PycharmProjects/Nestor"))