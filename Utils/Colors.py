def info_message(message):
    """
    Color messages in white and back in blue
    :param message: the message to color
    :return:
    """
    return f"\x1b[1;34m {message} \033[0m"


def succes_info(message):
    """
    Color messages in white and back in green
    :param message: the message to color
    :return:
    """
    return f"\x1b[1;32m {message} \033[0m"


def action_detected(duration, action):
    """
    Print an Action label in white on green, then the duration in black on green, and the action in normal white on black
    :param duration: the parsing duration
    :param action: the action to print
    :return:
    """
    return f"\x1b[1;37;42m Action détectée \x1b[0;30;42m {duration}s : \033[0m {action} "


def message_detected(duration, message):
    """
    Print a message label in white on blue, then the duration in black on blue, and the message in normal white on black
    :param duration: the parsing duration
    :param message: the message to print
    :return:
    """
    return f"\x1b[1;37;44m Message détecté \x1b[0;30;44m {duration}s : \033[0m {message} "


def action_not_found(duration, action):
    """
    Print a Not Found label in white on red, then the duration in black on red, and the action in normal white on black
    :param duration: the parsing duration
    :param action: the action to print
    :return:
    """
    return f"\x1b[1;37;43m Not Found \x1b[0;30;43m {duration}s : \033[0m {action} is returned "


def parsing_error(duration, action):
    """
    Print a Parsing Error label in white on red, then the duration in black on red, and the action in normal white on black
    :param duration: the parsing duration
    :param action: the action to print
    :return:
    """
    return f"\x1b[1;37;41m Parsing Error \x1b[0;30;41m {duration}s : \033[0m {action} is returned "


def not_for_nestor(duration, message):

    """
    Print a Not for Nestor label in black on light gray, then the duration in black on light gray, and the message in normal white on black
    :param duration: the parsing duration
    :param message: the message to print
    :return:
    """
    return f"\x1b[0;30;100m Not for Nestor \x1b[0;30;100m  {duration}s : \033[0m {message} "

def plugin_message(name, message):

    """
    Print a Plugin : name label in  on light gray, then the duration in black on light gray, and the message in normal white on black
    :param duration: the parsing duration
    :param message: the message to print
    :return:
    """
    return f"\x1b[1;97;101m Plugin {name} :\033[0m \x1b[0,91m{message} \033[0m"
