import { useState } from "react";
import GlobalStyles from "./components/GlobalStyles.jsx";
import Navbar from "./components/Navbar.jsx";
import StatsMarquee from "./components/StatsMarquee.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import Categories from "./components/Categories.jsx";
import Rewards from "./components/Rewards.jsx";
import Community from "./components/Community.jsx";
import FinalCTA from "./components/FinalCTA.jsx";
import Footer from "./components/Footer.jsx";
import {useScrollReveal} from "./hooks.js";
import Hero from "./components/Hero.jsx";
import Cursor from "./components/Cursor.jsx";
import SignIn from "./pages/SignIn.jsx";
import Tournaments from "./pages/Tournaments.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";

/* ═══════════════════════════════════════════
   GLOBAL STYLES
═══════════════════════════════════════════ */

GlobalStyles();

export default function App() {
  useScrollReveal();
  const [appState, setAppState] = useState("landing"); // landing, signin, tournaments, leaderboard
  const [user, setUser] = useState(null);
  const [selectedTournament, setSelectedTournament] = useState(null);

  const handleSignIn = (userData) => {
    setUser(userData);
    setAppState("tournaments");
  };

  const handleSelectTournament = (tournament) => {
    setSelectedTournament(tournament);
    setAppState("leaderboard");
  };

  const handleBackToTournaments = () => {
    setAppState("tournaments");
  };

  const handleBackToLanding = () => {
    setAppState("landing");
    setUser(null);
    setSelectedTournament(null);
  };

  // Sign-in page
  if (appState === "signin") {
    return (
      <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
        <GlobalStyles />
        <div className="noise-overlay" />
        <Cursor />
        <SignIn onSignIn={handleSignIn} />
      </div>
    );
  }

  // Tournaments page
  if (appState === "tournaments") {
    return (
      <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
        <GlobalStyles />
        <div className="noise-overlay" />
        <Cursor />
        <div style={{
          padding: "20px 40px",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              background: "linear-gradient(135deg,#4F6EF7,#7C3AED)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 20px rgba(79,110,247,.4)",
              fontSize: 18,
            }}>⚔</div>
            <span style={{
              fontFamily: "'Syne',sans-serif",
              fontSize: 18,
              fontWeight: 800,
              color: "#fff",
            }}>
              Skill<span style={{ color: "#4F6EF7" }}>Arena</span>
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 14,
              color: "#9CA3AF",
            }}>
              Welcome, <span style={{ color: "#A5B4FC" }}>{user?.name}</span>
            </span>
            <button
              onClick={handleBackToLanding}
              style={{
                background: "rgba(255,255,255,.04)",
                border: "1px solid var(--border)",
                color: "#9CA3AF",
                borderRadius: 10,
                padding: "8px 16px",
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 13,
                cursor: "pointer",
                transition: "all .2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = "rgba(79,110,247,.5)";
                e.target.style.color = "#A5B4FC";
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = "var(--border)";
                e.target.style.color = "#9CA3AF";
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
        <Tournaments onSelectTournament={handleSelectTournament} />
      </div>
    );
  }

  // Leaderboard page
  if (appState === "leaderboard") {
    return (
      <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
        <GlobalStyles />
        <div className="noise-overlay" />
        <Cursor />
        <div style={{
          padding: "20px 40px",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              background: "linear-gradient(135deg,#4F6EF7,#7C3AED)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 20px rgba(79,110,247,.4)",
              fontSize: 18,
            }}>⚔</div>
            <span style={{
              fontFamily: "'Syne',sans-serif",
              fontSize: 18,
              fontWeight: 800,
              color: "#fff",
            }}>
              Skill<span style={{ color: "#4F6EF7" }}>Arena</span>
            </span>
          </div>
          <span style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 14,
            color: "#9CA3AF",
          }}>
            Welcome, <span style={{ color: "#A5B4FC" }}>{user?.name}</span>
          </span>
        </div>
        <Leaderboard tournament={selectedTournament} onBack={handleBackToTournaments} />
      </div>
    );
  }

  // Landing page (default)
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <GlobalStyles />
      <div className="noise-overlay" />
      <Cursor />
      <Navbar />
      <Hero />
      <StatsMarquee />
      <HowItWorks />
      <Categories />
      <Rewards />
      <Community />
      <FinalCTA />
      <Footer />
      
      {/* Floating Sign In Button */}
      <button
        onClick={() => setAppState("signin")}
        style={{
          position: "fixed",
          bottom: 40,
          right: 40,
          background: "linear-gradient(135deg,#4F6EF7,#7C3AED)",
          color: "#fff",
          border: "none",
          borderRadius: 14,
          padding: "14px 28px",
          fontFamily: "'DM Sans',sans-serif",
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
          boxShadow: "0 8px 32px rgba(79,110,247,.35)",
          transition: "all .3s cubic-bezier(.16,1,.3,1)",
          zIndex: 100,
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "translateY(-3px)";
          e.target.style.boxShadow = "0 16px 48px rgba(79,110,247,.5)";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "translateY(0)";
          e.target.style.boxShadow = "0 8px 32px rgba(79,110,247,.35)";
        }}
      >
        Start Competing →
      </button>
    </div>
  );
}