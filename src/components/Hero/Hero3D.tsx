"use client";

import { useRef } from "react";
import { useThree3d } from "../../hooks/useThree3d";

type Props = { flip?: boolean };

export default function Hero3D({ flip = false }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    useThree3d(containerRef, flip);

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