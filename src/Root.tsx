import { Composition } from "remotion";
import { MainVideo } from "./MainVideo";

export const FPS = 30;
export const DURATION_SECONDS = 8;

export const RemotionRoot = () => (
  <Composition
    id="MainVideo"
    component={MainVideo}
    durationInFrames={FPS * DURATION_SECONDS}
    fps={FPS}
    width={1920}
    height={1080}
  />
);
