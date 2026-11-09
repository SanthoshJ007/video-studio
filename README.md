# 3D Video Studio (Three.js + Remotion)

3D scene (React Three Fiber) + captions + audio, rendered to MP4.

## Run
```bash
npm install
npm run dev      # opens Remotion Studio (live preview, scrub timeline)
npm run build    # renders out/video.mp4
```
First render downloads a headless Chrome automatically (needs internet).

## Files
- `src/Scene3D.tsx`   - the 3D animation (robot arm). Animate ONLY with `useCurrentFrame()`, never `useFrame()`.
- `src/captionData.ts` - word-level captions (startMs / endMs). Edit text and timing here.
- `src/CaptionOverlay.tsx`- TikTok-style caption renderer with active-word highlight.
- `src/MainVideo.tsx` - combines scene + captions + audio.
- `src/Root.tsx`      - resolution, fps, duration (1920x1080, 30fps, 8s).
- `public/audio.wav`  - placeholder tone. Replace with your music/voiceover and keep the name, or change it in MainVideo.tsx.

## Tips
- Change length: edit `DURATION_SECONDS` in Root.tsx.
- Vertical video (Reels/Shorts): width 1080, height 1920 in Root.tsx.
- Auto captions from audio: use `@remotion/install-whisper-cpp` (see Remotion docs) and convert its output to the `Caption[]` format.
- Load a GLB model: `useGLTF` from `@react-three/drei` with `staticFile("model.glb")`.
- All `remotion` and `@remotion/*` versions must match exactly (they are pinned to 4.0.542). Upgrade with `npm run upgrade`.
