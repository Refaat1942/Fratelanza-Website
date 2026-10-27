"""Soft upbeat background bed (pure synthesis, royalty-free). usage: music.py out.wav seconds"""
import sys, wave, numpy as np
out, secs = sys.argv[1], float(sys.argv[2])
sr = 44100; bpm = 104; beat = 60 / bpm
n = int(sr * secs); t = np.arange(n) / sr
mix = np.zeros(n)
def note(f, t0, dur, amp, kind='pluck'):
    i0 = int(t0 * sr); m = int(dur * sr)
    if i0 >= n: return
    m = min(m, n - i0); tt = np.arange(m) / sr
    if kind == 'pluck':
        env = np.exp(-tt * 7.5); w = np.sin(2*np.pi*f*tt) + .35*np.sin(4*np.pi*f*tt) + .15*np.sin(6*np.pi*f*tt)
    else:
        env = np.minimum(1, tt / .35) * np.minimum(1, (dur - tt) / .5).clip(0, 1); w = np.sin(2*np.pi*f*tt) + .5*np.sin(2*np.pi*f*1.003*tt) + .25*np.sin(4*np.pi*f*tt)
    mix[i0:i0+m] += amp * env * w
hz = lambda m: 440 * 2 ** ((m - 69) / 12)
chords = [(57, [57, 60, 64]), (53, [53, 57, 60]), (48, [48, 52, 55]), (55, [55, 59, 62])]  # Am F C G
bar = beat * 4
for k in range(int(secs / bar) + 1):
    root, tri = chords[k % 4]; t0 = k * bar
    for m in tri: note(hz(m), t0, bar, .05, 'pad')
    note(hz(root - 12), t0, bar, .09, 'pad')
    arp = [tri[0] + 12, tri[1] + 12, tri[2] + 12, tri[1] + 12, tri[2] + 12, tri[1] + 12, tri[0] + 24, tri[2] + 12]
    for j, m in enumerate(arp): note(hz(m), t0 + j * beat / 2, beat, .09)
    for j in range(8):  # soft ticks
        i0 = int((t0 + j * beat / 2) * sr); m = int(.04 * sr)
        if i0 + m < n: mix[i0:i0+m] += (np.random.RandomState(j + k).randn(m) * np.exp(-np.arange(m) / (sr * .006))) * (.035 if j % 2 else .02)
    for j in (0, 2):  # gentle kick
        i0 = int((t0 + j * beat) * sr); m = int(.18 * sr); tt = np.arange(m) / sr
        if i0 + m < n: mix[i0:i0+m] += .22 * np.sin(2*np.pi*(55 + 70*np.exp(-tt*28))*tt) * np.exp(-tt*16)
mix *= np.minimum(1, t / 1.5) * np.minimum(1, (secs - t) / 2.0).clip(0, 1)
# cheap reverb
for d, g in ((.11, .28), (.19, .2), (.31, .12)):
    s = int(d * sr); mix[s:] += g * mix[:-s]
mix = np.tanh(mix * 1.2) * .6
pcm = (np.clip(mix, -1, 1) * 32767).astype('<i2')
st = np.stack([pcm, np.roll(pcm, int(.012 * sr))], 1)  # slight stereo widening
with wave.open(out, 'wb') as w: w.setnchannels(2); w.setsampwidth(2); w.setframerate(sr); w.writeframes(st.tobytes())
