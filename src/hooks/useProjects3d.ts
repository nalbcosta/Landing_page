import { useEffect, useRef } from "react";
import * as THREE from "three";

export function useProjects3d(containerRef: React.RefObject<HTMLDivElement | null>) {
    const animationRef = useRef(0);

    useEffect(() => {
        if (!containerRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 100);
        camera.position.set(0, 0.12, 3.6);

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
        });

        renderer.setClearColor(0x000000, 0);
        renderer.outputColorSpace = THREE.SRGBColorSpace;

        containerRef.current.appendChild(renderer.domElement);

        const frontGeometry = new THREE.PlaneGeometry(52, 4.2, 52, 11);
        const backGeometry = new THREE.PlaneGeometry(46, 3.8, 42, 9);

        const frontMaterial = new THREE.MeshBasicMaterial({
            color: 0xc084fc,
            wireframe: true,
            transparent: true,
            opacity: 0.18,
        });

        const backMaterial = new THREE.MeshBasicMaterial({
            color: 0x7c3aed,
            wireframe: true,
            transparent: true,
            opacity: 0.1,
        });

        const frontMesh = new THREE.Mesh(frontGeometry, frontMaterial);
        const backMesh = new THREE.Mesh(backGeometry, backMaterial);

        frontMesh.rotation.x = -0.44;
        frontMesh.rotation.z = -0.03;
        frontMesh.position.set(0.05, 0.08, 0.3);

        backMesh.rotation.x = -0.50;
        backMesh.rotation.z = -0.02;
        backMesh.position.set(-0.15, -0.06, -1.2);
        backMesh.scale.setScalar(1.04);

        scene.add(backMesh);
        scene.add(frontMesh);

        const frontPositions = frontGeometry.attributes.position.array as Float32Array;
        const backPositions = backGeometry.attributes.position.array as Float32Array;
        const frontBase = frontPositions.slice();
        const backBase = backPositions.slice();

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const resize = () => {
            if (!containerRef.current) return;

            const width = containerRef.current.clientWidth || window.innerWidth;
            const height = containerRef.current.clientHeight || 120;
            const isMobile = width <= 760;

            camera.fov = isMobile ? 64 : 45;
            camera.aspect = width / height;
            camera.position.y = isMobile ? 0.05 : 0.7;
            camera.position.z = isMobile ? 4.0 : 3.2;
            camera.updateProjectionMatrix();

            renderer.setSize(width, height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));

            frontMaterial.opacity = isMobile ? 0.15 : 0.18;
            backMaterial.opacity = isMobile ? 0.08 : 0.10;
        };

        resize();

        const clock = new THREE.Clock();
        const animate = () => {
            animationRef.current = window.requestAnimationFrame(animate);

            const t = clock.getElapsedTime();
            const frontSpeed = reduceMotion ? 0.35 : 1;
            const backSpeed = reduceMotion ? 0.25 : 0.88;

            for (let i = 0; i < frontPositions.length; i += 3) {
                const x = frontBase[i];
                const y = frontBase[i + 1];
                const z = frontBase[i + 2];

                const waveA = Math.sin((x * 0.42 + t * 1.1) * frontSpeed) * 0.14;
                const waveB = Math.cos((y * 1.6 - t * 0.95) * frontSpeed) * 0.07;
                const ripple = Math.sin((x * 0.28 + y) * 1.1 + t * 1.4 * frontSpeed) * 0.03;

                frontPositions[i + 1] = y + Math.sin((x * 0.22 + t * 0.7) * frontSpeed) * 0.018;
                frontPositions[i + 2] = z + waveA + waveB + ripple;
            }

            for (let i = 0; i < backPositions.length; i += 3) {
                const x = backBase[i];
                const y = backBase[i + 1];
                const z = backBase[i + 2];

                const waveA = Math.sin((x * 0.38 + t * 0.84) * backSpeed) * 0.10;
                const waveB = Math.cos((y * 1.5 - t * 0.66) * backSpeed) * 0.06;

                backPositions[i + 2] = z + waveA + waveB;
            }

            frontGeometry.attributes.position.needsUpdate = true;
            backGeometry.attributes.position.needsUpdate = true;

            frontMesh.rotation.y = Math.sin(t * 0.24) * 0.045;
            backMesh.rotation.y = Math.cos(t * 0.2) * 0.038;

            renderer.render(scene, camera);
        };

        animate();
        window.addEventListener("resize", resize);

        return () => {
            window.removeEventListener("resize", resize);
            window.cancelAnimationFrame(animationRef.current);
            frontGeometry.dispose();
            backGeometry.dispose();
            frontMaterial.dispose();
            backMaterial.dispose();
            renderer.dispose();
            containerRef.current?.removeChild(renderer.domElement);
        };
    }, [containerRef]);
}
