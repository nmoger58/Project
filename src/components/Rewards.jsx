import { useRef, useEffect } from "react";
import * as THREE from "three";
import { makeRenderer, loadGLB } from "../utils.js";



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


export default Rewards;