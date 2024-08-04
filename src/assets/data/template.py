import os
import json
import yaml

def loadyaml():
    """
    Load the language yaml file.
    """
    path = os.path.join(os.path.dirname(__file__), "lang.yaml")
    with open(path, 'r') as file:
        configuration = yaml.safe_load(file)
    return configuration

def makeJSON():
    path = os.path.join(os.path.dirname(__file__), "lang.json")
    with open(path, 'w') as json_file:
      con = loadyaml()
      json.dump(con, json_file)

def jsonLanguage():
    yaml_obj = loadyaml()
    json_str = json.dumps(yaml_obj)
    return json.loads(json_str)

def getLangList():
  """
  Return language list which contains active value is True.
  """
  data = jsonLanguage()
  langs = data['language']
  langList = []
  for l in langs:
    if l['active']:
      langList.append(l['lang'])
  return langList

