import os
import json

#ファイルのパス----------------------------------------------------------------------------------------------------------------------------------------
path_html = "../HTML"
path_css = "../CSS"
path_js = "../JavaScript"



#ファイルの名前（拡張子付き）を取得----------------------------------------------------------------------------------------------------------------------
files_html = os.listdir(path_html)
files_css = os.listdir(path_css)
files_js = os.listdir(path_js)



#例外（フォルダ等のファイルではないもの）にあたるファイルを除外--------------------------------------------------------------------------------------------
files_js.remove('cosmos_data')



#例外（ライブラリなどの特殊なファイル）にあたるファイルを除外----------------------------------------------------------------------------------------------
file_json_load = open('OtherFile.json','r')#例外リストファイルを読み込み
file_other = json.load(file_json_load)#JSONファイルとして読み込み
#JSONファイルに格納されているデータを順次読み込み
for file_other_s in file_other:
    #JSONファイルのtoggleタグが該当する配列のfilenameを、読み込んだファイル名のリストから削除
    if file_other_s['toggle'] == "HTML":
        files_html.remove(file_other_s['filename'])
    elif file_other_s['toggle'] == "CSS":
        files_css.remove(file_other_s['filename'])
    elif file_other_s['toggle'] == "JS":
        files_js.remove(file_other_s['filename'])



#ファイル名の名前と拡張子を切り分け名前のみのリストにする-------------------------------------------------------------------------------------------------
files_split_html = []
files_split_css = []
files_split_js = []

for list_html in files_html:
    list_html = list_html.split('.')#ドットで文字列を分割し配列データで保存（[0]に名前、[1]に拡張子）
    files_split_html.append(list_html[0])#分割した名前のデータを末尾に挿入

for list_css in files_css:
    list_css = list_css.split('.')
    files_split_css.append(list_css[0])

for list_js in files_js:
    list_js = list_js.split('.')
    files_split_js.append(list_js[0])



#分割した名前データを元に保存用データ変数にデータを挿入---------------------------------------------------------------------------------------------------
StaticFile = {
    "HTML": [
    ],
    "CSS": [
    ],
    "JS": [
    ],
    "LIB": [
    ]
}

for files_split_html_s in files_split_html:
    file_insert = {
        "pathname": "/" + files_split_html_s + ".html",
        "target": "HTML/" + files_split_html_s + ".html",
        "content": "text/html"
    }
    StaticFile['HTML'].append(file_insert)

for files_split_css_s in files_split_css:
    file_insert = {
        "pathname": "/" + files_split_css_s + ".css",
        "target": "CSS/" + files_split_css_s + ".css",
        "content": "text/css"
    }
    StaticFile['CSS'].append(file_insert)

for files_split_js_s in files_split_js:
    file_insert = {
        "pathname": "/" + files_split_js_s + ".js",
        "target": "JavaScript/" + files_split_js_s + ".js",
        "content": "text/javascript"
    }
    StaticFile['JS'].append(file_insert)



#例外（ライブラリなどの特殊なファイル）にあたるファイルのデータを挿入---------------------------------------------------------------------------------------
for file_other_s in file_other:
    file_insert = {
        "pathname": file_other_s['pathname'],
        "target": file_other_s['target'],
        "content": file_other_s['content']
    }
    StaticFile['LIB'].append(file_insert)



#StaticFile.jsonにデータを保存、インデントを4に設定------------------------------------------------------------------------------------------------------
with open('StaticFile.json', 'w') as f:
    json.dump(StaticFile, f, indent=4)

#結果を表示-------------------------------------------------------------------------------------------------------------------------------------------
with open('StaticFile.json') as f:
    print(f.read())
