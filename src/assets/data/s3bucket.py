import logging
from translate import jsonMatrimonial, modifyJson
import boto3
from botocore.exceptions import ClientError
import json

s3 = boto3.client("s3")
data = modifyJson('PROFILE.0.default.V',' Menu')
json_str = json.dumps(data)

s3.put_object(
    Bucket="kumarm.de",
    Key="assets/data/lang/en.json",
    Body=json_str,
)

s3_object = s3.get_object(Bucket="kumarm.de",  Key="assets/data/lang/en.json")
data = s3_object['Body'].read().decode('utf-8')

#data = modifyJson('MENU_TITLE.V',' boli')
#json_str = json.dumps(data)

s3.put_object(
    Bucket="kumarm.de",
    Key="assets/data/lang/en.json",
    Body=data,
)

print(data)

