import { useState } from "react";

function HeroThreeScene() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 1, overflow: "hidden", transform: "translateX(20rem)" }}>
      {/* Placeholder overlay — hides the Sketchfab loading UI */}
      {!loaded && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            background: "transparent", // match your site's bg color here
            pointerEvents: "none",
          }}
        />
      )}

      <iframe
        title="Ready Player Me Avatar sudadera CØØL"
        frameBorder="0"
        allowFullScreen
        mozallowfullscreen="true"
        webkitallowfullscreen="true"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        src="https://sketchfab.com/models/b6e0d2823b9342c18d9e40f5683a4d85/embed?autostart=1&transparent=1&ui_hint=0"
        onLoad={() => setLoaded(true)}
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          borderRadius: "inherit",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      />
    </div>
  );
}

export default HeroThreeScene;