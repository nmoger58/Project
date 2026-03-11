import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

/* ─── GLB paths — your public/ folder ───────────────────────────── */
const GLB = {
  laptop:  "/alienware_m18_gaming_laptop (1).glb",
  runner:  "/male_running_20_frames_loop.glb",
  chef:    "/chefs_hat_-_free_model.glb",
  trophy: "/trophy.glb"
};

/* ═══════════════════════════════════════════
   GLOBAL STYLES
═══════════════════════════════════════════ */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');

    :root {
      --indigo:  #4F6EF7;
      --violet:  #7C3AED;
      --teal:    #2DD4BF;
      --gold:    #F5A623;
      --bg:      #06070F;
      --bg2:     #0D0F1E;
      --surface: rgba(255,255,255,0.04);
      --border:  rgba(255,255,255,0.08);
      --text:    #F0F2FF;
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; overflow-x: hidden; cursor: none; }

    .cursor-dot  { width:8px; height:8px; background:var(--teal); border-radius:50%; position:fixed; pointer-events:none; z-index:9999; transform:translate(-50%,-50%); mix-blend-mode:screen; }
    .cursor-ring { width:38px; height:38px; border:1.5px solid rgba(79,110,247,.6); border-radius:50%; position:fixed; pointer-events:none; z-index:9998; transform:translate(-50%,-50%); mix-blend-mode:screen; }

    .reveal      { opacity:0; transform:translateY(40px);  transition:opacity .9s cubic-bezier(.16,1,.3,1),transform .9s cubic-bezier(.16,1,.3,1); }
    .reveal-left { opacity:0; transform:translateX(-50px); transition:opacity .9s cubic-bezier(.16,1,.3,1),transform .9s cubic-bezier(.16,1,.3,1); }
    .reveal-right{ opacity:0; transform:translateX(50px);  transition:opacity .9s cubic-bezier(.16,1,.3,1),transform .9s cubic-bezier(.16,1,.3,1); }
    .reveal.visible,.reveal-left.visible,.reveal-right.visible { opacity:1; transform:none; }

    .shimmer-text {
      background: linear-gradient(135deg,#fff 0%,var(--indigo) 40%,var(--teal) 60%,#fff 100%);
      background-size:300% 300%; -webkit-background-clip:text; -webkit-text-fill-color:transparent;
      animation:shimmer 6s ease infinite;
    }
    @keyframes shimmer { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }

    .grad-text { background:linear-gradient(135deg,var(--indigo),var(--teal)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }

    .glow-card { border:1px solid var(--border); position:relative; overflow:hidden; }
    .glow-card::before {
      content:''; position:absolute; inset:0; pointer-events:none;
      background:radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(79,110,247,.13), transparent 60%);
      opacity:0; transition:opacity .4s;
    }
    .glow-card:hover::before { opacity:1; }

    .badge { display:inline-flex; align-items:center; gap:8px; background:rgba(79,110,247,.1); border:1px solid rgba(79,110,247,.25); border-radius:100px; padding:6px 16px; font-size:12px; font-weight:500; color:#A5B4FC; letter-spacing:.05em; text-transform:uppercase; }
    .badge-dot { width:6px; height:6px; border-radius:50%; background:var(--teal); box-shadow:0 0 8px var(--teal); animation:pulse-dot 2s infinite; }
    @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.6;transform:scale(1.3)} }

    .btn-primary {
      display:inline-flex; align-items:center; gap:10px;
      background:linear-gradient(135deg,var(--indigo),var(--violet));
      color:#fff; border:none; border-radius:14px; padding:16px 32px;
      font-family:'DM Sans',sans-serif; font-size:15px; font-weight:600; cursor:pointer; letter-spacing:.02em;
      box-shadow:0 8px 32px rgba(79,110,247,.35); transition:all .3s cubic-bezier(.16,1,.3,1); position:relative; overflow:hidden;
    }
    .btn-primary::after { content:''; position:absolute; inset:0; background:linear-gradient(135deg,rgba(255,255,255,.15),transparent); opacity:0; transition:opacity .3s; }
    .btn-primary:hover { transform:translateY(-3px); box-shadow:0 16px 48px rgba(79,110,247,.5); }
    .btn-primary:hover::after { opacity:1; }

    .btn-outline {
      display:inline-flex; align-items:center; gap:10px;
      background:rgba(255,255,255,.04); color:var(--text); border:1px solid var(--border); border-radius:14px; padding:16px 32px;
      font-family:'DM Sans',sans-serif; font-size:15px; font-weight:500; cursor:pointer; backdrop-filter:blur(10px);
      transition:all .3s cubic-bezier(.16,1,.3,1);
    }
    .btn-outline:hover { border-color:rgba(79,110,247,.5); color:#A5B4FC; transform:translateY(-3px); }

    .section-label { font-family:'DM Sans',sans-serif; font-size:11px; font-weight:600; letter-spacing:.2em; text-transform:uppercase; color:var(--teal); }

    .grid-bg {
      background-image:linear-gradient(rgba(79,110,247,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(79,110,247,.03) 1px,transparent 1px);
      background-size:80px 80px;
    }
    .noise-overlay {
      position:fixed; inset:0; pointer-events:none; z-index:1000; opacity:.025;
      background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    }

    .cat-card { background:var(--surface); border:1px solid var(--border); border-radius:24px; padding:36px 32px; transition:all .4s cubic-bezier(.16,1,.3,1); cursor:pointer; position:relative; overflow:hidden; }
    .cat-card:hover { transform:translateY(-12px) scale(1.01); border-color:rgba(79,110,247,.35); box-shadow:0 32px 80px rgba(79,110,247,.15); }

    .step-card { background:var(--surface); border:1px solid var(--border); border-radius:24px; padding:28px 20px; transition:all .4s cubic-bezier(.16,1,.3,1); position:relative; overflow:hidden; }
    .step-card:hover { transform:translateY(-8px); border-color:rgba(79,110,247,.3); box-shadow:0 24px 64px rgba(79,110,247,.12); }

    .stat-number { font-family:'Bebas Neue',sans-serif; font-size:clamp(2.5rem,5vw,4rem); color:#fff; letter-spacing:.04em; }

    @keyframes float-badge { 0%,100%{transform:translateY(0px) rotate(var(--r,0deg))} 50%{transform:translateY(-12px) rotate(var(--r,0deg))} }
    @keyframes spin-ring   { from{transform:translate(-50%,-50%) rotate(0deg)} to{transform:translate(-50%,-50%) rotate(360deg)} }
    @keyframes marquee     { from{transform:translateX(0)} to{transform:translateX(-50%)} }

    ::-webkit-scrollbar { width:4px; }
    ::-webkit-scrollbar-track { background:var(--bg); }
    ::-webkit-scrollbar-thumb { background:var(--indigo); border-radius:4px; }

    @media (max-width:768px) {
      .rewards-grid { grid-template-columns:1fr !important; }
      .footer-cols  { grid-template-columns:1fr 1fr !important; }
      .hide-mobile  { display:none !important; }
    }
  `}</style>
);

/* ═══════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════ */
function useScrollReveal() {
  useEffect(() => {
    const run = () => {
      const els = document.querySelectorAll(".reveal,.reveal-left,.reveal-right");
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
      }, { threshold: 0.12 });
      els.forEach(el => obs.observe(el));
      return () => obs.disconnect();
    };
    // small delay so elements are in DOM
    const t = setTimeout(run, 100);
    return () => clearTimeout(t);
  }, []);
}

function makeRenderer(el, w, h) {
  const r = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  r.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  r.setSize(w, h);
  r.setClearColor(0x000000, 0);
  r.shadowMap.enabled = true;
  r.shadowMap.type = THREE.PCFSoftShadowMap;
  el.appendChild(r.domElement);
  return r;
}

/* Auto-fit any loaded GLB into a target bounding sphere radius */
function autoFitModel(model, targetRadius = 1.0) {
  const box = new THREE.Box3().setFromObject(model);
  const size = new THREE.Vector3();
  box.getSize(size);
  const center = new THREE.Vector3();
  box.getCenter(center);
  const maxDim = Math.max(size.x, size.y, size.z);
  const scale = (targetRadius * 2) / maxDim;
  model.scale.setScalar(scale);
  // Re-center after scale
  box.setFromObject(model);
  box.getCenter(center);
  model.position.sub(center);
  return scale;
}

/* Load a GLB, auto-fit it, return { model, mixer, animations } */
function loadGLB(path, scene, targetRadius = 1.0) {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    loader.load(
      path,
      (gltf) => {
        const model = gltf.scene;
        autoFitModel(model, targetRadius);

        // Apply a metallic-looking material tint to every mesh
        model.traverse(child => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            if (child.material) {
              // Keep original textures but boost metalness/roughness slightly
              const mats = Array.isArray(child.material) ? child.material : [child.material];
              mats.forEach(m => {
                if (m.isMeshStandardMaterial || m.isMeshPhysicalMaterial) {
                  m.envMapIntensity = 3.0;  // was 1.2 — much brighter reflections
                  // Slightly boost brightness on dark materials
                  if (m.color) {
                    const col = m.color;
                    const brightness = col.r * 0.299 + col.g * 0.587 + col.b * 0.114;
                    if (brightness < 0.15) {
                      col.r = Math.min(1, col.r + 0.08);
                      col.g = Math.min(1, col.g + 0.08);
                      col.b = Math.min(1, col.b + 0.08);
                    }
                  }
                  m.needsUpdate = true;
                }
              });
            }
          }
        });

        scene.add(model);
        let mixer = null;
        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(model);
          gltf.animations.forEach(clip => {
            const action = mixer.clipAction(clip);
            action.play();
          });
        }
        resolve({ model, mixer, animations: gltf.animations });
      },
      undefined,
      (err) => reject(err)
    );
  });
}

/* ═══════════════════════════════════════════
   CURSOR
═══════════════════════════════════════════ */
function Cursor() {
  const dot = useRef(null), ring = useRef(null);
  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0;
    const move = e => { mx = e.clientX; my = e.clientY; };
    window.addEventListener("mousemove", move);
    let raf;
    const tick = () => {
      rx += (mx - rx) * .15; ry += (my - ry) * .15;
      if (dot.current)  { dot.current.style.left  = mx + "px"; dot.current.style.top  = my + "px"; }
      if (ring.current) { ring.current.style.left = rx + "px"; ring.current.style.top = ry + "px"; }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);
  return (<><div className="cursor-dot" ref={dot} /><div className="cursor-ring" ref={ring} /></>);
}

/* ═══════════════════════════════════════════
   HERO THREE SCENE
   • Loads your Trophy GLB centre-right
   • Floating decorative shapes around it
   • Particle field + mouse parallax
═══════════════════════════════════════════ */
function HeroThreeScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const W = el.clientWidth, H = el.clientHeight;
    const renderer = makeRenderer(el, W, H);
    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(58, W / H, 0.1, 100);
    camera.position.set(0, 0.5, 8);

    // ── Lights ─────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 2.2));  // was 0.6 — much brighter fill
    const dl = new THREE.DirectionalLight(0xffffff, 4.0);  // white key light boosted
    dl.position.set(5, 8, 5); dl.castShadow = true; scene.add(dl);
    const dl2 = new THREE.DirectionalLight(0x2dd4bf, 3.5);
    dl2.position.set(-5, -3, 3); scene.add(dl2);
    const dl3 = new THREE.DirectionalLight(0xffffff, 3.0);  // extra front fill light
    dl3.position.set(0, 2, 8); scene.add(dl3);
    const pl = new THREE.PointLight(0x7c3aed, 6, 22);
    pl.position.set(0, 2, 4); scene.add(pl);
    const pl2 = new THREE.PointLight(0xf5a623, 10, 15);
    pl2.position.set(3, -2, 3); scene.add(pl2);
    const pl3 = new THREE.PointLight(0xffffff, 8, 12);  // close trophy light
    pl3.position.set(2.5, 1, 5); scene.add(pl3);

    // ── Trophy GLB ─────────────────────────
    const trophyGroup = new THREE.Group();
    trophyGroup.position.set(2.8, 0.0, 0);   // centered vertically, slightly right
    trophyGroup.rotation.y = -0.3;
    scene.add(trophyGroup);

    let trophyMixer = null;
    loadGLB(GLB.trophy, trophyGroup, 3.2).then(({ mixer }) => {   // larger fit radius
      trophyMixer = mixer;
    }).catch(() => {
      // Fallback: simple glowing box if model fails
      const fb = new THREE.Mesh(
        new THREE.BoxGeometry(1.8, 1.1, 0.1),
        new THREE.MeshStandardMaterial({ color: 0x4f6ef7, metalness: .9, roughness: .1 })
      );
      trophyGroup.add(fb);
    });

    // ── Decorative floating shapes ──────────
    const shapes = [];
    const addShape = (geo, color, pos, anim) => {
      const mat = new THREE.MeshStandardMaterial({ color, metalness: .85, roughness: .12 });
      const m = new THREE.Mesh(geo, mat);
      m.position.set(...pos); m.castShadow = true;
      scene.add(m);
      shapes.push({ m, ...anim });
    };
    addShape(new THREE.IcosahedronGeometry(0.7, 1),        0x2dd4bf, [-3.5,  1.5, -1],   { rx:.004, ry:.007, rz:0,    fAmp:.18, fSpd:.5,  fPh:1 });
    addShape(new THREE.OctahedronGeometry(0.65),           0xf5a623, [-2.8, -2.0,  0.5], { rx:.007, ry:.005, rz:.003, fAmp:.16, fSpd:.9,  fPh:2 });
    addShape(new THREE.TorusGeometry(.55, .16, 18, 48),    0x7c3aed, [ 3.8, -1.8, -0.5], { rx:.006, ry:.003, rz:.005, fAmp:.14, fSpd:1.1, fPh:3 });
    addShape(new THREE.TorusKnotGeometry(.5,.15,80,12,2,3),0x4f6ef7, [ 1.0,  2.5, -1.5], { rx:.005, ry:.008, rz:.002, fAmp:.12, fSpd:.8,  fPh:4 });

    // ── Particles ──────────────────────────
    const count = 700;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i*3]   = (Math.random() - .5) * 22;
      positions[i*3+1] = (Math.random() - .5) * 14;
      positions[i*3+2] = (Math.random() - .5) * 12 - 4;
    }
    const pg = new THREE.BufferGeometry();
    pg.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(pg, new THREE.PointsMaterial({ color: 0x4f6ef7, size: .045, transparent: true, opacity: .55 }));
    scene.add(particles);

    // ── Mouse parallax ─────────────────────
    let mouseX = 0, mouseY = 0;
    const onMouse = e => { mouseX = (e.clientX / window.innerWidth  - .5) * 2; mouseY = -(e.clientY / window.innerHeight - .5) * 2; };
    window.addEventListener("mousemove", onMouse);

    let t = 0, rafId;
    const clock = new THREE.Clock();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      t += 0.01;

      if (trophyMixer) trophyMixer.update(delta);

      trophyGroup.rotation.y = -0.3 + Math.sin(t * .4) * .08;
      trophyGroup.position.y = 0.0 + Math.sin(t * .5) * .10;

      shapes.forEach(({ m, rx=0, ry=0, rz=0, fAmp, fSpd, fPh }) => {
        m.rotation.x += rx; m.rotation.y += ry; m.rotation.z += rz;
        m.position.y  += Math.sin(t * fSpd + fPh) * fAmp * .02;
      });

      particles.rotation.y += .0007;
      camera.position.x += (mouseX * .5 - camera.position.x) * .04;
      camera.position.y += (mouseY * .25 - camera.position.y) * .04;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ position: "absolute", inset: 0, zIndex: 1 }} />;
}

/* ═══════════════════════════════════════════
   TROPHY SCENE  (procedural — always works)
═══════════════════════════════════════════ */
function buildTrophy(scene) {
  const group = new THREE.Group();
  const goldMat  = new THREE.MeshStandardMaterial({ color:0xf5a623, metalness:.95, roughness:.05 });
  const darkGold = new THREE.MeshStandardMaterial({ color:0xc8851b, metalness:.9,  roughness:.1  });
  const gemMat   = new THREE.MeshStandardMaterial({ color:0x4f6ef7, metalness:1.0, roughness:0,  emissive:0x4f6ef7, emissiveIntensity:.4 });
  const plateMat = new THREE.MeshStandardMaterial({ color:0x1a1a2e, metalness:.6,  roughness:.3  });
  const starMat  = new THREE.MeshStandardMaterial({ color:0xffffff, emissive:0xffd700, emissiveIntensity:.9 });

  const plaque = new THREE.Mesh(new THREE.BoxGeometry(1.8,.12,.9), plateMat);   plaque.position.y = -2.2;  group.add(plaque);
  const base1  = new THREE.Mesh(new THREE.CylinderGeometry(.75,.85,.3,  64), darkGold); base1.position.y = -1.95; group.add(base1);
  const base2  = new THREE.Mesh(new THREE.CylinderGeometry(.55,.75,.22, 64), darkGold); base2.position.y = -1.6;  group.add(base2);
  const stem   = new THREE.Mesh(new THREE.CylinderGeometry(.12,.18,.9,  32), goldMat);  stem.position.y  = -1.1;  group.add(stem);
  const collar = new THREE.Mesh(new THREE.CylinderGeometry(.42,.22,.22, 32), darkGold); collar.position.y = -.52; group.add(collar);

  const cupPts = [];
  for (let i = 0; i <= 24; i++) { const t = i/24; cupPts.push(new THREE.Vector2(.42 + Math.sin(t*Math.PI*.8)*.28, -.4 + t*1.55)); }
  const cup = new THREE.Mesh(new THREE.LatheGeometry(cupPts, 48), goldMat);
  cup.position.y = -.52; group.add(cup);

  const rim = new THREE.Mesh(new THREE.TorusGeometry(.7, .055, 16, 64), goldMat);
  rim.position.y = 1.08; group.add(rim);

  [-1, 1].forEach(side => {
    const hPts = []; for (let i=0;i<=16;i++) hPts.push(new THREE.Vector2(.04, i/16*.9));
    const h = new THREE.Mesh(new THREE.LatheGeometry(hPts,10), goldMat);
    h.rotation.z = side*(Math.PI/2+.2); h.position.set(side*.68,.55,0); group.add(h);
    const cap = new THREE.Mesh(new THREE.SphereGeometry(.07,12,12), darkGold);
    cap.position.set(side*1.0,.55,0); group.add(cap);
  });

  const gem = new THREE.Mesh(new THREE.OctahedronGeometry(.18), gemMat);
  gem.position.y = .55; group.add(gem);

  const starShape = new THREE.Shape();
  for (let i=0;i<10;i++) { const a=(i/10)*Math.PI*2-Math.PI/2, r=i%2===0?.22:.1; i===0?starShape.moveTo(Math.cos(a)*r,Math.sin(a)*r):starShape.lineTo(Math.cos(a)*r,Math.sin(a)*r); }
  starShape.closePath();
  const starM = new THREE.Mesh(new THREE.ExtrudeGeometry(starShape,{depth:.03,bevelEnabled:false}), starMat);
  starM.position.set(-.22,.22,.68); group.add(starM);

  for (let i=0;i<6;i++) {
    const orb = new THREE.Mesh(new THREE.OctahedronGeometry(.07), starMat);
    const a=(i/6)*Math.PI*2; orb.position.set(Math.cos(a)*1.5,.3+Math.sin(a*.5)*.5,Math.sin(a)*1.5); group.add(orb);
  }

  const ringMat = new THREE.MeshStandardMaterial({ color:0x4f6ef7, transparent:true, opacity:.25, wireframe:true });
  [{r:2.0,rx:1.1,rz:0},{r:2.6,rx:1.3,rz:.5}].forEach(({r,rx,rz}) => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(r,.02,8,80), ringMat);
    ring.rotation.x = rx; ring.rotation.z = rz;
    scene.add(ring);
    group.userData[`ring_${r}`] = ring;
  });

  group.scale.set(1.5,1.5,1.5);
  scene.add(group);
  return group;
}

function TrophyScene() {
  const mountRef = useRef(null);
  useEffect(() => {
    const el = mountRef.current; if (!el) return;
    const W = el.clientWidth, H = el.clientHeight;
    const renderer = makeRenderer(el, W, H);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, W/H, .1, 50);
    camera.position.set(0, 0, 7);

    scene.add(new THREE.AmbientLight(0xffffff, .4));
    const l1=new THREE.DirectionalLight(0x4f6ef7,3.5); l1.position.set(3,5,3); l1.castShadow=true; scene.add(l1);
    const l2=new THREE.DirectionalLight(0x2dd4bf,2); l2.position.set(-3,-2,2); scene.add(l2);
    const l3=new THREE.PointLight(0xf5a623,5,18); l3.position.set(0,3,3); scene.add(l3);
    const l4=new THREE.PointLight(0x7c3aed,3,14); l4.position.set(-3,0,2); scene.add(l4);

    const trophy = buildTrophy(scene);
    trophy.position.set(0, -.5, 0);
    const ring1 = trophy.userData["ring_2"];
    const ring2 = trophy.userData["ring_2.6"];

    let t=0, rafId;
    const animate = () => {
      rafId = requestAnimationFrame(animate); t+=.01;
      trophy.rotation.y += .007;
      trophy.position.y = -.5 + Math.sin(t*.65)*.14;
      const gem = trophy.children.find(c => c.geometry?.type==="OctahedronGeometry");
      if (gem) { gem.rotation.x+=.02; gem.rotation.y+=.03; }
      if (ring1) ring1.rotation.z += .005;
      if (ring2) ring2.rotation.y += .007;
      renderer.render(scene, camera);
    };
    animate();

    const onResize=()=>{const w=el.clientWidth,h=el.clientHeight; renderer.setSize(w,h); camera.aspect=w/h; camera.updateProjectionMatrix();};
    window.addEventListener("resize", onResize);
    return ()=>{ window.removeEventListener("resize",onResize); cancelAnimationFrame(rafId); renderer.dispose(); if(el.contains(renderer.domElement))el.removeChild(renderer.domElement); };
  }, []);
  return <div ref={mountRef} style={{ width:"100%", height:"100%" }} />;
}

/* ═══════════════════════════════════════════
   MINI SCENE  — one per category card
   Key fixes:
   • Runner: AnimationMixer ticks every frame → actual walking animation
   • Chef hat: autoFitModel + placed at y=0 centre → hat fills viewport
   • Laptop: autoFitModel keeps proportions
   • Geo: procedural dodecahedron fallback
═══════════════════════════════════════════ */
function MiniScene({ type, color }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current; if (!el) return;

    const SIZE = 110;
    const renderer = makeRenderer(el, SIZE, SIZE);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(46, 1, .1, 30);
    camera.position.set(0, 0, 3.8);  // slightly pulled back for better framing

    // Lighting — coloured to match card accent
    scene.add(new THREE.AmbientLight(0xffffff, 1.2));   // was 0.55 — brighter fill
    const dl = new THREE.DirectionalLight(color, 5.0); dl.position.set(2, 3, 2); scene.add(dl);  // was 4.5
    const pl = new THREE.PointLight(0xffffff, 3.5, 14); pl.position.set(-2, -1, 2); scene.add(pl); // was 2.5
    const rim = new THREE.PointLight(color, 2.0, 10); rim.position.set(0, -2, -2); scene.add(rim);
    const top = new THREE.PointLight(0xffffff, 2.0, 10); top.position.set(0, 3, 1); scene.add(top); // new top fill

    // animFn receives delta each frame; replaced by async loaders once models arrive
    let animFn = (_delta) => {};
    let rafId;
    const clock = new THREE.Clock();

    if (type === "runner") {
      /* ── RUNNER: load GLB + drive AnimationMixer with real delta ── */
      loadGLB(GLB.runner, scene, 1.6).then(({ model, mixer }) => {
        model.traverse(c => {
          if (c.isMesh && c.material) {
            const mats = Array.isArray(c.material) ? c.material : [c.material];
            mats.forEach(m => { if (m.color) m.color.lerp(new THREE.Color(color), .25); });
          }
        });
        if (mixer) {
          animFn = (delta) => { mixer.update(delta); model.rotation.y += .006; };
        } else {
          animFn = () => { model.rotation.y += .008; };
        }
      }).catch(() => {
        const mat = new THREE.MeshStandardMaterial({ color, metalness:.7, roughness:.3 });
        const head  = new THREE.Mesh(new THREE.SphereGeometry(.2,16,16), mat);        head.position.y = .85;
        const torso = new THREE.Mesh(new THREE.CylinderGeometry(.18,.15,.5,16), mat); torso.position.y = .4;
        const leg1  = new THREE.Mesh(new THREE.CylinderGeometry(.07,.07,.45,12), mat); leg1.position.set(-.1,-.1,0);
        const leg2  = new THREE.Mesh(new THREE.CylinderGeometry(.07,.07,.45,12), mat); leg2.position.set( .1,-.1,0);
        [head,torso,leg1,leg2].forEach(m => scene.add(m));
        let ft=0; animFn=()=>{ ft+=.08; leg1.rotation.x=Math.sin(ft)*.8; leg2.rotation.x=-Math.sin(ft)*.8; };
      });

    } else if (type === "chef") {
      /* ── CHEF HAT: load GLB, autoFit centres it perfectly ── */
      loadGLB(GLB.chef, scene, 1.8).then(({ model }) => {
        model.traverse(c => {
          if (c.isMesh && c.material) {
            const mats = Array.isArray(c.material) ? c.material : [c.material];
            mats.forEach(m => {
              if (m.color) m.color.lerp(new THREE.Color(color), .15);
              if (m.isMeshStandardMaterial) { m.metalness = Math.max(m.metalness, .3); m.roughness = Math.min(m.roughness, .6); }
            });
          }
        });
        camera.position.set(0, 0, 3.4);
        animFn = () => { model.rotation.y += .010; };
      }).catch(() => {
        const mat = new THREE.MeshStandardMaterial({ color, metalness:.4, roughness:.5 });
        const brim = new THREE.Mesh(new THREE.CylinderGeometry(.55,.55,.18,32), mat); brim.position.y=-.35;
        const body = new THREE.Mesh(new THREE.CylinderGeometry(.38,.52,.9,32),  mat); body.position.y=.2;
        const top  = new THREE.Mesh(new THREE.SphereGeometry(.38,32,16,0,Math.PI*2,0,Math.PI*.5), mat); top.position.y=.65;
        [brim,body,top].forEach(m=>scene.add(m));
        animFn = () => { [brim,body,top].forEach(m => m.rotation.y+=.012); };
      });

    } else if (type === "laptop") {
      /* ── LAPTOP: load GLB, autoFit, gentle spin ── */
      loadGLB(GLB.laptop, scene, 1.7).then(({ model }) => {
        model.rotation.y = .5;
        model.traverse(c => {
          if (c.isMesh && c.material) {
            const mats = Array.isArray(c.material) ? c.material : [c.material];
            mats.forEach(m => { if (m.color) m.color.lerp(new THREE.Color(color), .1); });
          }
        });
        animFn = () => { model.rotation.y += .012; };
      }).catch(() => {
        const mat = new THREE.MeshStandardMaterial({ color, metalness:.85, roughness:.15 });
        const base   = new THREE.Mesh(new THREE.BoxGeometry(1.4,.12,1.0), mat);
        const screen = new THREE.Mesh(new THREE.BoxGeometry(1.4,.9,.06),  mat);
        screen.position.set(0,.51,-.47); screen.rotation.x=-1.95;
        [base,screen].forEach(m=>scene.add(m));
        animFn=()=>{ [base,screen].forEach(m=>m.rotation.y+=.012); };
      });

    } else {
      /* ── CREATIVE: Dodecahedron with glow ── */
      const mat = new THREE.MeshStandardMaterial({ color, metalness:.88, roughness:.1, emissive:color, emissiveIntensity:.12 });
      const m = new THREE.Mesh(new THREE.DodecahedronGeometry(.85), mat);
      scene.add(m);
      animFn = () => { m.rotation.x += .012; m.rotation.y += .018; };
    }

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      const delta = clock.getDelta();
      animFn(delta);
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(rafId);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, [type, color]);

  return <div ref={mountRef} style={{ width: 110, height: 110, display: "flex", alignItems: "center", justifyContent: "center" }} />;
}

/* ═══════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:500, padding:"0 40px", background:scrolled?"rgba(6,7,15,.88)":"transparent", backdropFilter:scrolled?"blur(24px)":"none", borderBottom:scrolled?"1px solid rgba(79,110,247,.1)":"none", transition:"all .5s ease" }}>
      <div style={{ maxWidth:1240, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", height:72 }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ width:38, height:38, borderRadius:12, background:"linear-gradient(135deg,#4F6EF7,#7C3AED)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 0 20px rgba(79,110,247,.4)", fontSize:18 }}>⚔</div>
          <span style={{ fontFamily:"'Syne',sans-serif", fontSize:20, fontWeight:800, letterSpacing:-.5, color:"#fff" }}>Skill<span style={{ color:"#4F6EF7" }}>Arena</span></span>
        </div>
        <div className="hide-mobile" style={{ display:"flex", gap:40 }}>
          {["Contests","Categories","Leaderboard","Rewards"].map(l => (
            <a key={l} href="#" style={{ fontFamily:"'DM Sans',sans-serif", fontSize:14, color:"#9CA3AF", fontWeight:500, transition:"color .2s", textDecoration:"none" }}
              onMouseEnter={e=>e.target.style.color="#fff"} onMouseLeave={e=>e.target.style.color="#9CA3AF"}>{l}</a>
          ))}
        </div>
        <div style={{ display:"flex", gap:12 }}>
          <button className="btn-outline" style={{ padding:"9px 22px", fontSize:14 }}>Sign in</button>
          <button className="btn-primary" style={{ padding:"9px 22px", fontSize:14 }}>Join Free ↗</button>
        </div>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════
   HERO
═══════════════════════════════════════════ */
function Hero() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);
  return (
    <section style={{ position:"relative", minHeight:"100vh", display:"flex", alignItems:"center", overflow:"hidden", background:"var(--bg)" }} className="grid-bg">
      <HeroThreeScene />
      <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 25% 50%, transparent 25%, rgba(6,7,15,.78) 100%)", zIndex:2, pointerEvents:"none" }} />
      <div style={{ position:"relative", zIndex:3, maxWidth:1240, margin:"0 auto", padding:"120px 40px 80px", width:"100%" }}>
        <div style={{ maxWidth:660 }}>
          <div className="badge" style={{ marginBottom:28, opacity:visible?1:0, transform:visible?"none":"translateY(20px)", transition:"all .8s ease .1s" }}>
            <span className="badge-dot" />&nbsp;1,842 competitions live right now
          </div>
          <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(4.5rem,9vw,8.5rem)", lineHeight:.95, letterSpacing:".03em", color:"#fff", marginBottom:28, opacity:visible?1:0, transform:visible?"none":"translateY(30px)", transition:"all .9s cubic-bezier(.16,1,.3,1) .25s" }}>
            COMPETE.<br /><span className="shimmer-text">IMPROVE.</span><br />WIN BIG.
          </h1>
          <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"1.15rem", lineHeight:1.75, color:"#9CA3AF", maxWidth:500, marginBottom:48, opacity:visible?1:0, transform:visible?"none":"translateY(20px)", transition:"all .9s cubic-bezier(.16,1,.3,1) .4s" }}>
            Enter skill-based competitions in fitness, coding, cooking &amp; creativity. Prove yourself. Earn rewards. Rise through the ranks.
          </p>
          <div style={{ display:"flex", gap:16, flexWrap:"wrap", opacity:visible?1:0, transform:visible?"none":"translateY(20px)", transition:"all .9s cubic-bezier(.16,1,.3,1) .55s" }}>
            <button className="btn-primary" style={{ fontSize:16 }}>Join a Contest <span style={{ fontSize:18 }}>→</span></button>
            <button className="btn-outline" style={{ fontSize:16 }}>Watch a Live Match</button>
          </div>
          <div style={{ display:"flex", gap:40, marginTop:64, flexWrap:"wrap", opacity:visible?1:0, transition:"all .9s ease .7s" }}>
            {[["240K+","Competitors"],["$4.2M","Paid Out"],["98%","Return Rate"]].map(([v,l]) => (
              <div key={l}>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"2.2rem", color:"#fff", letterSpacing:".05em", lineHeight:1 }}>{v}</div>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:"#6B7280", letterSpacing:".1em", textTransform:"uppercase", marginTop:4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:200, background:"linear-gradient(to bottom,transparent,var(--bg))", zIndex:4, pointerEvents:"none" }} />
    </section>
  );
}

/* ═══════════════════════════════════════════
   STATS MARQUEE
═══════════════════════════════════════════ */
function StatsMarquee() {
  const items = ["240K+ Competitors","$4.2M Prizes Paid","1,800+ Live Contests","98% Satisfaction","50+ Countries","Real-Time Results"];
  return (
    <div style={{ borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)", background:"var(--bg2)", overflow:"hidden", padding:"18px 0" }}>
      <div style={{ display:"flex", gap:64, animation:"marquee 22s linear infinite", width:"max-content" }}>
        {[...items,...items].map((item,i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:12, fontFamily:"'Syne',sans-serif", fontSize:14, fontWeight:700, color:"#374151", whiteSpace:"nowrap", letterSpacing:".05em" }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:"#4F6EF7", display:"inline-block" }} />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   HOW IT WORKS
═══════════════════════════════════════════ */
function HowItWorks() {
  const steps = [
    { num:"01", icon:"🎯", title:"Pick Your Contest", desc:"Browse 1,800+ live competitions across fitness, coding, cooking, and creative arts. Filter by skill level, prize, or start time.", color:"#4F6EF7" },
    { num:"02", icon:"⚡", title:"Show Your Skill",   desc:"Submit your entry — a performance video, code repo, dish photo, or design file. Let your work speak for itself.", color:"#2DD4BF" },
    { num:"03", icon:"🏆", title:"Earn Your Win",     desc:"Judges and the community rank submissions. Cash prizes, digital trophies, and rank points are awarded instantly.", color:"#F5A623" },
  ];
  return (
    <section style={{ padding:"140px 40px", background:"var(--bg)" }}>
      <div style={{ maxWidth:1240, margin:"0 auto" }}>
        <div className="reveal" style={{ textAlign:"center", marginBottom:80 }}>
          <span className="section-label">How It Works</span>
          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(3rem,5vw,5.5rem)", color:"#fff", letterSpacing:".04em", marginTop:14, lineHeight:1 }}>
            THREE STEPS TO <span className="grad-text">VICTORY</span>
          </h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:24 }}>
          {steps.map((s,i) => (
            <div key={s.num} className="step-card reveal" style={{ transitionDelay:`${i*.15}s` }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:32 }}>
                <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"6rem", lineHeight:1, color:"rgba(255,255,255,.04)", userSelect:"none" }}>{s.num}</span>
                <div style={{ width:56, height:56, borderRadius:16, background:s.color+"18", border:`1px solid ${s.color}33`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.8rem" }}>{s.icon}</div>
              </div>
              <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:"1.4rem", fontWeight:800, color:"#fff", marginBottom:14 }}>{s.title}</h3>
              <p  style={{ fontFamily:"'DM Sans',sans-serif", fontSize:".95rem", color:"#6B7280", lineHeight:1.8 }}>{s.desc}</p>
              <div style={{ marginTop:28, height:2, background:`linear-gradient(90deg,${s.color},transparent)`, borderRadius:2 }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   CATEGORIES
═══════════════════════════════════════════ */
function Categories() {
  const cats = [
    { type:"runner", title:"Fitness Challenges", desc:"Endurance, strength, agility. Track every rep, every mile.",    color:0x2DD4BF, hex:"#2DD4BF", count:"312 live" },
    { type:"chef",   title:"Cooking Battles",    desc:"Speed cooking, plating mastery, mystery ingredient rounds.",    color:0xF5A623, hex:"#F5A623", count:"87 live"  },
    { type:"laptop", title:"Coding Arenas",      desc:"Algorithms, hackathons, system design sprints.",               color:0x4F6EF7, hex:"#4F6EF7", count:"445 live" },
    { type:"geo",    title:"Creative Talent",    desc:"Design, illustration, writing, music composition.",             color:0x7C3AED, hex:"#7C3AED", count:"196 live" },
  ];
  return (
    <section style={{ padding:"140px 40px", background:"var(--bg2)", position:"relative" }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle at 50% 0%,rgba(79,110,247,.06) 0%,transparent 60%)", pointerEvents:"none" }} />
      <div style={{ maxWidth:1240, margin:"0 auto" }}>
        <div className="reveal" style={{ textAlign:"center", marginBottom:80 }}>
          <span className="section-label">Categories</span>
          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(3rem,5vw,5.5rem)", color:"#fff", letterSpacing:".04em", marginTop:14, lineHeight:1 }}>
            EVERY SKILL HAS <span className="grad-text">A STAGE</span>
          </h2>
          <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"1.05rem", color:"#6B7280", maxWidth:480, margin:"16px auto 0", lineHeight:1.75 }}>
            Whether you code at dawn or cook at midnight — there's a live contest waiting for you.
          </p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:20 }}>
          {cats.map((cat,i) => (
            <div key={cat.title} className="cat-card glow-card reveal" style={{ transitionDelay:`${i*.12}s` }}
              onMouseMove={e => { const r=e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--mx",((e.clientX-r.left)/r.width*100)+"%"); e.currentTarget.style.setProperty("--my",((e.clientY-r.top)/r.height*100)+"%"); }}>
              <div style={{ width:110, height:110, marginBottom:16, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <MiniScene type={cat.type} color={cat.color} />
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
                <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:"1.15rem", fontWeight:800, color:"#fff" }}>{cat.title}</h3>
                <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, color:cat.hex, background:cat.hex+"18", border:`1px solid ${cat.hex}33`, borderRadius:100, padding:"3px 10px", whiteSpace:"nowrap", flexShrink:0 }}>{cat.count}</span>
              </div>
              <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:".9rem", color:"#6B7280", lineHeight:1.75, marginBottom:20 }}>{cat.desc}</p>
              <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:600, color:cat.hex }}>Explore →</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   REWARDS
═══════════════════════════════════════════ */
function Rewards() {
  const rewards = [
    { icon:"💰", label:"Cash Prizes",      desc:"Up to $10,000 per contest. Real money transferred directly." },
    { icon:"🥇", label:"Digital Trophies", desc:"NFT-grade achievements that live on your permanent profile." },
    { icon:"📊", label:"Global Ranks",     desc:"A live global leaderboard updated in real-time after each submission." },
    { icon:"🌍", label:"Recognition",      desc:"Verified badges, community fame, and recruiter spotlight features." },
  ];
  return (
    <section style={{ padding:"140px 40px", background:"var(--bg)", overflow:"hidden", position:"relative" }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle at 80% 50%,rgba(245,166,35,.06) 0%,transparent 50%),radial-gradient(circle at 20% 50%,rgba(79,110,247,.07) 0%,transparent 50%)", pointerEvents:"none" }} />
      <div style={{ maxWidth:1240, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"center" }} className="rewards-grid">
          <div className="reveal-left">
            <span className="section-label">Rewards</span>
            <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(3rem,5vw,5rem)", color:"#fff", letterSpacing:".04em", marginTop:14, lineHeight:1, marginBottom:20 }}>
              WIN MORE THAN<br /><span className="grad-text">A CONTEST</span>
            </h2>
            <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"1.05rem", color:"#6B7280", lineHeight:1.8, marginBottom:44 }}>
              Every competition is a chance to grow your reputation, your portfolio, and your bank account.
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:22 }}>
              {rewards.map(r => (
                <div key={r.label} style={{ display:"flex", gap:18, alignItems:"flex-start" }}>
                  <div style={{ width:48, height:48, borderRadius:14, background:"rgba(79,110,247,.1)", border:"1px solid rgba(79,110,247,.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.4rem", flexShrink:0 }}>{r.icon}</div>
                  <div>
                    <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1rem", color:"#fff", marginBottom:4 }}>{r.label}</div>
                    <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:".9rem", color:"#6B7280", lineHeight:1.7 }}>{r.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal-right">
            <div style={{ height:500, borderRadius:28, overflow:"hidden", background:"linear-gradient(135deg,rgba(79,110,247,.08),rgba(124,58,237,.06))", border:"1px solid rgba(79,110,247,.15)", position:"relative" }}>
              <TrophyScene />
              {[
                { top:"8%",    left:"4%",   bg:"#2DD4BF", text:"🥇 1st Place",   rot:"-4deg", delay:"0s"   },
                { bottom:"12%",left:"2%",   bg:"#F5A623", text:"⚡ Top 1%",      rot:"3deg",  delay:".8s"  },
                { top:"15%",   right:"3%",  bg:"#7C3AED", text:"🔥 7-Day Streak",rot:"2deg",  delay:".4s"  },
                { bottom:"8%", right:"4%",  bg:"#4F6EF7", text:"⭐ Rising Star",  rot:"-3deg", delay:"1.2s" },
              ].map(b => (
                <div key={b.text} style={{ position:"absolute", top:b.top, bottom:b.bottom, left:b.left, right:b.right, background:b.bg, borderRadius:12, padding:"8px 14px", fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:700, color:"white", boxShadow:`0 8px 24px ${b.bg}66`, "--r":b.rot, animation:`float-badge 4s ease-in-out ${b.delay} infinite`, transform:`rotate(${b.rot})`, zIndex:5 }}>{b.text}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   COMMUNITY
═══════════════════════════════════════════ */
function Community() {
  const feats = [
    { icon:"📈", title:"Track Your Progress", desc:"Deep analytics on every submission — see your improvement curve across weeks and months." },
    { icon:"🤝", title:"Smart Matchmaking",   desc:"AI pairs you against competitors at your exact level — no sandbagging, no impossible odds." },
    { icon:"💬", title:"Expert Feedback",     desc:"Receive scored critiques from judges and community mentors after each round." },
    { icon:"🔔", title:"Challenge Streaks",   desc:"Daily goals, streak bonuses, and weekly challenges keep the momentum burning." },
  ];
  return (
    <section style={{ padding:"140px 40px", background:"var(--bg2)" }}>
      <div style={{ maxWidth:1240, margin:"0 auto" }}>
        <div className="reveal" style={{ textAlign:"center", marginBottom:80 }}>
          <span className="section-label">Community &amp; Growth</span>
          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(3rem,5vw,5.5rem)", color:"#fff", letterSpacing:".04em", marginTop:14, lineHeight:1 }}>
            GROW WITH <span className="grad-text">THE BEST</span>
          </h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:2, marginBottom:60, background:"var(--border)", borderRadius:24, overflow:"hidden" }}>
          {[["240K+","Active Competitors"],["1,800+","Live Contests"],["$4.2M","Prizes Awarded"],["98%","Satisfaction Rate"]].map(([v,l]) => (
            <div key={l} className="reveal" style={{ background:"var(--bg2)", padding:"40px 32px", textAlign:"center" }}>
              <div className="stat-number">{v}</div>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:"#4B5563", letterSpacing:".12em", textTransform:"uppercase", marginTop:8 }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:20 }}>
          {feats.map((f,i) => (
            <div key={f.title} className="glow-card reveal" style={{ background:"var(--surface)", borderRadius:20, padding:"32px 28px", transitionDelay:`${i*.1}s` }}
              onMouseMove={e => { const r=e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--mx",((e.clientX-r.left)/r.width*100)+"%"); e.currentTarget.style.setProperty("--my",((e.clientY-r.top)/r.height*100)+"%"); }}>
              <div style={{ width:48, height:48, borderRadius:14, background:"rgba(79,110,247,.1)", border:"1px solid rgba(79,110,247,.15)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.4rem", marginBottom:20 }}>{f.icon}</div>
              <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:"1.05rem", fontWeight:800, color:"#fff", marginBottom:10 }}>{f.title}</h3>
              <p  style={{ fontFamily:"'DM Sans',sans-serif", fontSize:".9rem", color:"#6B7280", lineHeight:1.8 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FINAL CTA
═══════════════════════════════════════════ */
function FinalCTA() {
  return (
    <section style={{ padding:"140px 40px", background:"var(--bg)", overflow:"hidden", position:"relative" }}>
      <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:700, height:700, pointerEvents:"none" }}>
        {[1,1.4,1.9].map((scale,i) => (
          <div key={i} style={{ position:"absolute", top:"50%", left:"50%", transform:`translate(-50%,-50%) scale(${scale})`, width:"100%", height:"100%", borderRadius:"50%", border:`1px solid rgba(79,110,247,${.12-i*.03})`, animation:`spin-ring ${20+i*8}s linear infinite` }} />
        ))}
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(circle,rgba(79,110,247,.12) 0%,transparent 70%)", borderRadius:"50%" }} />
      </div>
      <div style={{ maxWidth:780, margin:"0 auto", textAlign:"center", position:"relative", zIndex:2 }}>
        <div className="reveal">
          <div style={{ fontSize:"4rem", marginBottom:24, filter:"drop-shadow(0 0 30px rgba(245,166,35,.6))" }}>🏆</div>
          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(3.5rem,7vw,7rem)", color:"#fff", letterSpacing:".04em", lineHeight:.95, marginBottom:24 }}>
            READY TO PROVE<br /><span className="shimmer-text">YOUR SKILLS?</span>
          </h2>
          <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"1.1rem", color:"#6B7280", lineHeight:1.75, marginBottom:48 }}>
            240,000 competitors are already inside. The next contest starts in minutes. Your first entry is always free — no excuses left.
          </p>
          <div style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap" }}>
            <button className="btn-primary" style={{ fontSize:16, padding:"18px 40px" }}>Join Your First Contest →</button>
            <button className="btn-outline" style={{ fontSize:16, padding:"18px 40px" }}>Browse All Competitions</button>
          </div>
          <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:"#374151", marginTop:24 }}>No credit card · Free to compete · Cancel anytime</p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{ background:"#030408", borderTop:"1px solid var(--border)", padding:"72px 40px 36px" }}>
      <div style={{ maxWidth:1240, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"2.5fr 1fr 1fr 1fr", gap:48, marginBottom:64 }} className="footer-cols">
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:18 }}>
              <div style={{ width:36, height:36, borderRadius:10, background:"linear-gradient(135deg,#4F6EF7,#7C3AED)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:17 }}>⚔</div>
              <span style={{ fontFamily:"'Syne',sans-serif", fontSize:19, fontWeight:800, color:"#fff" }}>Skill<span style={{ color:"#4F6EF7" }}>Arena</span></span>
            </div>
            <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:".88rem", color:"#374151", lineHeight:1.8, maxWidth:280, marginBottom:28 }}>The world's most trusted skill-based competition platform. Built for competitors, by competitors.</p>
            <div style={{ display:"flex", gap:12 }}>
              {["𝕏","📸","in","🎮"].map((ic,i) => (
                <div key={i} style={{ width:38, height:38, borderRadius:10, border:"1px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, color:"#374151", cursor:"pointer", transition:"all .2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor="#4F6EF7"; e.currentTarget.style.color="#4F6EF7"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.color="#374151"; }}>{ic}</div>
              ))}
            </div>
          </div>
          {[["Platform",["Contests","Leaderboards","Categories","Live Matches"]],["Company",["About","Blog","Careers","Press"]],["Legal",["Privacy","Terms","Cookies","Contact"]]].map(([title,links]) => (
            <div key={title}>
              <h4 style={{ fontFamily:"'Syne',sans-serif", fontSize:12, fontWeight:800, color:"#374151", letterSpacing:".15em", textTransform:"uppercase", marginBottom:20 }}>{title}</h4>
              {links.map(l => (
                <a key={l} href="#" style={{ display:"block", fontFamily:"'DM Sans',sans-serif", fontSize:".88rem", color:"#4B5563", marginBottom:12, textDecoration:"none", transition:"color .2s" }}
                  onMouseEnter={e=>e.target.style.color="#9CA3AF"} onMouseLeave={e=>e.target.style.color="#4B5563"}>{l}</a>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop:"1px solid var(--border)", paddingTop:28, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
          <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:"#1F2937" }}>© 2026 SkillArena Inc. All rights reserved.</span>
          <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:"#1F2937" }}>Made for those who never stop improving.</span>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   APP ROOT
═══════════════════════════════════════════ */
export default function App() {
  useScrollReveal();
  return (
    <div style={{ background:"var(--bg)", minHeight:"100vh" }}>
      <GlobalStyles />
      <div className="noise-overlay" />
      <Cursor />
      <Navbar />
      <Hero />
      <StatsMarquee />
      <HowItWorks />
      <Categories />
      <Rewards />
      <Community />
      <FinalCTA />
      <Footer />
    </div>
  );
}