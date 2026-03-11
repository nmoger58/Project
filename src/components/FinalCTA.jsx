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

export default FinalCTA;