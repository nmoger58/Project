import { useState } from "react";

export default function SignIn({ onSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();
    if (email && password) {
      onSignIn({ email, name: email.split("@")[0] });
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
    }}>
      <div style={{
        maxWidth: 420,
        width: "100%",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 24,
        padding: "48px 40px",
      }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            background: "linear-gradient(135deg,#4F6EF7,#7C3AED)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            margin: "0 auto 20px",
            boxShadow: "0 0 20px rgba(79,110,247,.4)",
          }}>
            ⚔
          </div>
          <h1 style={{
            fontFamily: "'Syne',sans-serif",
            fontSize: 28,
            fontWeight: 800,
            color: "#fff",
            marginBottom: 8,
          }}>
            Skill<span style={{ color: "#4F6EF7" }}>Arena</span>
          </h1>
          <p style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 14,
            color: "#9CA3AF",
            marginBottom: 0,
          }}>
            Sign in to compete
          </p>
        </div>

        <form onSubmit={handleSignIn} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <label style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 12,
              fontWeight: 600,
              color: "#A5B4FC",
              textTransform: "uppercase",
              letterSpacing: ".05em",
              display: "block",
              marginBottom: 8,
            }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "rgba(255,255,255,.04)",
                border: "1px solid rgba(79,110,247,.25)",
                borderRadius: 12,
                color: "#fff",
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 14,
                outline: "none",
                transition: "all .2s",
              }}
              onFocus={(e) => e.target.style.borderColor = "rgba(79,110,247,.6)"}
              onBlur={(e) => e.target.style.borderColor = "rgba(79,110,247,.25)"}
            />
          </div>

          <div>
            <label style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 12,
              fontWeight: 600,
              color: "#A5B4FC",
              textTransform: "uppercase",
              letterSpacing: ".05em",
              display: "block",
              marginBottom: 8,
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "rgba(255,255,255,.04)",
                border: "1px solid rgba(79,110,247,.25)",
                borderRadius: 12,
                color: "#fff",
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 14,
                outline: "none",
                transition: "all .2s",
              }}
              onFocus={(e) => e.target.style.borderColor = "rgba(79,110,247,.6)"}
              onBlur={(e) => e.target.style.borderColor = "rgba(79,110,247,.25)"}
            />
          </div>

          <button
            type="submit"
            style={{
              background: "linear-gradient(135deg,#4F6EF7,#7C3AED)",
              color: "#fff",
              border: "none",
              borderRadius: 14,
              padding: "14px 24px",
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              marginTop: 12,
              boxShadow: "0 8px 32px rgba(79,110,247,.35)",
              transition: "all .3s cubic-bezier(.16,1,.3,1)",
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
            Sign In →
          </button>
        </form>

        <p style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: 13,
          color: "#374151",
          textAlign: "center",
          marginTop: 24,
        }}>
          Demo: Use any email & password to continue
        </p>
      </div>
    </div>
  );
}
