import configparser
import importlib
import json

import jsonpickle
import ollama


def action_parser(user_input:str):
    """Function which parse user input to understand which action to do"""
    prompt=""

    #Initialize variable
    target=""

    #Get prompt in config file
    with open("Docs/prompt_prod.txt", encoding="utf8") as file:
        prompt = file.read()
    prompt_list=prompt.split("##Separator")
    # Try to get action.json json TODO try except
    with open("Docs/actions.json") as action:
        action_json_temp = action.read()
    decoded_json = jsonpickle.decode(action_json_temp)

    #Get all categories in json then format to put them into model's input
    categories = "\n - ".join(decoded_json["category"].keys())

    #print(prompt_list[0]+category+prompt_list[1]+"special instruction"+prompt_list[2]+"test example"+prompt_list[3]+"user input")
    message=prompt_list[0]+categories+prompt_list[1]+"special instruction"+prompt_list[2]+"test example"+prompt_list[3]+"user input"


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

    #TODO get category and target associated plugin
#action_parser("Met la musique en pause")


class ActionParser():
    def __init__(self):
        pass
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
