import os
from abc import ABC, abstractmethod

import yaml
from yaml import BaseLoader


class PluginModel(ABC):
    category: str
    target: str
    alias: list[str]
    # function which perform the actions
    @abstractmethod
    def run(self):
        pass

    # method to check if plugin is working
    @abstractmethod
    def test(self):
        pass

    def read_params(self, name):
        path = os.getcwd() + "/Plugins/" + name + "/" + "plugin.yaml"
        print(path)
        with open(path, "r") as file:
            text = file.read()
        decoded_yaml = yaml.load(text, BaseLoader)
        print(decoded_yaml)
        self.category = decoded_yaml["params"]["category"]
        self.target = decoded_yaml["params"]["target"]
        self.alias = decoded_yaml["params"]["alias"].split(",")
        print(self.target, "\n",self.category, "\n",self.alias)
