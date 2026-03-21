import { useEffect, useRef } from "react";
import * as THREE from "three";

function createShellGradientTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d")!;

    // Premium radial gradient aligned with Hero/Header palette.
    const gradient = ctx.createRadialGradient(512, 410, 70, 512, 512, 620);
    gradient.addColorStop(0, "rgba(247, 239, 239, 0.28)");
    gradient.addColorStop(0.28, "rgba(255, 102, 178, 0.24)");
    gradient.addColorStop(0.62, "rgba(155, 92, 255, 0.2)");
    gradient.addColorStop(1, "rgba(43, 7, 38, 0.08)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
}

export function useThree3d(containerRef: React.RefObject<HTMLDivElement | null>) {
    const sceneRef = useRef<THREE.Scene | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const orbGroupRef = useRef<THREE.Group | null>(null);
    const shellRef = useRef<THREE.Mesh | null>(null);
    const accentShapeRef = useRef<THREE.Mesh | null>(null);
    const accentBaseYRef = useRef(1.05);
    const accentBaseXRef = useRef(-1.35);
    const accentBaseZRef = useRef(-0.65);
    const isMobileRef = useRef(false);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Scene Setup
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(68, 1, 0.1, 1000);
        camera.position.z = 3.35;
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });
        const width = containerRef.current.clientWidth || window.innerWidth;
        const height = containerRef.current.clientHeight || window.innerHeight;
        renderer.setSize(width, height);
        renderer.setClearColor(0x000000, 0);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.15;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        containerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Gradient shell + separate wireframe shell.
        const shellGeometry = new THREE.IcosahedronGeometry(2.35, 2);
        const accentGeometry = new THREE.OctahedronGeometry(0.95, 1);
        const shellGradientTexture = createShellGradientTexture();
        shellGradientTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

        const shellFillMaterial = new THREE.MeshBasicMaterial({
            map: shellGradientTexture,
            transparent: true,
            opacity: 0.2,
            side: THREE.DoubleSide,
            depthWrite: false,
        });

        const shellWireMaterial = new THREE.MeshBasicMaterial({
            color: 0xe8b0ff,
            transparent: true,
            opacity: 0.09,
            wireframe: true,
        });

        const accentMaterial = new THREE.MeshBasicMaterial({
            color: 0xe8b0ff,
            transparent: true,
            opacity: 0.08,
            wireframe: true,
        });

        const orbGroup = new THREE.Group();
        orbGroup.position.set(4.25, -1.35, -1.15);

        const shellFill = new THREE.Mesh(shellGeometry, shellFillMaterial);
        const shellWire = new THREE.Mesh(shellGeometry, shellWireMaterial);
        shellFill.scale.setScalar(1.06);
        shellWire.scale.setScalar(1.075);

        const accentShape = new THREE.Mesh(accentGeometry, accentMaterial);
        accentShape.position.set(-2.45, 1.52, -1.05);
        accentShape.rotation.set(0.3, 0.15, 0.45);

        orbGroup.add(shellFill);
        orbGroup.add(shellWire);
        scene.add(accentShape);
        scene.add(orbGroup);

        orbGroupRef.current = orbGroup;
        shellRef.current = shellWire;
        accentShapeRef.current = accentShape;

        // Key + fill + rim lights to reveal volume
        const keyLight = new THREE.DirectionalLight(0xffc9ff, 1.85);
        keyLight.position.set(8.5, 4.2, 7.5);
        scene.add(keyLight);

        const fillLight = new THREE.PointLight(0x8f3985, 0.92, 20);
        fillLight.position.set(-3.4, -0.8, 2.8);
        scene.add(fillLight);

        const rimLight = new THREE.PointLight(0xf6beff, 2.35, 22);
        rimLight.position.set(3.5, 2.4, -2.1);
        scene.add(rimLight);

        const ambientLight = new THREE.AmbientLight(0x2b1733, 0.38);
        scene.add(ambientLight);

        const hemiLight = new THREE.HemisphereLight(0xf8deff, 0x100814, 0.24);
        scene.add(hemiLight);

        const applyResponsiveConfig = () => {
            const viewportWidth = containerRef.current?.clientWidth || window.innerWidth;
            const viewportHeight = containerRef.current?.clientHeight || window.innerHeight;
            const isMobile = viewportWidth <= 768;
            isMobileRef.current = isMobile;
            const sideOffset = Math.max(2, Math.min(3, viewportWidth / 320));

            camera.fov = isMobile ? 66 : 45;
            camera.position.z = isMobile ? 3.45 : 3.35;
            camera.aspect = viewportWidth / viewportHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(viewportWidth, viewportHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
            renderer.toneMappingExposure = isMobile ? 1.05 : 1.15;

            if (orbGroupRef.current) {
                orbGroupRef.current.position.set(
                    isMobile ? 0.85 : sideOffset + 0.1,
                    isMobile ? -0.38 : -1.35,
                    isMobile ? -0.38 : -1.15
                );
                orbGroupRef.current.scale.setScalar(isMobile ? 0.82 : 0.68);
            }

            shellFillMaterial.opacity = isMobile ? 0.2 : 0.4;
            shellWireMaterial.opacity = isMobile ? 0.06 : 0.09;
            accentShape.visible = !isMobile;
            if (!isMobile) {
                accentBaseXRef.current = -sideOffset * 0.80;
                accentBaseYRef.current = 0.90;
                accentBaseZRef.current = -1.05;
                accentShape.position.set(accentBaseXRef.current, accentBaseYRef.current, accentBaseZRef.current);
                accentShape.scale.setScalar(0.64);
            } else {
                accentBaseXRef.current = -1.2;
                accentBaseYRef.current = 0.55;
                accentBaseZRef.current = -0.75;
                accentShape.position.set(accentBaseXRef.current, accentBaseYRef.current, accentBaseZRef.current);
            }

            keyLight.intensity = isMobile ? 1.55 : 2.15;
            fillLight.intensity = isMobile ? 0.7 : 0.92;
            rimLight.intensity = isMobile ? 1.65 : 2.35;
            ambientLight.intensity = isMobile ? 0.3 : 0.38;
            hemiLight.intensity = isMobile ? 0.18 : 0.24;
        };

        applyResponsiveConfig();

        // Animation Loop
        const clock = new THREE.Timer();
        let frameId = 0;
        const animate = () => {
            frameId = requestAnimationFrame(animate);
            clock.update();
            const t = clock.getElapsed();
            const motionFactor = isMobileRef.current ? 0.25 : 0.42;

            if (orbGroupRef.current && shellRef.current) {
                orbGroupRef.current.rotation.y += 0.00095 * motionFactor;
                orbGroupRef.current.rotation.x = Math.sin(t * 0.22) * (isMobileRef.current ? 0.018 : 0.032);

                const baseY = isMobileRef.current ? -0.34 : -1.35;
                const bobAmount = isMobileRef.current ? 0.012 : 0.028;
                orbGroupRef.current.position.y = baseY + Math.sin(t * 0.65) * bobAmount;

                shellRef.current.rotation.y -= 0.0007 * motionFactor;
                shellRef.current.rotation.x += 0.0003 * motionFactor;
                shellFill.rotation.y += 0.00055 * motionFactor;
            }

            if (accentShapeRef.current) {
                accentShapeRef.current.rotation.x += 0.0003;
                accentShapeRef.current.rotation.y -= 0.00035;
                accentShapeRef.current.position.x = accentBaseXRef.current;
                accentShapeRef.current.position.z = accentBaseZRef.current;
                accentShapeRef.current.position.y = accentBaseYRef.current + Math.sin(t * 0.32) * 0.02;
            }

            const rimBaseX = isMobileRef.current ? 2.1 : 3.5;
            rimLight.position.x = rimBaseX + Math.sin(t * 0.16) * 0.45;
            rimLight.position.z = -2.1 + Math.cos(t * 0.14) * 0.18;

            renderer.render(scene, camera);
        };

        animate();

        // Handle Resize
        const handleResize = () => {
            applyResponsiveConfig();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(frameId);
            containerRef.current?.removeChild(renderer.domElement);
            shellGeometry.dispose();
            accentGeometry.dispose();
            shellFillMaterial.dispose();
            shellWireMaterial.dispose();
            accentMaterial.dispose();
            shellGradientTexture.dispose();
            renderer.dispose();
        };
    }, [containerRef]);
}
