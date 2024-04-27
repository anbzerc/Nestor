import importlib
import pkgutil
import Plugins


class PluginControl():
    plugins = []

    @staticmethod
    def iter_namespace(ns_pkg):
        return pkgutil.iter_modules(ns_pkg.__path__, ns_pkg.__name__ + ".")

    # Method which load plugins and write their informations into actions.json
    def load_plugins(self, is_verbose: bool):
        """
        Method which load all plugins in Plugins/ folder
        :param is_verbose: boolean to print verbose or not
        :return:
        """
        # Load plugin

        for _, name, _ in self.iter_namespace(Plugins):
            # parcours le package plugin pour importer les modules (importe le __init__.py)
            # ça execute à chaque import tout le __init__.py
            self.plugins.append(importlib.import_module(name))



    def get_plugin_by_name(self, name):
        for plugin in self.plugins:
            if str(plugin.__name__).__contains__(name):
                return plugin.Plugin()


