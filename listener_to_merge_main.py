import configparser

config_parser = configparser.ConfigParser()
# TO DO verifier las section du fichier de configuration
nestor = config_parser.read("config.ini")["user voice"]
