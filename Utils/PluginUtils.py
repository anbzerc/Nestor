import importlib
import json
import pkgutil
from io import BytesIO

from PIL import Image

import Plugins
from github import Github, Repository, ContentFile


def iter_namespace(ns_pkg):
    return pkgutil.iter_modules(ns_pkg.__path__, ns_pkg.__name__ + ".")


def load_plugins():
    for _, name, _ in iter_namespace(Plugins):
        importlib.import_module(name)


def get_plugins_list():
    g = Github("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")
    repo = g.get_repo("anbzerc/Nestor-plugins")
    file = repo.get_contents("index.json")
    return json.loads(file.decoded_content)


def get_plugin_icon(icon_name):
    g = Github("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")
    repo = g.get_repo("anbzerc/Nestor-plugins")
    path=f"Icons/{icon_name}"
    file = repo.get_contents(path)
    # we return a PIL image object
    return Image.open(BytesIO(file.decoded_content))