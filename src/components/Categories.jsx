import { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { GLB } from "../constants.js";
import { makeRenderer, loadGLB } from "../utils.js";


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
      /* ── LAPTOP (GRAPH): load GLB, autoFit, gentle spin ── */
      loadGLB(GLB.laptop, scene, 1.7).then(({ model, mixer }) => {
        model.rotation.y = .5;
        if (mixer) {
          animFn = (delta) => { mixer.update(delta); model.rotation.y += .012; };
        } else {
          model.traverse(c => {
            if (c.isMesh && c.material) {
              const mats = Array.isArray(c.material) ? c.material : [c.material];
              mats.forEach(m => { if (m.color) m.color.lerp(new THREE.Color(color), .1); });
            }
          });
          animFn = () => { model.rotation.y += .012; };
        }
      }).catch(() => {
        const mat = new THREE.MeshStandardMaterial({ color, metalness:.85, roughness:.15 });
        const base   = new THREE.Mesh(new THREE.BoxGeometry(1.4,.12,1.0), mat);
        const screen = new THREE.Mesh(new THREE.BoxGeometry(1.4,.9,.06),  mat);
        screen.position.set(0,.51,-.47); screen.rotation.x=-1.95;
        [base,screen].forEach(m=>scene.add(m));
        animFn=()=>{ [base,screen].forEach(m=>m.rotation.y+=.012); };
      });

    } else if (type === "geo") {
      /* ── GEO (EARTH): load earth.glb, rotating planet ── */
      loadGLB(GLB.geo, scene, 1.8).then(({ model, mixer }) => {
        if (mixer) {
          animFn = (delta) => { mixer.update(delta); model.rotation.y += .008; };
        } else {
          model.traverse(c => {
            if (c.isMesh && c.material) {
              const mats = Array.isArray(c.material) ? c.material : [c.material];
              mats.forEach(m => { if (m.color) m.color.lerp(new THREE.Color(color), .15); });
            }
          });
          animFn = () => { model.rotation.y += .008; };
        }
      }).catch(() => {
        // Fallback: colorful rotating sphere
        const mat = new THREE.MeshStandardMaterial({ color, metalness:.75, roughness:.25, emissive:color, emissiveIntensity:.08 });
        const sphere = new THREE.Mesh(new THREE.IcosahedronGeometry(.9, 4), mat);
        scene.add(sphere);
        animFn = () => { sphere.rotation.x += .005; sphere.rotation.y += .008; };
      });

    } else {
      /* ── DEFAULT: Dodecahedron with glow ── */
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

export default Categories;