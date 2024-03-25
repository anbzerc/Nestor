# The file wich contains all the functions associated with recognised actions
from subprocess import run


def Ouvrir_deezer(plateform):
    if plateform == "flatpak":
        result = run("flatpak run dev.aunetx.deezer", shell=True, capture_output=True, check=True, timeout=10)
        result.check_returncode()


def Fermer_deezer(plateform):
    if plateform == "flatpak":
        result = run("flatpak kill dev.aunetx.deezer", shell=True, capture_output=True, check=True, timeout=10)
        result.check_returncode()


