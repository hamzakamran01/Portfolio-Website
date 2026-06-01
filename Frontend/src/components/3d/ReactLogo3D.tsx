import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ReactLogo3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const getLogoSize = () => {
      const width = window.innerWidth;
      if (width <= 480) return 0.7;
      if (width <= 768) return 1.5;
      if (width <= 1024) return 1.8;
      return 2;
    };

    const getYPosition = () => {
      const width = window.innerWidth;
      if (width <= 400) return 0;
      if (width <= 480) return 0.5;
      if (width <= 768) return -0.3;
      if (width <= 1024) return -0.2;
      return -0.35;
    };

    const getXPosition = () => {
      const width = window.innerWidth;
      if (width <= 480) return 0;
      if (width <= 768) return 0.2;
      if (width <= 1024) return -0.2;
      return -0.5;
    };

    const geometry = new THREE.CylinderGeometry(getLogoSize(), getLogoSize(), 0.5, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x00E7FF, wireframe: true });
    const logo = new THREE.Mesh(geometry, material);
    logo.position.y = getYPosition();
    logo.position.x = getXPosition();
    logo.position.z = 0;
    scene.add(logo);

    const createParticlesGeometry = () => {
      const width = window.innerWidth;
      const particlesCount = width < 768 ? 150 : 200;
      const positions = new Float32Array(particlesCount * 3);
      const radius = width < 768 ? 13 : 35;

      for (let i = 0; i < particlesCount * 3; i += 3) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI * 2;
        const r = (Math.random() * 0.5 + 0.5) * radius;

        positions[i] = r * Math.sin(phi) * Math.cos(theta) + (Math.random() - 0.5) * 10;
        positions[i + 1] = r * Math.sin(phi) * Math.sin(theta) + (Math.random() - 0.5) * 10;
        positions[i + 2] = r * Math.cos(phi) + (Math.random() - 0.5) * 5;

        if (isNaN(positions[i])) positions[i] = 0;
        if (isNaN(positions[i + 1])) positions[i + 1] = 0;
        if (isNaN(positions[i + 2])) positions[i + 2] = 0;
      }

      const particlesGeometry = new THREE.BufferGeometry();
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      return particlesGeometry;
    };

    const particlesGeometry = createParticlesGeometry();
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x39ff14,
      size: window.innerWidth < 768 ? 0.15 : 0.3,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    particles.position.z = -8;
    particles.position.x = getXPosition() - 2;
    particles.position.y = getYPosition();
    scene.add(particles);

    camera.position.z = window.innerWidth < 768 ? 8 : 10;
    camera.position.y = window.innerWidth < 768 ? 1.5 : 2;

    const animate = () => {
      requestAnimationFrame(animate);
      logo.rotation.y += window.innerWidth < 768 ? 0.007 : 0.01;
      particles.rotation.y += window.innerWidth < 768 ? 0.003 : 0.004;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      const newSize = getLogoSize();
      const newYPosition = getYPosition();
      const newXPosition = getXPosition();

      logo.scale.set(newSize, newSize, 1);
      logo.position.y = newYPosition;
      logo.position.x = newXPosition;

      const newParticlesGeometry = createParticlesGeometry();
      particles.geometry.dispose();
      particles.geometry = newParticlesGeometry;

      particles.position.y = newYPosition;
      particles.position.x = newXPosition - 5.5;

      if (particles.material instanceof THREE.PointsMaterial) {
        particles.material.size = width < 768 ? 0.1 : 0.12;
      }

      camera.position.z = width < 768 ? 8 : 10;
      camera.position.y = width < 768 ? 1.5 : 2;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);

      geometry.dispose();
      material.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="react-logo-3d" />;
};

export default ReactLogo3D;
