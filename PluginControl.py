import importlib
import pkgutil

import Plugins


class PluginControl():
    plugins = []

    @staticmethod
    def iter_namespace(ns_pkg):
        return pkgutil.iter_modules(ns_pkg.__path__, ns_pkg.__name__ + ".")

    def load_plugins(self):
        for _, name, _ in self.iter_namespace(Plugins):
            # parcours le package plugin pour importer les modules (importe le __init__.py)
            # ça execute à chaque import tout le __init__.py
            #TODO rajouter un verbose
            print(name)
            self.plugins.append(importlib.import_module(name))

    def get_plugin_by_name(self, name):
        for plugin in self.plugins:
            if plugin.__name__ == name:
                return plugin.Plugin()
