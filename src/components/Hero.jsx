import { useState, useEffect } from "react";
import HeroThreeScene from "./HeroThreeScene.jsx";

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
            COMPETE CHALLENGES.<br /><span className="shimmer-text">IMPROVE YOURSELF.</span><br />WIN BIG.
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

export default Hero;