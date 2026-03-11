import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { GLB } from "../constants.js";
import { makeRenderer, loadGLB } from "../utils.js";

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
export default HeroThreeScene;