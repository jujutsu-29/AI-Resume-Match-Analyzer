import sys
from services.ats import analyze_resume_against_jd
from dotenv import load_dotenv
load_dotenv()

print("Import successful")
try:
    result = analyze_resume_against_jd("Python dev", "Need python dev")
    print(result)
except Exception as e:
    print(f"Runtime Error: {e}")
