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

export default Community;