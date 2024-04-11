"""
This file contains all method related to plugins and which will be used by the client (and not by the core)
"""
import json

from github import Github


def get_plugins_list():
    g = Github("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")
    repo = g.get_repo("anbzerc/Nestor-plugins")
    file = repo.get_contents("index.json")
    return json.loads(file.decoded_content)