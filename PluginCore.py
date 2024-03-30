from abc import ABC, abstractmethod


class PluginModel(ABC):
    # function which perform the actions
    @abstractmethod
    def run(self):
        pass

    # method to check if plugin is working
    @abstractmethod
    def test(self):
        pass