import configparser


def action_parser(command):
    words_list = command.split(" ")
    try:
        action_verb = words_list[1]
    except Exception as error:
        print("Erreur : ", error)
        return False

    # List of action

    # Initialize ConfigParser

    config_parser = configparser.ConfigParser()
    config = config_parser.read("action.ini")

    # Stop something action
    list_couper = config["couper"].split("$$")
    if action_verb in list_couper:
        # remove Nestor and the action to do
        action_target = words_list[(len(words_list) - 2):]
        list_stopable = config["stopable"]
        if action_target in list_stopable.keys():
            path=list_stopable[action_target]
        else :
            print("action comprise mais pas la target")
            return False
