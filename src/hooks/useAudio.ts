import { useCallback, useEffect, useRef } from "react";
import { soundAssets, type SoundKey } from "../config/soundAssets";
import {
  voiceAssets,
  voiceCooldownMs,
  type VoiceKey
} from "../config/voiceAssets";

type AudioCtxCtor = typeof AudioContext;

interface AudioController {
  playSound: (key: SoundKey) => void;
  playVoice: (key: VoiceKey, options?: { force?: boolean }) => void;
  ensureInit: () => void;
}

export interface UseAudioOptions {
  soundEnabled: boolean;
  voiceEnabled: boolean;
}

export function useAudio({ soundEnabled, voiceEnabled }: UseAudioOptions): AudioController {
  const ctxRef = useRef<AudioContext | null>(null);
  const soundBuffersRef = useRef<Map<SoundKey, AudioBuffer | null>>(new Map());
  const voiceBuffersRef = useRef<Map<string, AudioBuffer | null>>(new Map());
  const lastVoiceAtRef = useRef(0);
  const settingsRef = useRef({ soundEnabled, voiceEnabled });
  settingsRef.current = { soundEnabled, voiceEnabled };

  const ensureInit = useCallback(() => {
    if (ctxRef.current) {
      if (ctxRef.current.state === "suspended") {
        void ctxRef.current.resume();
      }
      return;
    }
    const Ctor: AudioCtxCtor | undefined =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: AudioCtxCtor }).webkitAudioContext;
    if (!Ctor) return;
    ctxRef.current = new Ctor();
  }, []);

  const loadBuffer = useCallback(async (url: string): Promise<AudioBuffer | null> => {
    const ctx = ctxRef.current;
    if (!ctx) return null;
    try {
      const res = await fetch(url);
      if (!res.ok) return null;
      const arr = await res.arrayBuffer();
      return await ctx.decodeAudioData(arr);
    } catch {
      return null;
    }
  }, []);

  // 合成音フォールバック
  const playSynth = useCallback((key: SoundKey) => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    let freq = 600;
    let dur = 0.08;
    let type: OscillatorType = "sine";
    let vol = 0.12;
    switch (key) {
      case "tap":
        freq = 880;
        dur = 0.06;
        type = "triangle";
        vol = 0.1;
        break;
      case "buy":
        freq = 660;
        dur = 0.18;
        type = "square";
        vol = 0.08;
        break;
      case "unlock":
        freq = 990;
        dur = 0.35;
        type = "sawtooth";
        vol = 0.1;
        break;
      case "levelup":
        freq = 1200;
        dur = 0.5;
        type = "triangle";
        vol = 0.12;
        break;
    }
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.8, now + dur);
    gain.gain.setValueAtTime(vol, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + dur);
  }, []);

  const playBuffer = useCallback((buf: AudioBuffer, volume = 1) => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const gain = ctx.createGain();
    gain.gain.value = volume;
    src.connect(gain).connect(ctx.destination);
    src.start();
  }, []);

  const playSound = useCallback(
    (key: SoundKey) => {
      if (!settingsRef.current.soundEnabled) return;
      ensureInit();
      const ctx = ctxRef.current;
      if (!ctx) return;
      const cached = soundBuffersRef.current.get(key);
      if (cached) {
        playBuffer(cached);
        return;
      }
      if (cached === null) {
        playSynth(key);
        return;
      }
      // 未読み込み: 読み込み試行（並列）し、間に合わない初回は合成音
      void loadBuffer(soundAssets[key]).then((buf) => {
        soundBuffersRef.current.set(key, buf);
      });
      playSynth(key);
    },
    [ensureInit, loadBuffer, playBuffer, playSynth]
  );

  const playVoice = useCallback(
    (key: VoiceKey, options?: { force?: boolean }) => {
      if (!settingsRef.current.voiceEnabled) return;
      const now = performance.now();
      if (!options?.force && now - lastVoiceAtRef.current < voiceCooldownMs) return;
      ensureInit();
      const ctx = ctxRef.current;
      if (!ctx) return;
      const list = voiceAssets[key] as readonly string[];
      if (!list || list.length === 0) return;
      const url = list[Math.floor(Math.random() * list.length)];
      const cached = voiceBuffersRef.current.get(url);
      lastVoiceAtRef.current = now;
      if (cached) {
        playBuffer(cached);
        return;
      }
      if (cached === null) {
        // ファイル無し: 静かに何もしない
        return;
      }
      void loadBuffer(url).then((buf) => {
        voiceBuffersRef.current.set(url, buf);
        if (buf) playBuffer(buf);
      });
    },
    [ensureInit, loadBuffer, playBuffer]
  );

  // クリーンアップ
  useEffect(() => {
    return () => {
      ctxRef.current?.close().catch(() => undefined);
    };
  }, []);

  return { playSound, playVoice, ensureInit };
}
