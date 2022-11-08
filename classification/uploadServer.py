from flask import Flask, render_template, url_for, request, json, jsonify
from flask_cors import CORS
import os
from PIL import Image
from classification import Classification
import json

app = Flask(__name__)
CORS(app)
classfication = Classification()


@app.route("/predict", methods=["GET", "POST"])
def predict():
    if request.method == "POST":
        f = request.files["file"]
        print(f)
        f.save("./demo.jpg")
        image = Image.open("./demo.jpg")
        name, possible = classfication.detect_image(image)
        dic = {
            "BLK": "巴洛克",
            "GTS": "哥特式",
            "GDZY": "古典主义",
            "LMS": "罗马式",
            "GLM": "古罗马",
            "WYFX": "文艺复兴",
            "XGDZY": "新古典主义",
        }
        data = {"classname": dic[name], "possible": round(float(possible), 2)}
        data = json.dumps(data)
        return data


if __name__ == "__main__":
    app.run(debug=True, use_reloader=False, port=5000, host="0.0.0.0")
