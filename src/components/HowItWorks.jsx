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

export default HowItWorks;