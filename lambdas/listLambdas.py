import boto3

client = boto3.client('lambda')

def main(event, context):
    response = client.list_functions()
    list = []
    for function in response['Functions']:
        list.append(function['FunctionName'])
        print(f'function["FunctionName"]')
    return list