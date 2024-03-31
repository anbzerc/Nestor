import os

import jsonpickle

action = {
    "category" : {
        "ouvrir un logiciel" : {
            "ouvrir deezer" : "OpenDeezer"
        }
    }
}
json_to_write = jsonpickle.encode(action)
folder_path=os.getcwd().replace("Tools","Docs")
separator=folder_path.split("Nestor")[1].split("Docs")[0]
path = folder_path+separator+"actions.json"
with open(path, "w") as file:
    file.write(json_to_write)