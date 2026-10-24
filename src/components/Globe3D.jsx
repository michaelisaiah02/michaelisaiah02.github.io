import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Globe3D = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Setup Scene, Camera, & Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    const size = Math.min(container.clientWidth || 380, 420);
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 2. Inti Samudra (Deep Ocean Sphere)
    const oceanGeo = new THREE.IcosahedronGeometry(1.55, 3);
    const oceanMat = new THREE.MeshPhongMaterial({
      color: 0x0c4a6e, // Deep Ocean Blue
      emissive: 0x082f49,
      shininess: 60,
      flatShading: true,
    });
    const oceanMesh = new THREE.Mesh(oceanGeo, oceanMat);
    globeGroup.add(oceanMesh);

    // 3. Lapisan Kontur Daratan / Topografi (Emerald Wireframe Terrain)
    const landGeo = new THREE.IcosahedronGeometry(1.58, 2);
    const landMat = new THREE.MeshBasicMaterial({
      color: 0x10b981, // Emerald Nature Green
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const landMesh = new THREE.Mesh(landGeo, landMat);
    globeGroup.add(landMesh);

    // 4. Titik-Titik Destinasi 195 Negara (Glowing World Beacons)
    const beaconGroup = new THREE.Group();
    const beaconGeo = new THREE.SphereGeometry(0.035, 8, 8);
    
    for (let i = 0; i < 45; i++) {
      const isHomeBase = i === 0; // Titik pertama = Basecamp Indonesia
      const beaconMat = new THREE.MeshBasicMaterial({
        color: isHomeBase ? 0xf59e0b : i % 2 === 0 ? 0x10b981 : 0x38bdf8,
      });
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);

      // Sebar titik secara merata di permukaan bola (Fibonacci Sphere)
      const phi = Math.acos(1 - (2 * (i + 0.5)) / 45);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = 1.6;

      beacon.position.set(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );

      if (isHomeBase) beacon.scale.set(1.8, 1.8, 1.8);
      beaconGroup.add(beacon);
    }
    globeGroup.add(beaconGroup);

    // 5. Cincin Orbit Kompas / Khatulistiwa (Explorer Ring)
    const ringGeo = new THREE.TorusGeometry(2.05, 0.012, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x0ea5e9,
      transparent: true,
      opacity: 0.4,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2.3;
    ringMesh.rotation.y = Math.PI / 8;
    scene.add(ringMesh);

    // 6. Partikel Alam / Bioluminescent Plankton Mengambang
    const particlesGeo = new THREE.BufferGeometry();
    const particleCount = 60;
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5;
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({
      size: 0.04,
      color: 0x34d399,
      transparent: true,
      opacity: 0.7,
    });
    const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particlesMesh);

    // 7. Pencahayaan (Lighting)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x10b981, 2.5);
    dirLight1.position.set(5, 3, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x0ea5e9, 2);
    dirLight2.position.set(-5, -3, 2);
    scene.add(dirLight2);

    // 8. Interaksi Mouse & Drag
    let mouseX = 0;
    let mouseY = 0;
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };

    const handleMouseMove = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mouseX = x * 0.4;
      mouseY = y * 0.4;

      if (isDragging) {
        const deltaX = e.clientX - prevMouse.x;
        const deltaY = e.clientY - prevMouse.y;
        globeGroup.rotation.y += deltaX * 0.008;
        globeGroup.rotation.x += deltaY * 0.008;
        prevMouse = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseDown = (e) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('mousemove', handleMouseMove);
    domElem.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // 9. Animation Loop
    let reqId;
    const animate = () => {
      reqId = requestAnimationFrame(animate);

      if (!isDragging) {
        globeGroup.rotation.y += 0.004; // Putaran otomatis bumi
        globeGroup.rotation.x += (mouseY - globeGroup.rotation.x) * 0.03;
      }

      ringMesh.rotation.z -= 0.002;
      particlesMesh.rotation.y += 0.001;

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup saat komponen di-unmount
    return () => {
      cancelAnimationFrame(reqId);
      domElem.removeEventListener('mousemove', handleMouseMove);
      domElem.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="cursor-grab active:cursor-grabbing flex items-center justify-center select-none"
      title="Drag untuk memutar Bumi 3D"
    />
  );
};

export default Globe3D;