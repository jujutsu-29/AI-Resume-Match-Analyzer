import os
import requests
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")
url = f"https://generativelanguage.googleapis.com/v1beta/models?key={api_key}"

response = requests.get(url)
print("Status Code:", response.status_code)
if response.status_code == 200:
    models = response.json().get("models", [])
    for m in models:
        print(f"{m['name']} - {m.get('supportedGenerationMethods', [])}")
else:
    print(response.text)
