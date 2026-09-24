/**
 * Harshil Shah Portfolio - Generative Three.js Background System
 * 
 * Creates an understated, slowly revolving mathematical network wireframe
 * with a pitch-black inner core, ambient luminous nodes, and deep-space particle drift.
 * Completely responsive, adheres to prefers-reduced-motion, and reacts gently to cursor movement.
 */

(function () {
  const canvas = document.getElementById('webglCanvas');
  if (!canvas) return;

  // Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });

  function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }
  resize();
  window.addEventListener('resize', resize);

  // Position camera so geometry sits atmospheric behind the hero
  camera.position.z = 6.2;

  // Master group
  const systemGroup = new THREE.Group();
  scene.add(systemGroup);

  // 1. Central Pitch-Black Void Core (Disc facing camera, subtle dark mask)
  const coreGeom = new THREE.CircleGeometry(1.22, 64);
  const coreMat = new THREE.MeshBasicMaterial({
    color: 0x060608,
    side: THREE.DoubleSide
  });
  const blackCore = new THREE.Mesh(coreGeom, coreMat);
  scene.add(blackCore);

  // 2. Primary Outer Icosahedral Lattice (Distribution & System Network)
  const icoGeom = new THREE.IcosahedronGeometry(2.35, 1);
  const icoWire = new THREE.WireframeGeometry(icoGeom);
  const icoMat = new THREE.LineBasicMaterial({
    color: 0x272d38, // Refined slate-zinc
    transparent: true,
    opacity: 0.6
  });
  const icoMesh = new THREE.LineSegments(icoWire, icoMat);
  systemGroup.add(icoMesh);

  // 3. Secondary Concentric Dodecahedron Cage
  const dodecaGeom = new THREE.DodecahedronGeometry(2.48, 0);
  const dodecaWire = new THREE.WireframeGeometry(dodecaGeom);
  const dodecaMat = new THREE.LineBasicMaterial({
    color: 0x181e28, // Deeper subtle tone
    transparent: true,
    opacity: 0.38
  });
  const dodecaMesh = new THREE.LineSegments(dodecaWire, dodecaMat);
  systemGroup.add(dodecaMesh);

  // 4. Luminous Vertex Nodes (Network Junctions)
  const nodePositions = icoGeom.attributes.position.array;
  const nodeGeom = new THREE.BufferGeometry();
  nodeGeom.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
  const nodeMat = new THREE.PointsMaterial({
    size: 0.035,
    color: 0x94a3b8, // Slate luminous dots
    transparent: true,
    opacity: 0.75
  });
  const nodes = new THREE.Points(nodeGeom, nodeMat);
  systemGroup.add(nodes);

  // 5. Ambient Atmospheric Dust / Constellation Particles
  const particleCount = 120;
  const posArray = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i += 3) {
    const radius = 2.2 + Math.random() * 2.8;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);
    posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
    posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
    posArray[i + 2] = radius * Math.cos(phi);
  }
  const particleGeom = new THREE.BufferGeometry();
  particleGeom.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  const particleMat = new THREE.PointsMaterial({
    size: 0.018,
    color: 0x475569,
    transparent: true,
    opacity: 0.55
  });
  const particleField = new THREE.Points(particleGeom, particleMat);
  scene.add(particleField);

  // Mouse Parallax Lerping
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  window.addEventListener('mousemove', (e) => {
    if (prefersReducedMotion) return;
    targetX = (e.clientX / window.innerWidth - 0.5) * 0.45;
    targetY = (e.clientY / window.innerHeight - 0.5) * 0.45;
  });

  // Render loop
  function animate() {
    requestAnimationFrame(animate);

    if (!prefersReducedMotion) {
      // Slow, hypnotic autonomous rotation
      systemGroup.rotation.y += 0.0012;
      systemGroup.rotation.x += 0.0005;

      // Mouse easing
      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;

      systemGroup.position.x = currentX;
      systemGroup.position.y = -currentY;

      particleField.rotation.y -= 0.0004;
    }

    renderer.render(scene, camera);
  }

  animate();
})();
