import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeStageCanvasProps {
  activeMemberIndex: number;
}

export default function ThreeStageCanvas({ activeMemberIndex }: ThreeStageCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const spotlightsRef = useRef<THREE.Mesh[]>([]);
  const spotBulbsRef = useRef<THREE.Mesh[]>([]);
  const particlesRef = useRef<THREE.Points | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x07020d, 0.035);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 14);
    cameraRef.current = camera;

    // 2. WebGL Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch (e) {
      console.warn("WebGL initialization fallback", e);
      return;
    }

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 3. Ambient & Point Lighting
    const ambientLight = new THREE.AmbientLight(0x18092e, 1.2);
    scene.add(ambientLight);

    const purpleLight = new THREE.PointLight(0xa855f7, 2.5, 30);
    purpleLight.position.set(0, 4, 2);
    scene.add(purpleLight);

    // 4. Volumetric Stage Spotlights at the bottom (7 spotlights for 7 members)
    const spotlightMeshes: THREE.Mesh[] = [];
    const bulbMeshes: THREE.Mesh[] = [];
    const memberSpacing = 2.4;
    const startX = -((7 - 1) * memberSpacing) / 2;

    for (let i = 0; i < 7; i++) {
      const posX = startX + i * memberSpacing;

      // Cone geometry: radiusTop, radiusBottom, height, radialSegments
      const coneGeo = new THREE.CylinderGeometry(0.12, 1.8, 12, 32, 1, true);
      const coneMat = new THREE.MeshBasicMaterial({
        color: 0xc084fc,
        transparent: true,
        opacity: 0.18,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      const cone = new THREE.Mesh(coneGeo, coneMat);
      cone.position.set(posX, 0.5, 0);
      cone.rotation.z = (posX / 10) * -0.15; // slight tilt towards center
      scene.add(cone);
      spotlightMeshes.push(cone);

      // Spotlight fixture bulb
      const bulbGeo = new THREE.SphereGeometry(0.2, 16, 16);
      const bulbMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        blending: THREE.AdditiveBlending,
      });
      const bulb = new THREE.Mesh(bulbGeo, bulbMat);
      bulb.position.set(posX, -5.5, 0);
      scene.add(bulb);
      bulbMeshes.push(bulb);
    }

    spotlightsRef.current = spotlightMeshes;
    spotBulbsRef.current = bulbMeshes;

    // 5. 3D Floating Particle Galaxy (1,200 stardust particles)
    const particleCount = 1200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorViolet = new THREE.Color(0xa855f7);
    const colorLavender = new THREE.Color(0xe9d5ff);
    const colorGold = new THREE.Color(0xf5e0b7);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 35;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      const mixedColor = Math.random() > 0.4 ? colorViolet : Math.random() > 0.5 ? colorLavender : colorGold;
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // 6. Mouse Parallax Tracking
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.8;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.8;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 7. Window Resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // 8. Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Rotate particle galaxy gently
      if (particlesRef.current) {
        particlesRef.current.rotation.y = elapsedTime * 0.02;
        particlesRef.current.rotation.x = Math.sin(elapsedTime * 0.015) * 0.05;
      }

      // Smooth camera dampening with mouse
      if (cameraRef.current) {
        cameraRef.current.position.x += (mouseX - cameraRef.current.position.x) * 0.03;
        cameraRef.current.position.y += (-mouseY - cameraRef.current.position.y) * 0.03;
        cameraRef.current.lookAt(0, 0, 0);
      }

      // Spotlight subtle oscillation
      spotlightsRef.current.forEach((spot, idx) => {
        spot.rotation.z = Math.sin(elapsedTime * 0.8 + idx * 0.6) * 0.06;
      });

      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // 9. Cleanup on Unmount
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose geometries and materials
      spotlightMeshes.forEach((mesh) => {
        mesh.geometry.dispose();
        (mesh.material as THREE.Material).dispose();
      });
      bulbMeshes.forEach((mesh) => {
        mesh.geometry.dispose();
        (mesh.material as THREE.Material).dispose();
      });
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  // Update spotlight intensity based on active member
  useEffect(() => {
    spotlightsRef.current.forEach((spot, idx) => {
      const mat = spot.material as THREE.MeshBasicMaterial;
      if (activeMemberIndex === 0) {
        mat.opacity = 0.18;
        mat.color.setHex(0xc084fc);
      } else if (activeMemberIndex === idx + 1) {
        mat.opacity = 0.55;
        mat.color.setHex(0xf3e8ff);
      } else {
        mat.opacity = 0.05;
        mat.color.setHex(0x7e22ce);
      }
    });

    spotBulbsRef.current.forEach((bulb, idx) => {
      const mat = bulb.material as THREE.MeshBasicMaterial;
      if (activeMemberIndex === 0 || activeMemberIndex === idx + 1) {
        mat.color.setHex(0xffffff);
      } else {
        mat.color.setHex(0xa855f7);
      }
    });
  }, [activeMemberIndex]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
      aria-hidden="true"
    />
  );
}
