import json

from flask import Flask
from flask import jsonify
from flask import request

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World, Junrui! Haha~"

@app.route("/build_and_run", methods=["POST"])
def build_and_run():
    data = json.loads(request.data)

    if 'code' not in data or 'lang' not in data:
        return "You should provid both 'code' and 'lang'"
    code = data['code']
    lang = data['lang']

    print "API got called with code: %s in % s" % (code, lang)

    return jsonify({"hello": "get message!"})

if __name__ == "__main__":
    app.run(debug=True)
