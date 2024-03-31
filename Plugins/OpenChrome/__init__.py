from PluginCore import PluginModel
from subprocess import run

class Plugin(PluginModel):
    def run(self, plateform="flatpack"):
        if plateform == "flatpak":
            result = run("flatpak run org.chromium.Chromium", shell=True, capture_output=True, check=True, timeout=10)
            result.check_returncode()

    def test(self):
        self.run()
