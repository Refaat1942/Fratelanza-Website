#!/bin/sh
cd "$(dirname "$0")"
python3 -m pip install --quiet edge-tts imageio-ffmpeg && python3 make_voice_and_video.py
