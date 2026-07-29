/* ============================================================
   Three.js Stage — Partikelnebel & driftende Glut
   Claude Fable 5 (Anthropic)
   ============================================================ */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var canvas = document.getElementById("stage");
  if (!canvas || typeof THREE === "undefined") return;

  var renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance"
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  var scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0b0908, 0.055);

  var camera = new THREE.PerspectiveCamera(
    60, window.innerWidth / window.innerHeight, 0.1, 100
  );
  camera.position.set(0, 0, 14);

  /* ---- Ember / dust particles ---- */
  var COUNT = reduceMotion ? 400 : 1600;
  var positions = new Float32Array(COUNT * 3);
  var colors = new Float32Array(COUNT * 3);
  var seeds = new Float32Array(COUNT);

  var palette = [
    new THREE.Color(0xd43a3a), // blood
    new THREE.Color(0xc9a45c), // gold
    new THREE.Color(0xe9e1d2), // bone
    new THREE.Color(0x8f1d22)  // deep red
  ];

  for (var i = 0; i < COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 44;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 26;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    var c = palette[Math.floor(Math.random() * palette.length)];
    var dim = 0.25 + Math.random() * 0.75;
    colors[i * 3] = c.r * dim;
    colors[i * 3 + 1] = c.g * dim;
    colors[i * 3 + 2] = c.b * dim;
    seeds[i] = Math.random() * Math.PI * 2;
  }

  var geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  // Soft round sprite via canvas texture
  var spriteCanvas = document.createElement("canvas");
  spriteCanvas.width = spriteCanvas.height = 64;
  var ctx = spriteCanvas.getContext("2d");
  var grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.35, "rgba(255,255,255,0.55)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);
  var sprite = new THREE.CanvasTexture(spriteCanvas);

  var mat = new THREE.PointsMaterial({
    size: 0.14,
    map: sprite,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  var points = new THREE.Points(geo, mat);
  scene.add(points);

  /* ---- Faint geometric structure (die Konfiguration) ---- */
  var icoGeo = new THREE.IcosahedronGeometry(6.5, 1);
  var icoMat = new THREE.MeshBasicMaterial({
    color: 0x8f1d22,
    wireframe: true,
    transparent: true,
    opacity: 0.07
  });
  var ico = new THREE.Mesh(icoGeo, icoMat);
  ico.position.set(7, -1, -6);
  scene.add(ico);

  var ico2 = new THREE.Mesh(
    new THREE.IcosahedronGeometry(3.4, 0),
    new THREE.MeshBasicMaterial({
      color: 0xc9a45c, wireframe: true, transparent: true, opacity: 0.05
    })
  );
  ico2.position.set(-9, 3, -8);
  scene.add(ico2);

  /* ---- Interaction state ---- */
  var mouse = { x: 0, y: 0 };
  var targetMouse = { x: 0, y: 0 };
  var scrollProgress = 0;

  window.addEventListener("mousemove", function (e) {
    targetMouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
    targetMouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  window.addEventListener("scroll", function () {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress = max > 0 ? window.scrollY / max : 0;
  }, { passive: true });

  window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  /* ---- Loop ---- */
  var clock = new THREE.Clock();
  var basePositions = positions.slice();

  function tick() {
    var t = clock.getElapsedTime();

    if (!reduceMotion) {
      var pos = geo.attributes.position.array;
      for (var i = 0; i < COUNT; i++) {
        var s = seeds[i];
        pos[i * 3] = basePositions[i * 3] + Math.sin(t * 0.12 + s) * 0.9;
        pos[i * 3 + 1] = basePositions[i * 3 + 1] + Math.cos(t * 0.09 + s * 1.7) * 0.7 + Math.sin(t * 0.05 + s) * 0.4;
        pos[i * 3 + 2] = basePositions[i * 3 + 2] + Math.sin(t * 0.07 + s * 0.6) * 0.8;
      }
      geo.attributes.position.needsUpdate = true;
    }

    // Smooth mouse
    mouse.x += (targetMouse.x - mouse.x) * 0.035;
    mouse.y += (targetMouse.y - mouse.y) * 0.035;

    camera.position.x = mouse.x * 1.4;
    camera.position.y = -mouse.y * 1.0 - scrollProgress * 3.5;
    camera.position.z = 14 - scrollProgress * 4;
    camera.lookAt(0, -scrollProgress * 3.5, 0);

    points.rotation.y = t * 0.012 + scrollProgress * 0.6;
    ico.rotation.x = t * 0.05;
    ico.rotation.y = t * 0.035;
    ico2.rotation.x = -t * 0.04;
    ico2.rotation.z = t * 0.03;

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }

  tick();
})();
