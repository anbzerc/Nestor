"""
This file contains all method related to plugins and which will be used by the client (and not by the core)
"""
import base64
import json
import os
import pathlib
import shutil

from github import Github


def get_plugins_list():
    g = Github("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")
    repo = g.get_repo("anbzerc/Nestor-plugins")
    file = repo.get_contents("index.json")
    return json.loads(file.decoded_content)


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
            except Exception as exc:
                print('Error processing %s: %s', content.path, exc)
                return False


def download_plugin(name):
    g = Github("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")
    repo = g.get_repo("anbzerc/Nestor-plugins")
    path = f"Plugins/{name}"
    if not is_plugin_installed(name):
        download_directory(repo, path, name)



def remove_plugin(name):
    general_path = str(pathlib.Path().absolute()).split("/Utils")[0] + "/Plugins/" + name
    if is_plugin_installed(name):
        shutil.rmtree(general_path)


def is_plugin_installed(name):
    general_path = str(pathlib.Path().absolute()).split("/Utils")[0] + "/Plugins/" + name
    if pathlib.Path(general_path).exists():
        return True
    else:
        return False

def list_installed_plugins():
    #Get absolute path
    general_path = str(pathlib.Path().absolute()).split("/Utils")[0] + "/Plugins/"
    list = os.listdir(general_path)
    #Remove file that are not plugins folders
    list.remove("__pycache__")
    list.remove("__init__.py")
    return list
