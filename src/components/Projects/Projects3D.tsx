"use client";

import { useRef } from "react";
import { useProjects3d } from "../../hooks/useProjects3d";
import styles from "./Project.module.css";

export default function Projects3D() {
    const containerRef = useRef<HTMLDivElement>(null);
    useProjects3d(containerRef);

    return (
        <div 
            ref={containerRef} 
            className={styles.meshCanvas} 
            aria-hidden="true" 
        />
    )
}
