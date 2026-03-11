import { useEffect, useRef, useState } from "react";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:500, padding:"0 40px", background:scrolled?"rgba(6,7,15,.88)":"transparent", backdropFilter:scrolled?"blur(24px)":"none", borderBottom:scrolled?"1px solid rgba(79,110,247,.1)":"none", transition:"all .5s ease" }}>
      <div style={{ maxWidth:1240, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", height:72 }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ width:38, height:38, borderRadius:12, background:"linear-gradient(135deg,#4F6EF7,#7C3AED)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 0 20px rgba(79,110,247,.4)", fontSize:18 }}>⚔</div>
          <span style={{ fontFamily:"'Syne',sans-serif", fontSize:20, fontWeight:800, letterSpacing:-.5, color:"#fff" }}>Skill<span style={{ color:"#4F6EF7" }}>Arena</span></span>
        </div>
        <div className="hide-mobile" style={{ display:"flex", gap:40 }}>
          {["Contests","Categories","Leaderboard","Rewards"].map(l => (
            <a key={l} href="#" style={{ fontFamily:"'DM Sans',sans-serif", fontSize:14, color:"#9CA3AF", fontWeight:500, transition:"color .2s", textDecoration:"none" }}
              onMouseEnter={e=>e.target.style.color="#fff"} onMouseLeave={e=>e.target.style.color="#9CA3AF"}>{l}</a>
          ))}
        </div>
        <div style={{ display:"flex", gap:12 }}>
          <button className="btn-outline" style={{ padding:"9px 22px", fontSize:14 }}>Sign in</button>
          <button className="btn-primary" style={{ padding:"9px 22px", fontSize:14 }}>Join Free ↗</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;