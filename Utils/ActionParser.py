import configparser
import importlib
import json

import ollama


def action_parser(user_input:str):
    """Function which parse user input to understand which action to do"""
    prompt=""
    #Get prompt in config file
    with open("Docs/prompt_prod.txt") as file:
        prompt = file.read()
    message=prompt+user_input
    #print(message)

    # Send user's input to the model
    response_json = ollama.generate(model="mistral-temp-0.1", prompt=message)["response"]
    try :
        response_parsed = json.loads(response_json)
    except :
        return False, response_json
    #print(response["response"])

    #Get category and target in model's return in this function to prevent errors in main
    try :
        category = response_parsed["category"]
        if "target" in response_parsed :
            target = response_parsed["target"]
            return True, user_input, category, target

        return True, user_input, category, "no target"

    except :
        return False, response_parsed

#action_parser("Met la musique en pause")


class ActionParser():
    def __init__(self, plugins:list=[]):
        if plugins != []:
            self._plugins = [
                importlib.import_module(plugin, f"Plugins.{plugin}").Plugins() for plugin in plugins
            ]
            self._plugins.append([
                importlib.import_module(plugin, ".").Plugins() for plugin in plugins
            ])
        else :
            self._plugins = [
                importlib.import_module(plugin, ".").Plugins() for plugin in plugins
            ]

    def action_parser(user_input: str):
        """Function which parse user input to understand which action to do"""
        prompt = ""
        # Get prompt in config file
        with open("Docs/prompt_prod.txt") as file:
            prompt = file.read()
        message = prompt + user_input
        # print(message)

        # Send user's input to the model
        response_json = ollama.generate(model="mistral-temp-0.1", prompt=message)["response"]
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
                return True, user_input, category, target

            return True, user_input, category, "no target"

        except:
            return False, response_parsed
