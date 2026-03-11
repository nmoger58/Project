function StatsMarquee() {
  const items = ["240K+ Competitors","$4.2M Prizes Paid","1,800+ Live Contests","98% Satisfaction","50+ Countries","Real-Time Results"];
  return (
    <div style={{ borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)", background:"var(--bg2)", overflow:"hidden", padding:"18px 0" }}>
      <div style={{ display:"flex", gap:64, animation:"marquee 22s linear infinite", width:"max-content" }}>
        {[...items,...items].map((item,i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:12, fontFamily:"'Syne',sans-serif", fontSize:14, fontWeight:700, color:"#374151", whiteSpace:"nowrap", letterSpacing:".05em" }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:"#4F6EF7", display:"inline-block" }} />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatsMarquee;