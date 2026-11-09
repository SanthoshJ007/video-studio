import { AbsoluteFill, staticFile, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { Scene3D } from "./Scene3D";
import { CaptionOverlay } from "./CaptionOverlay";
import { captions } from "./captionData";

export const MainVideo = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // fade audio in/out
  const volume = interpolate(
    frame,
    [0, 20, durationInFrames - 30, durationInFrames],
    [0, 0.4, 0.4, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#0b1020" }}>
      <Scene3D />
      <CaptionOverlay captions={captions} />
      {/* Replace public/audio.wav with your own music or voiceover (mp3/wav) */}
      <Audio src={staticFile("audio.wav")} volume={volume} />
    </AbsoluteFill>
  );
};
