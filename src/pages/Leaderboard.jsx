import data from "../../data/data.json";
import { useEffect, useRef } from "react";

// 3D Model Viewer Component
function ModelViewer({ modelPath, size = 64 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let renderer, animationFrameId, mixer;

    const init = async () => {
      const THREE = await import("three");
      const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(size, size);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      renderer.setClearColor(0x000000, 0);
      containerRef.current.appendChild(renderer.domElement);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);
      const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
      dirLight.position.set(5, 10, 5);
      dirLight.castShadow = true;
      scene.add(dirLight);
      const fillLight = new THREE.DirectionalLight(0x8899ff, 0.4);
      fillLight.position.set(-5, 2, -5);
      scene.add(fillLight);

      const loader = new GLTFLoader();
      try {
        const gltf = await loader.loadAsync(modelPath);
        const model = gltf.scene;

        // ✅ Step 1: Add model to scene FIRST so transforms are applied
        scene.add(model);

        // ✅ Step 2: Compute bounding box AFTER adding to scene
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const modelSize = box.getSize(new THREE.Vector3());

        // ✅ Step 3: Normalize scale so longest axis = 2 units
        const maxDim = Math.max(modelSize.x, modelSize.y, modelSize.z);
        const scale = 2.0 / maxDim;
        model.scale.setScalar(scale);

        // ✅ Step 4: Re-center AFTER scaling
        const scaledBox = new THREE.Box3().setFromObject(model);
        const scaledCenter = scaledBox.getCenter(new THREE.Vector3());
        model.position.sub(scaledCenter);

        // ✅ Step 5: Position camera based on actual scaled size
        const scaledSize = scaledBox.getSize(new THREE.Vector3());
        const maxScaledDim = Math.max(scaledSize.x, scaledSize.y, scaledSize.z);
        const fov = camera.fov * (Math.PI / 180);
        let cameraZ = Math.abs(maxScaledDim / 2 / Math.tan(fov / 2));
        cameraZ *= 1.5; // add some breathing room
        camera.position.set(0, scaledSize.y * 0.1, cameraZ);
        camera.lookAt(0, 0, 0);

        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(model);
          gltf.animations.forEach((clip) => mixer.clipAction(clip).play());
        }

      } catch (err) {
        console.error("Error loading 3D model:", err);
      }

      const clock = new THREE.Clock();
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        if (mixer) mixer.update(clock.getDelta());
        renderer.render(scene, camera);
      };
      animate();
    };

    init();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (mixer) mixer.stopAllAction();
      if (containerRef.current && renderer?.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer?.dispose();
    };
  }, [modelPath, size]);

  return <div ref={containerRef} style={{ width: size, height: size }} />;
}

// Static leaderboard data
const generateLeaderboardData = (tournamentId) => {
  const { names, scores, countries } = data.leaderboard;

  return names.map((name, index) => ({
    rank: index + 1,
    name,
    username: name.toLowerCase().replace(" ", "."),
    score: scores[index],
    submissions: Math.floor(Math.random() * 15) + 5,
    accuracy: Math.floor(Math.random() * 25) + 75,
    streak: Math.floor(Math.random() * 12) + 1,
    country: countries[Math.floor(Math.random() * countries.length)],
  }));
};

// Animated 3D Fire Component
function FireIcon({ size = 20 }) {
  return (
    <>
      <style>{`
        @keyframes flicker1 {
          0%,100% { transform: scaleY(1) scaleX(1) translateY(0); opacity: 1; }
          25%      { transform: scaleY(1.12) scaleX(0.92) translateY(-1px); opacity: .95; }
          50%      { transform: scaleY(0.95) scaleX(1.06) translateY(1px); opacity: 1; }
          75%      { transform: scaleY(1.08) scaleX(0.96) translateY(-1px); opacity: .9; }
        }
        @keyframes flicker2 {
          0%,100% { transform: scaleY(1) scaleX(1) translateY(0) rotate(-2deg); opacity: .85; }
          33%      { transform: scaleY(1.15) scaleX(0.88) translateY(-2px) rotate(2deg); opacity: .7; }
          66%      { transform: scaleY(0.9) scaleX(1.1) translateY(1px) rotate(-1deg); opacity: .9; }
        }
        @keyframes flicker3 {
          0%,100% { transform: scaleY(1) translateY(0) rotate(1deg); opacity: .6; }
          50%      { transform: scaleY(1.2) translateY(-3px) rotate(-2deg); opacity: .4; }
        }
        @keyframes glowPulse {
          0%,100% { opacity: .55; transform: scaleX(1); }
          50%      { opacity: .85; transform: scaleX(1.15); }
        }
        .fire-wrap {
          position: relative;
          display: inline-flex;
          align-items: flex-end;
          justify-content: center;
        }
        .fire-layer {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform-origin: bottom center;
          border-radius: 50% 50% 20% 20%;
        }
        .fire-outer {
          animation: flicker1 .6s ease-in-out infinite;
          background: radial-gradient(ellipse at 50% 80%, #FF4500 0%, #FF6B00 40%, #FFA500 70%, transparent 100%);
          filter: blur(.3px);
        }
        .fire-mid {
          animation: flicker2 .5s ease-in-out infinite .1s;
          background: radial-gradient(ellipse at 50% 85%, #FF6B00 0%, #FFC300 50%, #FFE566 80%, transparent 100%);
          filter: blur(.2px);
        }
        .fire-inner {
          animation: flicker3 .4s ease-in-out infinite .05s;
          background: radial-gradient(ellipse at 50% 90%, #FFF176 0%, #FFE566 50%, #FFCA28 80%, transparent 100%);
          filter: blur(.1px);
        }
        .fire-glow {
          position: absolute;
          bottom: -2px;
          left: 50%;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(255,107,0,.7) 0%, rgba(255,69,0,.3) 50%, transparent 70%);
          animation: glowPulse .6s ease-in-out infinite;
          filter: blur(2px);
        }
        /* 3D depth sheen */
        .fire-sheen {
          position: absolute;
          border-radius: 50% 50% 20% 20%;
          background: linear-gradient(180deg, rgba(255,255,255,.25) 0%, transparent 60%);
          pointer-events: none;
        }
      `}</style>
      <div
        className="fire-wrap"
        style={{ width: size, height: size * 1.3 }}
      >
        {/* Glow base */}
        <div
          className="fire-glow"
          style={{
            width: size * 1.4,
            height: size * 0.5,
            marginLeft: `-${size * 0.7}px`,
          }}
        />
        {/* Outer flame — deep orange/red */}
        <div
          className="fire-layer fire-outer"
          style={{
            width: size * 0.85,
            height: size * 1.15,
            marginLeft: `-${size * 0.425}px`,
          }}
        />
        {/* Mid flame — orange/yellow */}
        <div
          className="fire-layer fire-mid"
          style={{
            width: size * 0.62,
            height: size * 0.9,
            marginLeft: `-${size * 0.31}px`,
          }}
        />
        {/* Inner core — bright yellow/white */}
        <div
          className="fire-layer fire-inner"
          style={{
            width: size * 0.38,
            height: size * 0.6,
            marginLeft: `-${size * 0.19}px`,
          }}
        />
        {/* 3D sheen highlight */}
        <div
          className="fire-sheen"
          style={{
            width: size * 0.22,
            height: size * 0.5,
            bottom: size * 0.1,
            left: `calc(50% - ${size * 0.18}px)`,
          }}
        />
      </div>
    </>
  );
}

export default function Leaderboard({ tournament, onBack }) {
  const leaderboardData = generateLeaderboardData(tournament.id);

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg)",
      padding: "40px 20px",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 40 }}>
          <button
            onClick={onBack}
            style={{
              background: "transparent",
              border: "1px solid var(--border)",
              color: "#9CA3AF",
              borderRadius: 12,
              padding: "10px 16px",
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 14,
              cursor: "pointer",
              marginBottom: 28,
              transition: "all .2s",
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = "rgba(79,110,247,.5)";
              e.target.style.color = "#A5B4FC";
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = "var(--border)";
              e.target.style.color = "#9CA3AF";
            }}
          >
            ← Back to Tournaments
          </button>

          <div style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 24,
            padding: 32,
            marginBottom: 40,
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 20,
            }}>
              
                <ModelViewer modelPath="/mei (1).glb" size={150} />
              <div>
                <h1 style={{
                  fontFamily: "'Syne',sans-serif",
                  fontSize: "2rem",
                  fontWeight: 800,
                  color: "#fff",
                  marginBottom: 8,
                }}>
                  {tournament.title}
                </h1>
                <p style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 14,
                  color: "#6B7280",
                }}>
                  {tournament.description}
                </p>
              </div>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
              gap: 16,
            }}>
              {[
                { label: "Total Participants", value: tournament.participants?.toLocaleString() },
                { label: "Prize Pool", value: tournament.prizePool },
                { label: "Status", value: tournament.status },
              ].map(({ label, value }) => (
                <div key={label}>
                  <span style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#374151",
                    textTransform: "uppercase",
                    letterSpacing: ".1em",
                  }}>
                    {label}
                  </span>
                  <div style={{
                    fontFamily: "'Bebas Neue',sans-serif",
                    fontSize: "1.8rem",
                    color: tournament.color,
                    marginTop: 8,
                  }}>
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 24,
          overflow: "hidden",
        }}>
          {/* Header */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "60px 1fr 120px 100px 120px 100px",
            gap: 16,
            padding: "20px 24px",
            background: "var(--bg2)",
            borderBottom: "1px solid var(--border)",
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 11,
            fontWeight: 700,
            color: "#374151",
            textTransform: "uppercase",
            letterSpacing: ".1em",
          }}>
            <div>Rank</div>
            <div>Player</div>
            <div>Score</div>
            <div>Accuracy</div>
            <div>Streak</div>
            <div>Country</div>
          </div>

          {leaderboardData.map((user, index) => (
            <div
              key={user.rank}
              style={{
                display: "grid",
                gridTemplateColumns: "60px 1fr 120px 100px 120px 100px",
                gap: 16,
                padding: "16px 24px",
                borderBottom: index < leaderboardData.length - 1 ? "1px solid var(--border)" : "none",
                alignItems: "center",
                transition: "all .2s",
                background: user.rank <= 3 ? `${tournament.color}08` : "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = user.rank <= 3 ? `${tournament.color}15` : "rgba(79,110,247,.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = user.rank <= 3 ? `${tournament.color}08` : "transparent";
              }}
            >
              {/* Rank */}
              <div style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: "1.2rem",
                color: user.rank === 1 ? "#FFD700" : user.rank === 2 ? "#C0C0C0" : user.rank === 3 ? "#CD7F32" : tournament.color,
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 40,
                height: 40,
                borderRadius: 8,
                background: user.rank <= 3
                  ? (user.rank === 1 ? "rgba(255,215,0,.1)" : user.rank === 2 ? "rgba(192,192,192,.1)" : "rgba(205,127,50,.1)")
                  : "transparent",
              }}>
                {user.rank === 1 ? "1ST" : user.rank === 2 ? "2ND" : user.rank === 3 ? "3RD" : `#${user.rank}`}
              </div>

              {/* Player */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: `${tournament.color}20`,
                  border: `1px solid ${tournament.color}40`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: tournament.color,
                }}>
                  {user.name[0].toUpperCase()}
                </div>
                <div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 600, color: "#fff" }}>
                    {user.name}
                  </div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "#6B7280" }}>
                    @{user.username}
                  </div>
                </div>
              </div>

              {/* Score */}
              <div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.3rem", color: tournament.color, fontWeight: 800 }}>
                  {user.score.toLocaleString()}
                </div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "#6B7280", marginTop: 2 }}>pts</div>
              </div>

              {/* Accuracy */}
              <div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 700, color: "#fff" }}>
                  {user.accuracy}%
                </div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "#6B7280", marginTop: 2 }}>accuracy</div>
              </div>

              {/* Streak — now with visible animated 3D fire */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 700, color: "#2DD4BF" }}>
                    {user.streak}
                  </span>
                  <FireIcon size={22} />
                </div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "#6B7280", marginTop: 2 }}>streak</div>
              </div>

              {/* Country */}
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 600, color: "#A5B4FC" }}>
                {user.country}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}