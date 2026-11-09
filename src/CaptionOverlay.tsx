import { useMemo } from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { createTikTokStyleCaptions } from "@remotion/captions";
import type { Caption, TikTokPage } from "@remotion/captions";

const COMBINE_MS = 1200;

const Page = ({ page }: { page: TikTokPage }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const nowMs = (frame / fps) * 1000 + page.startMs;

  return (
    <AbsoluteFill
      style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 140 }}
    >
      <div
        style={{
          fontFamily: "Inter, Arial, sans-serif",
          fontWeight: 800,
          fontSize: 84,
          color: "white",
          textShadow: "0 4px 24px rgba(0,0,0,0.7)",
          whiteSpace: "pre",
        }}
      >
        {page.tokens.map((token) => {
          const active = token.fromMs <= nowMs && token.toMs > nowMs;
          return (
            <span key={token.fromMs} style={{ color: active ? "#ff7a1a" : "white" }}>
              {token.text}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

export const CaptionOverlay = ({ captions }: { captions: Caption[] }) => {
  const { fps } = useVideoConfig();
  const { pages } = useMemo(
    () => createTikTokStyleCaptions({ captions, combineTokensWithinMilliseconds: COMBINE_MS }),
    [captions],
  );

  return (
    <AbsoluteFill>
      {pages.map((page, i) => {
        const next = pages[i + 1] ?? null;
        const from = Math.round((page.startMs / 1000) * fps);
        const end = next ? next.startMs : page.startMs + COMBINE_MS;
        const duration = Math.max(1, Math.round(((end - page.startMs) / 1000) * fps));
        return (
          <Sequence key={i} from={from} durationInFrames={duration} layout="none">
            <Page page={page} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
