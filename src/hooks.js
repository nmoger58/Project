import { useEffect } from "react";
 
export function useScrollReveal() {
  useEffect(() => {
    const run = () => {
      const els = document.querySelectorAll(".reveal,.reveal-left,.reveal-right");
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
      }, { threshold: 0.12 });
      els.forEach(el => obs.observe(el));
      return () => obs.disconnect();
    };
    // small delay so elements are in DOM
    const t = setTimeout(run, 100);
    return () => clearTimeout(t);
  }, []);
}