from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

# Replace with your OpenWeatherMap API key
WEATHER_API_KEY = "74dc1aa20eab740d0be05b5cb2024ae0"
BASE_URL = "http://api.openweathermap.org/data/2.5/"

@app.route("/weather")
def get_weather():
    city = request.args.get("city")
    lat = request.args.get("lat")
    lon = request.args.get("lon")

    if city:
        url = f"{BASE_URL}weather?q={city}&appid={WEATHER_API_KEY}&units=metric"
    elif lat and lon:
        url = f"{BASE_URL}weather?lat={lat}&lon={lon}&appid={WEATHER_API_KEY}&units=metric"
    else:
        return jsonify({"error": "City or coordinates (lat, lon) are required"}), 400
    
    response = requests.get(url)
    data = response.json()
    
    if data.get("cod") != 200:
        return jsonify({"error": data.get("message")}), 404

    weather_data = {
        "city": data["name"],
        "temperature": data["main"]["temp"],
        "condition": data["weather"][0]["description"],
        "icon": data["weather"][0]["icon"]
    }
    return jsonify(weather_data)

@app.route("/forecast")
def get_forecast():
    city = request.args.get("city")
    lat = request.args.get("lat")
    lon = request.args.get("lon")

    if city:
        url = f"{BASE_URL}forecast?q={city}&appid={WEATHER_API_KEY}&units=metric"
    elif lat and lon:
        url = f"{BASE_URL}forecast?lat={lat}&lon={lon}&appid={WEATHER_API_KEY}&units=metric"
    else:
        return jsonify({"error": "City or coordinates (lat, lon) are required"}), 400

    response = requests.get(url)
    data = response.json()

    if data.get("cod") != "200":
        return jsonify({"error": data.get("message")}), 404

    forecast_list = data["list"]
    daily_forecasts = {}

    for item in forecast_list:
        date = item["dt_txt"].split(" ")[0]
        if date not in daily_forecasts:
            daily_forecasts[date] = {
                "high": item["main"]["temp_max"],
                "low": item["main"]["temp_min"],
                "icon": item["weather"][0]["icon"]
            }
        else:
            daily_forecasts[date]["high"] = max(daily_forecasts[date]["high"], item["main"]["temp_max"])
            daily_forecasts[date]["low"] = min(daily_forecasts[date]["low"], item["main"]["temp_min"])

    # Convert to a list for the frontend
    forecast_data = []
    for date, temps in daily_forecasts.items():
        forecast_data.append({
            "date": date,
            "high": temps["high"],
            "low": temps["low"],
            "icon": temps["icon"]
        })
    
    return jsonify({"forecast": forecast_data})

if __name__ == "__main__":
    app.run(port=9095)