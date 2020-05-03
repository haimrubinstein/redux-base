from __future__ import print_function
import json
import pickle
import os.path
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient import discovery

# g = {}
# Object.keys(langs.German).forEach(k => g[`"${k}"`] = langs.German[k])
# langs.German = g
# JSON.stringify(langs)

# If modifying these scopes, delete the file token.pickle.
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
spreadsheet_id = '1TutOPQyVysj5QAEp7xFYxCaxHnRdvsk2O8fcR5oz2mM'
range_ = 'A:E'

# create credentials
creds = None
if os.path.exists('token.pickle'):
    with open('token.pickle', 'rb') as token:
        creds = pickle.load(token)
if not creds or not creds.valid:
    if creds and creds.expired and creds.refresh_token:
        creds.refresh(Request())
    else:
        flow = InstalledAppFlow.from_client_secrets_file(
            'credentials.json', SCOPES)
        creds = flow.run_local_server()
    with open('token.pickle', 'wb') as token:
        pickle.dump(creds, token)

# delete all data
service = discovery.build('sheets', 'v4', credentials=creds)
request = service.spreadsheets().values().clear(spreadsheetId=spreadsheet_id, range=range_, body={})
response = request.execute()

# upload new data
excel_data = []
firstRow = ['Keys']
main_keys = []
rows = {}


def insertNestedJson(dicti, parent_key, index):
    global rows
    for k, val in dicti.items():
        k = parent_key + "[" + k + "]"
        if type(val) is dict:
            insertNestedJson(val, k, index)
            continue
        if k not in main_keys:
            main_keys.append(k)
            rows[k] = [''] * (num_of_langs + 1)
            rows[k][0] = k
        rows[k][index] = str(val)


with open('localization.js') as file:
    line = file.read().replace('export default langs;', '')
    line = line.replace(';', '')
    js = line.split('=')[1].replace(';', '')
    data = json.loads(js)
    num_of_langs = len(data)
    for i, (key, value) in enumerate(data.items()):
        firstRow.append(key)
        for j, (key1, value1) in enumerate(value.items()):
            if type(value1) is dict:
                insertNestedJson(value1, key1, i + 1)
                continue
            elif type(value1) is list:
                value1 = "[" + ','.join(value1) + "]"
            if key1 not in main_keys:
                main_keys.append(key1)
                rows[key1] = [''] * (num_of_langs + 1)
                rows[key1][0] = key1
            rows[key1][i + 1] = value1
    excel_data = list(rows.values())
    excel_data.insert(0, firstRow)

value_input_option = 'USER_ENTERED'
insert_data_option = 'INSERT_ROWS'

value_range_body = {
    'values': excel_data
}

request = service.spreadsheets().values().append(spreadsheetId=spreadsheet_id, range=range_,
                                                 valueInputOption=value_input_option,
                                                 insertDataOption=insert_data_option,
                                                 body=value_range_body)
response = request.execute()
