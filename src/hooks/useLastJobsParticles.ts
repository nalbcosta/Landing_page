import { useEffect, useRef } from "react";
import * as THREE from "three";

export function useLastJobsParticles(
	containerRef: React.RefObject<HTMLDivElement | null>
) {
	const animationRef = useRef(0);

	useEffect(() => {
		if (!containerRef.current) return;

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(65, 1, 0.1, 100);
		camera.position.z = 40;

		const renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true,
			powerPreference: "high-performance",
		});

		renderer.setClearColor(0x000000, 0);
		renderer.outputColorSpace = THREE.SRGBColorSpace;
		containerRef.current.appendChild(renderer.domElement);

		// ──────── Wireframe Particle Geometries ────────────────────────────
		const group = new THREE.Group();
		scene.add(group);

		const particleCount = 24;
		const particles: {
			mesh: THREE.Mesh;
			velocity: THREE.Vector3;
			rotationVelocity: THREE.Vector3;
			basePos: THREE.Vector3;
		}[] = [];

		// Create wireframe geometries
		const geometries = [
			new THREE.IcosahedronGeometry(0.8, 0),
			new THREE.OctahedronGeometry(0.9, 0),
			new THREE.TetrahedronGeometry(1, 0),
			new THREE.DodecahedronGeometry(0.7, 0),
		];

		const wireMaterial = new THREE.MeshBasicMaterial({
			color: 0xe980fc, // brand-2
			wireframe: true,
			transparent: true,
			opacity: 0.35,
		});

		for (let i = 0; i < particleCount; i++) {
			const geometry =
				geometries[Math.floor(Math.random() * geometries.length)];
			const mesh = new THREE.Mesh(geometry, wireMaterial.clone());

			const x = (Math.random() - 0.5) * 90;
			const y = (Math.random() - 0.5) * 90;
			const z = (Math.random() - 0.5) * 60;

			mesh.position.set(x, y, z);
			mesh.scale.setScalar(Math.random() * 0.6 + 0.4);

			const velocity = new THREE.Vector3(
				(Math.random() - 0.5) * 0.06,
				(Math.random() - 0.5) * 0.06,
				(Math.random() - 0.5) * 0.03
			);

			const rotationVelocity = new THREE.Vector3(
				(Math.random() - 0.5) * 0.02,
				(Math.random() - 0.5) * 0.02,
				(Math.random() - 0.5) * 0.01
			);

			group.add(mesh);
			particles.push({
				mesh,
				velocity,
				rotationVelocity,
				basePos: new THREE.Vector3(x, y, z),
			});
		}

		// ──────── Responsive & Animation ──────────────────────────────
		const reduceMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)"
		).matches;

		const resize = () => {
			if (!containerRef.current) return;

			const width = containerRef.current.clientWidth || window.innerWidth;
			const height =
				containerRef.current.clientHeight || window.innerHeight * 0.4;

			camera.aspect = width / height;
			camera.updateProjectionMatrix();
			renderer.setSize(width, height);
			renderer.setPixelRatio(
				Math.min(window.devicePixelRatio, width <= 760 ? 1.5 : 2)
			);
		};

		resize();

		const clock = new THREE.Timer();
		const animate = () => {
			animationRef.current = window.requestAnimationFrame(animate);

			const t = clock.getElapsed();
			clock.update();

			const speed = reduceMotion ? 0.3 : 1;

			particles.forEach((particle, i) => {
				// Update position
				particle.mesh.position.x +=
					particle.velocity.x * speed;
				particle.mesh.position.y +=
					particle.velocity.y * speed;
				particle.mesh.position.z +=
					particle.velocity.z * speed;

				// Wrap around bounds
				const bounds = 50;
				if (Math.abs(particle.mesh.position.x) > bounds)
					particle.velocity.x *= -1;
				if (Math.abs(particle.mesh.position.y) > bounds)
					particle.velocity.y *= -1;
				if (Math.abs(particle.mesh.position.z) > 40)
					particle.velocity.z *= -1;

				// Subtle floating drift
				particle.mesh.position.x +=
					Math.sin(t * 0.3 + i * 0.5) * 0.008;
				particle.mesh.position.y +=
					Math.cos(t * 0.25 + i * 0.3) * 0.006;

				// Rotation
				particle.mesh.rotation.x +=
					particle.rotationVelocity.x * speed;
				particle.mesh.rotation.y +=
					particle.rotationVelocity.y * speed;
				particle.mesh.rotation.z +=
					particle.rotationVelocity.z * speed;

				// Pulse opacity
				const material = particle.mesh.material as THREE.MeshBasicMaterial;
				material.opacity = 0.2 + Math.sin(t * 0.8 + i) * 0.15;
			});

			renderer.render(scene, camera);
		};

		animate();
		window.addEventListener("resize", resize);

		return () => {
			window.removeEventListener("resize", resize);
			window.cancelAnimationFrame(animationRef.current);

			// Cleanup
			particles.forEach((p) => {
				(p.mesh.geometry as THREE.BufferGeometry).dispose();
				if (Array.isArray(p.mesh.material)) {
					p.mesh.material.forEach((m) => m.dispose());
				} else {
					p.mesh.material.dispose();
				}
			});

			renderer.dispose();
			containerRef.current?.removeChild(renderer.domElement);
		};
	}, [containerRef]);
}
