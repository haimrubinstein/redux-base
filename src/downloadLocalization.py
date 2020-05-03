from __future__ import print_function
import pickle
import os.path
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
import json

# If modifying these scopes, delete the file token.pickle.
SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']
SAMPLE_SPREADSHEET_ID = '1TutOPQyVysj5QAEp7xFYxCaxHnRdvsk2O8fcR5oz2mM'
SAMPLE_RANGE_NAME = 'A:E'


def main():
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

    service = build('sheets', 'v4', credentials=creds)

    sheet = service.spreadsheets()
    result = sheet.values().get(spreadsheetId=SAMPLE_SPREADSHEET_ID,
                                range=SAMPLE_RANGE_NAME).execute()
    values = result.get('values', [])
    localization = {}
    langs_index = {}

    if not values:
        print('No data found.')
    else:
        info = values[0]
        for index, lang in enumerate(info[1:]):
            localization[lang] = {}
            langs_index[index] = lang
        for row in values[1:]:
            key = row[0]
            json_keys = getJsonKeys(key)
            for index, val in enumerate(row[1:]):
                # is json
                if len(json_keys) > 0:
                    insertJsonVal(localization[langs_index[index]], json_keys, 0, val)
                # is array
                elif len(val.split('[')) > 1:
                    localization[langs_index[index]][key] = convertArray(val)
                # regular value
                else:
                    localization[langs_index[index]][key] = val

    with open('localization.js', 'w') as outfile:
        outfile.write('const langs = ')
        json.dump(localization, outfile, ensure_ascii=False)
        outfile.write(';\n export default langs;')


def convertArray(val):
    newVal = val.replace('[', '')
    newVal = newVal.replace(']', '')
    return newVal.split(',')


def insertJsonVal(obj, json_keys, index, val):
    key = json_keys[index]
    if key not in obj:
        obj[key] = {}
    if index == len(json_keys) - 2:
        obj[key][json_keys[index + 1]] = val
        return
    return insertJsonVal(obj[key], json_keys, index + 1, val)


def getJsonKeys(key):
    splited = key.split('[')
    if len(splited) <= 1:
        return []
    else:
        keys = [splited[0]]
        del splited[0]
        middleKeys = ''.join(splited).split(']')
        for k in middleKeys:
            if k:
                keys.append(k)
        return keys


if __name__ == '__main__':
    main()
