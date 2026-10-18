@echo off
chcp 65001 >nul
cd /d "%~dp0"
python --version >nul 2>&1
if errorlevel 1 (
  echo Python is not installed. Install it from https://www.python.org/downloads/ then run this file again.
  pause
  exit /b
)
python -m pip install --quiet edge-tts imageio-ffmpeg
python make_voice_and_video.py
pause
