"use client";

import { useRef } from "react";
import { useThree3d } from "../../hooks/useThree3d";

export default function Hero3D() {
    const containerRef = useRef<HTMLDivElement>(null);
    useThree3d(containerRef);

    return (
        <div
            ref={containerRef}
            style={{
                position: "absolute",
                inset: 0,
                zIndex: 10,
                opacity: 0.96,
                mixBlendMode: "normal",
                pointerEvents: "none",
            }}
        />
    );
}