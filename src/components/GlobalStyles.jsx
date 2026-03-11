const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');

    :root {
      --indigo:  #4F6EF7;
      --violet:  #7C3AED;
      --teal:    #2DD4BF;
      --gold:    #F5A623;
      --bg:      #06070F;
      --bg2:     #0D0F1E;
      --surface: rgba(255,255,255,0.04);
      --border:  rgba(255,255,255,0.08);
      --text:    #F0F2FF;
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; overflow-x: hidden; cursor: none; }

    .cursor-dot  { width:8px; height:8px; background:var(--teal); border-radius:50%; position:fixed; pointer-events:none; z-index:9999; transform:translate(-50%,-50%); mix-blend-mode:screen; }
    .cursor-ring { width:38px; height:38px; border:1.5px solid rgba(79,110,247,.6); border-radius:50%; position:fixed; pointer-events:none; z-index:9998; transform:translate(-50%,-50%); mix-blend-mode:screen; }

    .reveal      { opacity:0; transform:translateY(40px);  transition:opacity .9s cubic-bezier(.16,1,.3,1),transform .9s cubic-bezier(.16,1,.3,1); }
    .reveal-left { opacity:0; transform:translateX(-50px); transition:opacity .9s cubic-bezier(.16,1,.3,1),transform .9s cubic-bezier(.16,1,.3,1); }
    .reveal-right{ opacity:0; transform:translateX(50px);  transition:opacity .9s cubic-bezier(.16,1,.3,1),transform .9s cubic-bezier(.16,1,.3,1); }
    .reveal.visible,.reveal-left.visible,.reveal-right.visible { opacity:1; transform:none; }

    .shimmer-text {
      background: linear-gradient(135deg,#fff 0%,var(--indigo) 40%,var(--teal) 60%,#fff 100%);
      background-size:300% 300%; -webkit-background-clip:text; -webkit-text-fill-color:transparent;
      animation:shimmer 6s ease infinite;
    }
    @keyframes shimmer { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }

    .grad-text { background:linear-gradient(135deg,var(--indigo),var(--teal)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }

    .glow-card { border:1px solid var(--border); position:relative; overflow:hidden; }
    .glow-card::before {
      content:''; position:absolute; inset:0; pointer-events:none;
      background:radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(79,110,247,.13), transparent 60%);
      opacity:0; transition:opacity .4s;
    }
    .glow-card:hover::before { opacity:1; }

    .badge { display:inline-flex; align-items:center; gap:8px; background:rgba(79,110,247,.1); border:1px solid rgba(79,110,247,.25); border-radius:100px; padding:6px 16px; font-size:12px; font-weight:500; color:#A5B4FC; letter-spacing:.05em; text-transform:uppercase; }
    .badge-dot { width:6px; height:6px; border-radius:50%; background:var(--teal); box-shadow:0 0 8px var(--teal); animation:pulse-dot 2s infinite; }
    @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.6;transform:scale(1.3)} }

    .btn-primary {
      display:inline-flex; align-items:center; gap:10px;
      background:linear-gradient(135deg,var(--indigo),var(--violet));
      color:#fff; border:none; border-radius:14px; padding:16px 32px;
      font-family:'DM Sans',sans-serif; font-size:15px; font-weight:600; cursor:pointer; letter-spacing:.02em;
      box-shadow:0 8px 32px rgba(79,110,247,.35); transition:all .3s cubic-bezier(.16,1,.3,1); position:relative; overflow:hidden;
    }
    .btn-primary::after { content:''; position:absolute; inset:0; background:linear-gradient(135deg,rgba(255,255,255,.15),transparent); opacity:0; transition:opacity .3s; }
    .btn-primary:hover { transform:translateY(-3px); box-shadow:0 16px 48px rgba(79,110,247,.5); }
    .btn-primary:hover::after { opacity:1; }

    .btn-outline {
      display:inline-flex; align-items:center; gap:10px;
      background:rgba(255,255,255,.04); color:var(--text); border:1px solid var(--border); border-radius:14px; padding:16px 32px;
      font-family:'DM Sans',sans-serif; font-size:15px; font-weight:500; cursor:pointer; backdrop-filter:blur(10px);
      transition:all .3s cubic-bezier(.16,1,.3,1);
    }
    .btn-outline:hover { border-color:rgba(79,110,247,.5); color:#A5B4FC; transform:translateY(-3px); }

    .section-label { font-family:'DM Sans',sans-serif; font-size:11px; font-weight:600; letter-spacing:.2em; text-transform:uppercase; color:var(--teal); }

    .grid-bg {
      background-image:linear-gradient(rgba(79,110,247,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(79,110,247,.03) 1px,transparent 1px);
      background-size:80px 80px;
    }
    .noise-overlay {
      position:fixed; inset:0; pointer-events:none; z-index:1000; opacity:.025;
      background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    }

    .cat-card { background:var(--surface); border:1px solid var(--border); border-radius:24px; padding:36px 32px; transition:all .4s cubic-bezier(.16,1,.3,1); cursor:pointer; position:relative; overflow:hidden; }
    .cat-card:hover { transform:translateY(-12px) scale(1.01); border-color:rgba(79,110,247,.35); box-shadow:0 32px 80px rgba(79,110,247,.15); }

    .step-card { background:var(--surface); border:1px solid var(--border); border-radius:24px; padding:28px 20px; transition:all .4s cubic-bezier(.16,1,.3,1); position:relative; overflow:hidden; }
    .step-card:hover { transform:translateY(-8px); border-color:rgba(79,110,247,.3); box-shadow:0 24px 64px rgba(79,110,247,.12); }

    .stat-number { font-family:'Bebas Neue',sans-serif; font-size:clamp(2.5rem,5vw,4rem); color:#fff; letter-spacing:.04em; }

    @keyframes float-badge { 0%,100%{transform:translateY(0px) rotate(var(--r,0deg))} 50%{transform:translateY(-12px) rotate(var(--r,0deg))} }
    @keyframes spin-ring   { from{transform:translate(-50%,-50%) rotate(0deg)} to{transform:translate(-50%,-50%) rotate(360deg)} }
    @keyframes marquee     { from{transform:translateX(0)} to{transform:translateX(-50%)} }

    ::-webkit-scrollbar { width:4px; }
    ::-webkit-scrollbar-track { background:var(--bg); }
    ::-webkit-scrollbar-thumb { background:var(--indigo); border-radius:4px; }

    @media (max-width:768px) {
      .rewards-grid { grid-template-columns:1fr !important; }
      .footer-cols  { grid-template-columns:1fr 1fr !important; }
      .hide-mobile  { display:none !important; }
    }
  `}</style>
);

export default GlobalStyles;