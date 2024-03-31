import importlib
import pkgutil

import jsonpickle

import Plugins
from Utils.Verbose import verbose_print


class PluginControl():
    plugins = []

    @staticmethod
    def iter_namespace(ns_pkg):
        return pkgutil.iter_modules(ns_pkg.__path__, ns_pkg.__name__ + ".")

    # Method which load plugins and write their informations into actions.json
    def load_plugins(self, is_verbose: bool):

        # Load plugin

        for _, name, _ in self.iter_namespace(Plugins):
            # parcours le package plugin pour importer les modules (importe le __init__.py)
            # ça execute à chaque import tout le __init__.py
            verbose_print(name)
            self.plugins.append(importlib.import_module(name))

        # Then get and write infos

        category = {}
        for e in self.plugins:
            # the name is in seconde position (do a print to check)
            # We use method read_params from our homemade abstract class PluginCore
            f = e.Plugin()
            f.read_params(e.__name__.split(".")[1])

            # then add plugin target and name to category dict, test if the category exist in the category dict
            if f.category in category:
                category[f.category][f.target] = e.__name__.split(".")[1]
            else:
                category[f.category] = {f.target: e.__name__.split(".")[1]}

        # And serialize category into action.json
        json_to_write = jsonpickle.encode({"category": category})
        with open("Docs/actions.json", "w") as file:
            file.write(json_to_write)

    def get_plugin_by_name(self, name):
        for plugin in self.plugins:
            if str(plugin.__name__).__contains__(name):
                return plugin.Plugin()


