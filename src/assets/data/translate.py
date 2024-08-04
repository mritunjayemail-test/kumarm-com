import os
import json
from template import getLangList
import boto3
import yaml
from functools import reduce
from operator import getitem


translate = boto3.client(service_name='translate',
                         region_name='eu-west-1',
                         use_ssl=True)

def loadyaml():
    path = os.path.join(os.path.dirname(__file__), "data.yaml")
    with open(path, 'r') as file:
        configuration = yaml.safe_load(file)
    return configuration

def makeJSON():
    path = os.path.join(os.path.dirname(__file__), "data.json")
    with open(path, 'w') as json_file:
      con = loadyaml()
      json.dump(con, json_file)

def jsonMatrimonial():
    yaml_obj = loadyaml()
    json_str = json.dumps(yaml_obj)
    return json.loads(json_str)

def recursive_iter(obj, keys=()):
    if isinstance(obj, dict):
        for k, v in obj.items():
            yield from recursive_iter(v, keys + (k,))
    elif any(isinstance(obj, t) for t in (list, tuple)):
        for idx, item in enumerate(obj):
            yield from recursive_iter(item, keys + (idx,))
    else:
        yield keys, obj

def cast(input):
    try:
        return int(input)
    except:
        return str(input)

def set_nested_item(dataDict, mapString: str, val=None):
    mapList = list(map(cast, mapString.split(".")))
    reduce(getitem,mapList[:-1], dataDict)[mapList[-1]] = val
    return dataDict

def translateAllJson(data, realTranslate: bool = False,
                      SourceLanguageCode: str="en",
                      TargetLanguageCode: str='nl'):
    for keys, item in recursive_iter(data):
        Keyfull='.'.join(map(str, keys))
        if '.V' in Keyfull:
            if realTranslate:
              result = translate.translate_text(Text=item,
                                                SourceLanguageCode=SourceLanguageCode,
                                                TargetLanguageCode=TargetLanguageCode)
              TranslatedText = result.get('TranslatedText')
            else:
              TranslatedText=item
            set_nested_item(data, Keyfull, TranslatedText)
    return data

def createStaticJSONfiles():
  listLang = getLangList()
  for lang in listLang:
      dataInput = jsonMatrimonial()
      path = os.path.join(os.path.dirname(__file__), 'lang/{}.json'.format(lang))
      with open(path, 'w') as f:
          data = translateAllJson(dataInput, realTranslate=False,
                                  SourceLanguageCode='en',
                                  TargetLanguageCode=lang)
          json.dump(data, f)

def modifyJson(Keyfull, TranslatedText):
    dataInput = jsonMatrimonial()
    set_nested_item(dataInput, Keyfull, TranslatedText)
    return dataInput

def saveJson(Keyfull, TranslatedText):
    dataInput = modifyJson(Keyfull, TranslatedText)
    path = os.path.join(os.path.dirname(__file__), "data.json")
    with open(path, 'w') as json_file:
      json.dump(dataInput, json_file)

createStaticJSONfiles()

# dataInput = jsonMatrimonial()
# mapString='HOME.HOME_ABOUT.0'
# BUCKET='kumarm.de'
# LANG='en'
# mapList = list(map(cast, mapString.split(".")))
# nextIndex = mapList[-1]
# REPLICATED_VALUE = reduce(getitem,mapList[:-1], dataInput)[mapList[-1]]
# mapList.pop()
# PARENT_VALE = reduce(getitem,mapList[:-1], dataInput)[mapList[-1]]
# del PARENT_VALE[nextIndex]
# reduce(getitem,mapList[:-1], dataInput)[mapList[-1]] = PARENT_VALE
# json_str = json.dumps(dataInput)
# print(json_str)
# s3 = boto3.client("s3")
# s3.put_object(Bucket=BUCKET, Key=f"assets/data/lang/{LANG}.json",Body=json_str)


