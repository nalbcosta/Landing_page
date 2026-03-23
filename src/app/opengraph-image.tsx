import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Nalbert Costa — Desenvolvedor Full-Stack";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const stack = ["Node.js", "React", "Next.js", "TypeScript", "Python", "Docker"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "64px 72px",
          background: "linear-gradient(145deg, #17131a 0%, #1a1620 55%, #200f28 100%)",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* ── Radial glow blobs ── */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            left: "-60px",
            width: "600px",
            height: "600px",
            borderRadius: "999px",
            background:
              "radial-gradient(circle, rgba(143,57,133,0.28) 0%, transparent 65%)",
            filter: "blur(2px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            right: "-80px",
            width: "640px",
            height: "640px",
            borderRadius: "999px",
            background:
              "radial-gradient(circle, rgba(233,128,252,0.18) 0%, transparent 65%)",
            filter: "blur(2px)",
          }}
        />

        {/* ── Grid texture ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* ── Top-right URL pill ── */}
        <div
          style={{
            position: "absolute",
            top: 48,
            right: 72,
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 18px",
            borderRadius: "999px",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {/* Dot */}
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "999px",
              background: "#e980fc",
              boxShadow: "0 0 8px rgba(233,128,252,0.8)",
            }}
          />
          <span
            style={{
              fontSize: 15,
              color: "rgba(242,239,233,0.7)",
              letterSpacing: "0.04em",
            }}
          >
            nalbertcosta.dev
          </span>
        </div>

        {/* ── Eyebrow ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              width: 32,
              height: 2,
              background:
                "linear-gradient(90deg, #8f3985, #e980fc)",
              borderRadius: "999px",
            }}
          />
          <span
            style={{
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(233,128,252,0.85)",
            }}
          >
            Portfólio
          </span>
        </div>

        {/* ── Name ── */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 900,
            letterSpacing: "-0.03em",
            lineHeight: 1,
            color: "#f2efe9",
            marginBottom: 14,
          }}
        >
          Nalbert Costa
        </div>

        {/* ── Title ── */}
        <div
          style={{
            fontSize: 30,
            fontWeight: 600,
            color: "rgba(162,167,158,0.95)",
            marginBottom: 40,
            letterSpacing: "-0.01em",
          }}
        >
          Desenvolvedor Full-Stack
        </div>

        {/* ── Tech stack chips ── */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {stack.map((tech) => (
            <div
              key={tech}
              style={{
                padding: "7px 16px",
                borderRadius: "999px",
                fontSize: 14,
                fontWeight: 600,
                color: "rgba(242,239,233,0.88)",
                background: "rgba(10,8,16,0.55)",
                border: "1px solid rgba(162,167,158,0.22)",
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
