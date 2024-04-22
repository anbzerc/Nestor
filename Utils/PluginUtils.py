"""
This file contains all method related to plugins and which will be used by the core (and not by the client)
"""
import base64
import importlib
import json
import logging
import os
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


def get_plugins_list():
    g = Github()
    repo = g.get_repo("anbzerc/Nestor-plugins")
    file = repo.get_contents("index.json")
    return json.loads(file.decoded_content)


def download_directory(repository, server_path, name, root_path, is_folder=False, folder_name="", ):
    """
    Download all contents at server_path with commit tag sha in
    the repository.
    """
    contents = repository.get_contents(server_path)
    general_path = root_path + "/Plugins/" + name + "/"
    pathlib.Path(general_path).mkdir(parents=True, exist_ok=True)
    for content in contents:
        print("Processing %s" % content.path)
        if content.type == 'dir':
            download_directory(repository, content.path, name,root_path=root_path, is_folder=True, folder_name=content.name)
        else:
            try:
                if is_folder:
                    path = content.path
                    file_content = repository.get_contents(path)
                    file_data = base64.b64decode(file_content.content)
                    pathlib.Path(general_path + folder_name).mkdir(parents=True, exist_ok=True)
                    file_out = open(general_path + folder_name + "/" + content.name, "w")

                    file_out.write(str(file_data.decode()))
                    file_out.close()
                else:
                    path = content.path
                    file_content = repository.get_contents(path)
                    file_data = base64.b64decode(file_content.content)
                    file_out = open(general_path + content.name, "w")
                    file_out.write("\n\n")
                    file_out.write(str(file_data.decode()))
                    file_out.close()
            except Exception as exc:
                print('Error processing %s: %s', content.path, exc)
                return False


def download_plugin(name, root_path):
    g = Github()
    repo = g.get_repo("anbzerc/Nestor-plugins")
    path = f"Plugins/{name}"
    if not is_plugin_installed(name, root_path):
        download_directory(repo, path, name, root_path=root_path)



def remove_plugin(name, root_path):
    general_path = root_path + "/Plugins/" + name
    if is_plugin_installed(name, root_path):
        shutil.rmtree(general_path)


def is_plugin_installed(name, root_path):
    general_path = root_path + "/Plugins/" + name
    if pathlib.Path(general_path).exists():
        return True
    else:
        return False

def list_installed_plugins(root_path):
    #Get absolute path
    general_path = root_path +"/Plugins/"
    list = os.listdir(general_path)
    #Remove file that are not plugins folders
    list.remove("__pycache__")
    list.remove("__init__.py")
    return list
