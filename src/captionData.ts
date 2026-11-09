import type { Caption } from "@remotion/captions";

const words = [
  ["Building", 300, 800],
  ["robots", 800, 1300],
  ["starts", 1300, 1800],
  ["with", 1800, 2100],
  ["code.", 2100, 2800],
  ["Every", 3200, 3600],
  ["frame", 3600, 4100],
  ["is", 4100, 4300],
  ["rendered", 4300, 4900],
  ["from", 4900, 5200],
  ["pure", 5200, 5600],
  ["React.", 5600, 6400],
] as const;

export const captions: Caption[] = words.map(([text, startMs, endMs]) => ({
  text: ` ${text}`,
  startMs,
  endMs,
  timestampMs: (startMs + endMs) / 2,
  confidence: null,
}));
