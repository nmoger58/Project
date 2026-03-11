import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

/**
 * SkillArena Three.js Utilities
 * Professional Luxury Edition
 *
 * Color Palette:
 *   Deep Navy    #0F1923  — primary background
 *   Warm Ivory   #F5F0E8  — primary text / highlight
 *   Antique Gold #C9A84C  — primary accent
 *   Burnished Gold #E8C97A — secondary accent / glow
 *   Slate Blue   #2A3F5F  — surface / card
 *   Warm Gray    #8A8070  — muted text
 *   Champagne    #EDD9A3  — shimmer highlight
 */

/* ─────────────────────────────────────────
   RENDERER
   Accurate colour pipeline for professional
   material reproduction.
───────────────────────────────────────── */
export function makeRenderer(el, w, h) {
  const r = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  r.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  r.setSize(w, h);
  r.setClearColor(0x000000, 0);
  r.shadowMap.enabled = true;
  r.shadowMap.type = THREE.PCFSoftShadowMap;

  // Professional colour pipeline
  r.outputColorSpace    = THREE.SRGBColorSpace;
  r.toneMapping         = THREE.ACESFilmicToneMapping;
  r.toneMappingExposure = 1.4;   // warm, not blown-out

  el.appendChild(r.domElement);
  return r;
}

/* ─────────────────────────────────────────
   AUTO-FIT MODEL
   Centers & scales any GLB to a consistent
   bounding-sphere radius.
───────────────────────────────────────── */
export function autoFitModel(model, targetRadius = 1.0) {
  const box    = new THREE.Box3().setFromObject(model);
  const size   = new THREE.Vector3();
  const center = new THREE.Vector3();

  box.getSize(size);
  box.getCenter(center);

  const maxDim = Math.max(size.x, size.y, size.z);
  const scale  = (targetRadius * 2) / maxDim;
  model.scale.setScalar(scale);

  // Re-center post-scale
  box.setFromObject(model);
  box.getCenter(center);
  model.position.sub(center);

  return scale;
}

/* ─────────────────────────────────────────
   PROFESSIONAL MATERIAL PASS
   Applies a warm-gold tone to every mesh
   so GLBs integrate with the luxury palette.
───────────────────────────────────────── */
export function applyProfessionalMaterials(model) {
  // Warm gold accent — used as emissive tint on dark surfaces
  const GOLD_TINT  = new THREE.Color(0xC9A84C);
  // Ivory highlight — lifted on very dark meshes
  const IVORY_LIFT = new THREE.Color(0xF5F0E8);

  model.traverse(child => {
    if (!child.isMesh) return;

    child.castShadow    = true;
    child.receiveShadow = true;

    const mats = Array.isArray(child.material)
      ? child.material
      : [child.material];

    mats.forEach(m => {
      if (!m.isMeshStandardMaterial && !m.isMeshPhysicalMaterial) return;

      // Stronger IBL reflection — makes metals read properly
      m.envMapIntensity = 4.5;

      if (m.color) {
        const col        = m.color;
        const brightness = col.r * 0.299 + col.g * 0.587 + col.b * 0.114;

        // Lift near-black surfaces to deep navy/slate so nothing vanishes
        if (brightness < 0.12) {
          col.lerp(new THREE.Color(0x1C2D42), 0.55);
        }

        // Nudge warm tones slightly toward antique gold
        if (col.r > col.b && col.g > col.b && brightness > 0.3) {
          col.lerp(GOLD_TINT, 0.12);
        }
      }

      // Give every dark surface a faint gold self-glow
      if (m.emissive) {
        const eBrightness =
          m.emissive.r * 0.299 + m.emissive.g * 0.587 + m.emissive.b * 0.114;
        if (eBrightness < 0.02) {
          m.emissive.copy(GOLD_TINT).multiplyScalar(0.06);
        }
      }

      // Ensure physically plausible roughness on metallic parts
      if (m.metalness > 0.6 && m.roughness > 0.5) {
        m.roughness = Math.min(m.roughness, 0.45);
      }

      m.needsUpdate = true;
    });
  });
}

/* ─────────────────────────────────────────
   LOAD GLB
   Loads, fits, and material-passes a model.
   Returns { model, mixer, animations }.
───────────────────────────────────────── */
 export function loadGLB(path, scene, targetRadius = 1.0) {
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

/* ─────────────────────────────────────────
   PROFESSIONAL LIGHTING RIG
   Warm three-point setup tuned for the
   antique-gold / deep-navy palette.
   Returns an object of named lights so
   callers can animate specific ones.
───────────────────────────────────────── */
export function addProfessionalLights(scene) {
  // Soft warm ambient — ivory fill, never pure white
  const ambient = new THREE.AmbientLight(0xF5E8D0, 1.6);
  scene.add(ambient);

  // Key light — warm daylight from upper-right
  const key = new THREE.DirectionalLight(0xFFF3DC, 3.8);
  key.position.set(5, 8, 5);
  key.castShadow               = true;
  key.shadow.mapSize.width     = 2048;
  key.shadow.mapSize.height    = 2048;
  key.shadow.camera.near       = 0.5;
  key.shadow.camera.far        = 50;
  key.shadow.bias              = -0.001;
  scene.add(key);

  // Fill light — cool slate from the left to separate darks
  const fill = new THREE.DirectionalLight(0xC8D8F0, 1.6);
  fill.position.set(-5, -2, 3);
  scene.add(fill);

  // Rim light — antique gold from behind to kiss edges
  const rim = new THREE.DirectionalLight(0xE8C97A, 2.4);
  rim.position.set(0, -4, -5);
  scene.add(rim);

  // Front point — warm ivory, close to camera, lifts faces
  const front = new THREE.PointLight(0xFFF8EC, 3.0, 20);
  front.position.set(1, 2, 7);
  scene.add(front);

  // Accent point — antique gold glow beneath model
  const accent = new THREE.PointLight(0xC9A84C, 4.5, 16);
  accent.position.set(0, -3, 2);
  scene.add(accent);

  return { ambient, key, fill, rim, front, accent };
}

/* ─────────────────────────────────────────
   MINI-SCENE LIGHTING
   Lighter rig for small 110 × 110 previews.
───────────────────────────────────────── */
export function addMiniLights(scene, accentColor = 0xC9A84C) {
  scene.add(new THREE.AmbientLight(0xF5E8D0, 1.8));

  const dl  = new THREE.DirectionalLight(0xFFF3DC, 4.5);
  dl.position.set(2, 3, 2);
  scene.add(dl);

  const pl  = new THREE.PointLight(0xFFF8EC, 3.0, 14);
  pl.position.set(-2, -1, 2);
  scene.add(pl);

  const rim = new THREE.PointLight(accentColor, 2.5, 10);
  rim.position.set(0, -2, -2);
  scene.add(rim);

  const top = new THREE.PointLight(0xFFF3DC, 2.2, 10);
  top.position.set(0, 3, 1);
  scene.add(top);
}


