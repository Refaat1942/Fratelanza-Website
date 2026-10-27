#!/usr/bin/env python3
"""
Adds a natural Egyptian-Arabic voice-over to the Fratelanza video.

Needs: Python 3.9+, internet connection, and:  pip install edge-tts imageio-ffmpeg
Run:   python make_voice_and_video.py            (female voice "Salma")
       python make_voice_and_video.py --male     (male voice "Shakir")
       python make_voice_and_video.py --rate +18%   (faster / slower speech)
Output: Fratelanza-Video-with-voice.mp4 (same folder)
"""
import argparse, asyncio, json, os, re, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ap = argparse.ArgumentParser()
ap.add_argument('--male', action='store_true')
ap.add_argument('--rate', default='+12%')
ap.add_argument('--dry', action='store_true', help='test the mixing without internet (beeps instead of speech)')
args = ap.parse_args()

import imageio_ffmpeg
FF = imageio_ffmpeg.get_ffmpeg_exe()
scenes = json.load(open(os.path.join(HERE, 'scenes.json'), encoding='utf-8'))
video = os.path.join(HERE, 'Fratelanza-Video-no-audio.mp4')
music = os.path.join(HERE, 'music.wav')
work = os.path.join(HERE, 'voice_parts'); os.makedirs(work, exist_ok=True)
VOICE = 'ar-EG-ShakirNeural' if args.male else 'ar-EG-SalmaNeural'

def duration(path):
    r = subprocess.run([FF, '-i', path], capture_output=True, text=True)
    m = re.search(r'Duration: (\d+):(\d+):([\d.]+)', r.stderr)
    return int(m[1]) * 3600 + int(m[2]) * 60 + float(m[3])

async def synth():
    import edge_tts
    for i, s in enumerate(scenes):
        out = os.path.join(work, f'{i:02d}_{s["id"]}.mp3')
        await edge_tts.Communicate(s['text'], VOICE, rate=args.rate).save(out)
        print('voice', s['id'], round(duration(out), 2), 's  (scene', s['dur'], 's)')

def fake():
    for i, s in enumerate(scenes):
        out = os.path.join(work, f'{i:02d}_{s["id"]}.mp3')
        subprocess.run([FF, '-y', '-f', 'lavfi', '-i', f'sine=frequency={300+i*40}:duration={s["dur"]-1.2}', out], capture_output=True, check=True)

if args.dry: fake()
else: asyncio.run(synth())

# ---- mix: fit every line into its scene, duck the music under the voice ----
cmd = [FF, '-y', '-i', video, '-i', music]
parts, labels = [], []
for i, s in enumerate(scenes):
    f = os.path.join(work, f'{i:02d}_{s["id"]}.mp3'); cmd += ['-i', f]
    d = duration(f); room = s['dur'] - 0.25
    tempo = min(1.6, d / room) if d > room else 1.0       # speak a bit faster if a line is too long
    delay = int((s['start'] + 0.12) * 1000)
    parts.append(f'[{i+2}:a]atempo={tempo:.3f},adelay={delay}|{delay},volume=1.6[v{i}]'); labels.append(f'[v{i}]')
total = scenes[-1]['start'] + scenes[-1]['dur'] + 0.1
fc = ';'.join(parts) + f';{"".join(labels)}amix=inputs={len(scenes)}:normalize=0,apad=whole_dur={total:.2f},asplit=2[vm][vs]'
fc += ';[1:a]volume=0.55[mu];[mu][vs]sidechaincompress=threshold=0.02:ratio=10:attack=15:release=500[md]'
fc += ';[md][vm]amix=inputs=2:normalize=0,alimiter=limit=0.95[out]'
out = os.path.join(HERE, 'Fratelanza-Video-with-voice.mp4')
cmd += ['-filter_complex', fc, '-map', '0:v', '-map', '[out]', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', out]
subprocess.run(cmd, check=True)
print('\nDONE ->', out)
