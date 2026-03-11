import { useEffect, useRef } from "react";

function Cursor() {
  const dot = useRef(null), ring = useRef(null);
  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0;
    const move = e => { mx = e.clientX; my = e.clientY; };
    window.addEventListener("mousemove", move);
    let raf;
    const tick = () => {
      rx += (mx - rx) * .15; ry += (my - ry) * .15;
      if (dot.current)  { dot.current.style.left  = mx + "px"; dot.current.style.top  = my + "px"; }
      if (ring.current) { ring.current.style.left = rx + "px"; ring.current.style.top = ry + "px"; }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);
  return (<><div className="cursor-dot" ref={dot} /><div className="cursor-ring" ref={ring} /></>);
}

export default Cursor;