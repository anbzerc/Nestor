"""
This file contains all method related to plugins and which will be used by the core (and not by the client)
"""
import base64
import importlib
import json
import logging
import pathlib
import pkgutil
import shutil
from io import BytesIO

from PIL import Image

import Plugins
from github import Github, Repository, ContentFile, GithubException


def iter_namespace(ns_pkg):
    return pkgutil.iter_modules(ns_pkg.__path__, ns_pkg.__name__ + ".")


def load_plugins():
    for _, name, _ in iter_namespace(Plugins):
        importlib.import_module(name)


def get_plugin_icon(icon_name):
    g = Github("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")
    repo = g.get_repo("anbzerc/Nestor-plugins")
    path = f"Icons/{icon_name}"
    file = repo.get_contents(path)
    # we return a PIL image object
    return Image.open(BytesIO(file.decoded_content))


def download_directory(repository, server_path, name, is_folder=False, folder_name=""):
    """
    Download all contents at server_path with commit tag sha in
    the repository.
    """
    contents = repository.get_contents(server_path)
    general_path = str(pathlib.Path().absolute()).split("/Utils")[0] + "/Plugins/" + name + "/"
    pathlib.Path(general_path).mkdir(parents=True, exist_ok=True)
    for content in contents:
        print("Processing %s" % content.path)
        if content.type == 'dir':
            download_directory(repository, content.path, name, is_folder=True, folder_name=content.name)
        else:
            try:
                if is_folder:
                    path = content.path
                    file_content = repository.get_contents(path)
                    file_data = base64.b64decode(file_content.content)
                    pathlib.Path(general_path + folder_name).mkdir(parents=True, exist_ok=True)
                    file_out = open(general_path + folder_name + "/" + content.name, "w")
                    file_out.write(str(file_data))
                    file_out.close()
                else:
                    path = content.path
                    file_content = repository.get_contents(path)
                    file_data = base64.b64decode(file_content.content)
                    file_out = open(general_path + content.name, "w")
                    file_out.write(str(file_data))
                    file_out.close()
            except (GithubException, IOError) as exc:
                logging.error('Error processing %s: %s', content.path, exc)


def download_plugin(name):
    g = Github("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")
    repo = g.get_repo("anbzerc/Nestor-plugins")
    path = f"Plugins/{name}"
    download_directory(repo, path, name)


def remove_plugin(name):
    general_path = str(pathlib.Path().absolute()).split("/Utils")[0] + "/Plugins/" + name
    if pathlib.Path(general_path).exists():
        shutil.rmtree(general_path)
        return True
    else:
        return False
