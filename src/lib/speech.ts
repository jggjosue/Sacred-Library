// Voice picker tuned for natural, less-robotic narration with Web Speech API.

const STRONG_VOICE_NAMES = [
  // Spanish
  "Jorge",
  "Diego",
  "Pablo",
  "Carlos",
  "Miguel",
  "Enrique",
  "Lorenzo",
  // English
  "Alex",
  "Daniel",
  "Thomas",
  "Fred",
  "Arthur",
  "Aaron",
  "Oliver",
  "George",
  "James",
  "Ralph",
  // Portuguese
  "Joaquim",
  "Luciano",
  "João",
  // French
  "Thomas",
  "Bruno",
  "Henri",
  // German
  "Hans",
  "Markus",
  "Yannick",
  // Italian
  "Giorgio",
  "Luca",
  "Alessandro",
  // Russian
  "Yuri",
  "Pavel",
  // Brazilian / Other
  "Ricardo",
  "Felipe",
];

const NATURAL_HINTS = [
  "natural",
  "neural",
  "wavenet",
  "premium",
  "enhanced",
  "siri",
  "microsoft",
  "google us english",
  "google uk english",
];

const ROBOTIC_HINTS = [
  "espeak",
  "festival",
  "compact",
  "synth",
  "legacy",
  "sam",
];

const MALE_HINTS = [" male", " masculino", "masculin", "masculine"];

const FEMALE_HINTS = [" female", " femenina", " feminine", "feminin"];

function scoreVoice(
  voice: SpeechSynthesisVoice,
  targetLang: string
): number {
  const lang = voice.lang.toLowerCase();
  const target = targetLang.toLowerCase();
  const base = target.split("-")[0];

  let score = 0;

  // Language match
  if (lang === target) score += 100;
  else if (lang.startsWith(`${base}-`)) score += 60;
  else if (lang.startsWith(base)) score += 40;
  else return -1; // Reject non-matching langs outright

  const name = voice.name;
  const nameLower = name.toLowerCase();

  // Strong known names (small preference only; naturalness is more important)
  if (STRONG_VOICE_NAMES.some((n) => name.includes(n))) score += 10;

  // Hints on name metadata
  if (MALE_HINTS.some((h) => nameLower.includes(h))) score += 5;
  if (FEMALE_HINTS.some((h) => nameLower.includes(h))) score -= 2;

  // Prefer modern/natural variants
  if (NATURAL_HINTS.some((h) => nameLower.includes(h))) score += 40;
  if (ROBOTIC_HINTS.some((h) => nameLower.includes(h))) score -= 35;

  // Prefer local voices over remote (typically lower latency and better quality)
  if (voice.localService) score += 12;

  // Default voices get a small boost
  if (voice.default) score += 2;

  return score;
}

export function pickStrongVoice(
  targetLang: string
): SpeechSynthesisVoice | undefined {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return undefined;
  }
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return undefined;

  let bestVoice: SpeechSynthesisVoice | undefined;
  let bestScore = -1;

  for (const v of voices) {
    const score = scoreVoice(v, targetLang);
    if (score > bestScore) {
      bestScore = score;
      bestVoice = v;
    }
  }

  return bestVoice;
}

// Tuning focused on natural listening (avoid "robotic" effect).
export const NARRATOR_SETTINGS = {
  rate: 0.96,
  pitch: 0.98,
  volume: 1,
} as const;

export function applyNarratorSettings(utterance: SpeechSynthesisUtterance) {
  utterance.rate = NARRATOR_SETTINGS.rate;
  utterance.pitch = NARRATOR_SETTINGS.pitch;
  utterance.volume = NARRATOR_SETTINGS.volume;
  const voice = pickStrongVoice(utterance.lang);
  if (voice) utterance.voice = voice;
}

/**
 * Chrome/Safari/Edge often need `speechSynthesis.resume()` and a populated voice list
 * before `speak()` actually produces sound. Runs `speak` when the engine is ready.
 * Keeps the first attempt on the same frame when voices are already available.
 */
export function runSpeechWhenReady(speak: () => void): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return;
  }
  const synth = window.speechSynthesis;
  synth.resume();
  synth.getVoices();

  let ran = false;
  /** Use `number` so DOM timers match `window.setTimeout` (avoids NodeJS.Timeout from @types/node). */
  let fallbackId: number | undefined;

  const run = () => {
    if (ran) return;
    ran = true;
    synth.removeEventListener("voiceschanged", onVoices);
    if (fallbackId !== undefined) window.clearTimeout(fallbackId);
    speak();
  };

  const onVoices = () => run();

  if (synth.getVoices().length > 0) {
    run();
    return;
  }

  window.requestAnimationFrame(() => {
    if (synth.getVoices().length > 0) {
      run();
      return;
    }
    synth.addEventListener("voiceschanged", onVoices);
    fallbackId = window.setTimeout(run, 150);
  });
}
