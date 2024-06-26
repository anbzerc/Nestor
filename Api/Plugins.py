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
            download_directory(repository, content.path, name, root_path=root_path, is_folder=True,
                               folder_name=content.name)
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
    # Get absolute path
    general_path = root_path + "/Plugins/"
    dirList = os.listdir(general_path)
    # Remove file that are not plugins folders
    dirList.remove("__pycache__")
    dirList.remove("__init__.py")
    return dirList
