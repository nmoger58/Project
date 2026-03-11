function Footer() {
  return (
    <footer style={{ background:"#030408", borderTop:"1px solid var(--border)", padding:"72px 40px 36px" }}>
      <div style={{ maxWidth:1240, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"2.5fr 1fr 1fr 1fr", gap:48, marginBottom:64 }} className="footer-cols">
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:18 }}>
              <div style={{ width:36, height:36, borderRadius:10, background:"linear-gradient(135deg,#4F6EF7,#7C3AED)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:17 }}>⚔</div>
              <span style={{ fontFamily:"'Syne',sans-serif", fontSize:19, fontWeight:800, color:"#fff" }}>Skill<span style={{ color:"#4F6EF7" }}>Arena</span></span>
            </div>
            <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:".88rem", color:"#374151", lineHeight:1.8, maxWidth:280, marginBottom:28 }}>The world's most trusted skill-based competition platform. Built for competitors, by competitors.</p>
            <div style={{ display:"flex", gap:12 }}>
              {["𝕏","📸","in","🎮"].map((ic,i) => (
                <div key={i} style={{ width:38, height:38, borderRadius:10, border:"1px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, color:"#374151", cursor:"pointer", transition:"all .2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor="#4F6EF7"; e.currentTarget.style.color="#4F6EF7"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.color="#374151"; }}>{ic}</div>
              ))}
            </div>
          </div>
          {[["Platform",["Contests","Leaderboards","Categories","Live Matches"]],["Company",["About","Blog","Careers","Press"]],["Legal",["Privacy","Terms","Cookies","Contact"]]].map(([title,links]) => (
            <div key={title}>
              <h4 style={{ fontFamily:"'Syne',sans-serif", fontSize:12, fontWeight:800, color:"#374151", letterSpacing:".15em", textTransform:"uppercase", marginBottom:20 }}>{title}</h4>
              {links.map(l => (
                <a key={l} href="#" style={{ display:"block", fontFamily:"'DM Sans',sans-serif", fontSize:".88rem", color:"#4B5563", marginBottom:12, textDecoration:"none", transition:"color .2s" }}
                  onMouseEnter={e=>e.target.style.color="#9CA3AF"} onMouseLeave={e=>e.target.style.color="#4B5563"}>{l}</a>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop:"1px solid var(--border)", paddingTop:28, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
          <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:"#1F2937" }}>© 2026 SkillArena Inc. All rights reserved.</span>
          <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:"#1F2937" }}>Made for those who never stop improving.</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;