import { useState } from "react";

// Tournament Registration Form Component
function RegistrationForm({ tournament, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    country: "",
    experience: "beginner",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission delay
    setTimeout(() => {
      onSubmit(formData);
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0,0,0,.7)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      backdropFilter: "blur(4px)",
    }}>
      <div style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 24,
        padding: 40,
        maxWidth: 500,
        width: "90%",
        maxHeight: "90vh",
        overflow: "auto",
      }}>
        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <h2 style={{
            fontFamily: "'Syne',sans-serif",
            fontSize: "1.8rem",
            fontWeight: 800,
            color: "#fff",
            marginBottom: 8,
          }}>
            Join Tournament
          </h2>
          <p style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 14,
            color: "#6B7280",
          }}>
            {tournament.title}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Full Name */}
          <div>
            <label style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 12,
              fontWeight: 600,
              color: "#D1D5DB",
              textTransform: "uppercase",
              letterSpacing: ".05em",
              display: "block",
              marginBottom: 8,
            }}>
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "var(--bg2)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 14,
                color: "#fff",
                outline: "none",
                transition: "all .2s",
                boxSizing: "border-box",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = tournament.color;
                e.target.style.boxShadow = `0 0 0 2px ${tournament.color}26`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "var(--border)";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Email */}
          <div>
            <label style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 12,
              fontWeight: 600,
              color: "#D1D5DB",
              textTransform: "uppercase",
              letterSpacing: ".05em",
              display: "block",
              marginBottom: 8,
            }}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your.email@example.com"
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "var(--bg2)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 14,
                color: "#fff",
                outline: "none",
                transition: "all .2s",
                boxSizing: "border-box",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = tournament.color;
                e.target.style.boxShadow = `0 0 0 2px ${tournament.color}26`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "var(--border)";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Username */}
          <div>
            <label style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 12,
              fontWeight: 600,
              color: "#D1D5DB",
              textTransform: "uppercase",
              letterSpacing: ".05em",
              display: "block",
              marginBottom: 8,
            }}>
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="your_username"
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "var(--bg2)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 14,
                color: "#fff",
                outline: "none",
                transition: "all .2s",
                boxSizing: "border-box",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = tournament.color;
                e.target.style.boxShadow = `0 0 0 2px ${tournament.color}26`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "var(--border)";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Country */}
          <div>
            <label style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 12,
              fontWeight: 600,
              color: "#D1D5DB",
              textTransform: "uppercase",
              letterSpacing: ".05em",
              display: "block",
              marginBottom: 8,
            }}>
              Country
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              placeholder="Enter your country"
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "var(--bg2)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 14,
                color: "#fff",
                outline: "none",
                transition: "all .2s",
                boxSizing: "border-box",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = tournament.color;
                e.target.style.boxShadow = `0 0 0 2px ${tournament.color}26`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "var(--border)";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Experience Level */}
          <div>
            <label style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 12,
              fontWeight: 600,
              color: "#D1D5DB",
              textTransform: "uppercase",
              letterSpacing: ".05em",
              display: "block",
              marginBottom: 8,
            }}>
              Experience Level
            </label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "var(--bg2)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 14,
                color: "#fff",
                outline: "none",
                transition: "all .2s",
                boxSizing: "border-box",
                cursor: "pointer",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = tournament.color;
                e.target.style.boxShadow = `0 0 0 2px ${tournament.color}26`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "var(--border)";
                e.target.style.boxShadow = "none";
              }}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
            <button
              type="button"
              onClick={onCancel}
              style={{
                flex: 1,
                padding: "12px 20px",
                background: "var(--bg2)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 14,
                fontWeight: 600,
                color: "#9CA3AF",
                cursor: "pointer",
                transition: "all .2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = "#4B5563";
                e.target.style.color = "#D1D5DB";
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = "var(--border)";
                e.target.style.color = "#9CA3AF";
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                flex: 1,
                padding: "12px 20px",
                background: tournament.color,
                border: "none",
                borderRadius: 12,
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 14,
                fontWeight: 600,
                color: "#000",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                transition: "all .2s",
                opacity: isSubmitting ? 0.7 : 1,
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = `0 12px 24px ${tournament.color}40`;
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              {isSubmitting ? "Registering..." : "Register Now"}
            </button>
          </div>

          {/* Terms Note */}
          <p style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 11,
            color: "#6B7280",
            textAlign: "center",
            marginTop: 8,
          }}>
            By registering, you agree to our terms and conditions
          </p>
        </form>
      </div>
    </div>
  );
}

// Static tournament data
export const TOURNAMENTS = [
  {
    id: 1,
    title: "Global Coding Sprint",
    category: "Coding",
    color: "#4F6EF7",
    participants: 1240,
    prizePool: "$50,000",
    status: "Live Now",
    description: "Algorithm challenges & competitive programming",
    endTime: "2h 45m remaining",
  },
  {
    id: 2,
    title: "Fitness Challenge 2026",
    category: "Fitness",
    color: "#2DD4BF",
    participants: 856,
    prizePool: "$25,000",
    status: "Live Now",
    description: "Endurance, strength & agility tests",
    endTime: "5h 12m remaining",
  },
  {
    id: 3,
    title: "Master Chef Showdown",
    category: "Cooking",
    color: "#F5A623",
    participants: 324,
    prizePool: "$15,000",
    status: "Live Now",
    description: "Speed cooking & culinary excellence",
    endTime: "1h 30m remaining",
  },
  {
    id: 4,
    title: "Creative Design Jam",
    category: "Creative",
    color: "#7C3AED",
    participants: 542,
    prizePool: "$30,000",
    status: "Starting Soon",
    description: "UI/UX design & digital art competition",
    endTime: "Starts in 2h 15m",
  },
  {
    id: 5,
    title: "React Masters",
    category: "Coding",
    color: "#4F6EF7",
    participants: 892,
    prizePool: "$40,000",
    status: "Live Now",
    description: "Front-end development & web technologies",
    endTime: "3h 30m remaining",
  },
  {
    id: 6,
    title: "Marathon Challenge",
    category: "Fitness",
    color: "#2DD4BF",
    participants: 445,
    prizePool: "$20,000",
    status: "Live Now",
    description: "Long-distance running & endurance",
    endTime: "6h 00m remaining",
  },
];

export default function Tournaments({ onSelectTournament }) {
  const [selectedTournament, setSelectedTournament] = useState(null);

  const handleTournamentClick = (tournament) => {
    setSelectedTournament(tournament);
  };

  const handleRegistrationSubmit = (formData) => {
    // Call the parent callback with both tournament and registration data
    onSelectTournament(selectedTournament, formData);
    setSelectedTournament(null);
  };

  const handleCancel = () => {
    setSelectedTournament(null);
  };
  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg)",
      padding: "120px 40px 80px",
    }}>
      {/* Registration Form Modal */}
      {selectedTournament && (
        <RegistrationForm
          tournament={selectedTournament}
          onSubmit={handleRegistrationSubmit}
          onCancel={handleCancel}
        />
      )}

      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 80 }}>
          <span style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: ".2em",
            textTransform: "uppercase",
            color: "#2DD4BF",
          }}>
            Live Competitions
          </span>
          <h1 style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: "clamp(3rem,5vw,5.5rem)",
            color: "#fff",
            letterSpacing: ".04em",
            marginTop: 14,
            lineHeight: 1,
            marginBottom: 20,
          }}>
            CHOOSE YOUR <span style={{
              background: "linear-gradient(135deg,#4F6EF7,#2DD4BF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>BATTLE</span>
          </h1>
          <p style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: "1.05rem",
            color: "#6B7280",
            maxWidth: 500,
            lineHeight: 1.75,
          }}>
            {TOURNAMENTS.filter(t => t.status === "Live Now").length} tournaments running right now. Pick one and start competing.
          </p>
        </div>

        {/* Tournaments Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))",
          gap: 24,
        }}>
          {TOURNAMENTS.map((tournament) => (
            <div
              key={tournament.id}
              onClick={() => handleTournamentClick(tournament)}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 24,
                padding: 32,
                cursor: "pointer",
                transition: "all .4s cubic-bezier(.16,1,.3,1)",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-12px) scale(1.01)";
                e.currentTarget.style.borderColor = `${tournament.color}59`;
                e.currentTarget.style.boxShadow = `0 32px 80px ${tournament.color}26`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Category Badge */}
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: `${tournament.color}18`,
                border: `1px solid ${tournament.color}33`,
                borderRadius: 100,
                padding: "6px 14px",
                marginBottom: 16,
              }}>
                <span style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: tournament.color,
                  boxShadow: `0 0 8px ${tournament.color}`,
                }} />
                <span style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                  color: tournament.color,
                  textTransform: "uppercase",
                  letterSpacing: ".05em",
                }}>
                  {tournament.category}
                </span>
              </div>

              {/* Title */}
              <h3 style={{
                fontFamily: "'Syne',sans-serif",
                fontSize: "1.3rem",
                fontWeight: 800,
                color: "#fff",
                marginBottom: 12,
                lineHeight: 1.3,
              }}>
                {tournament.title}
              </h3>

              {/* Description */}
              <p style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: ".9rem",
                color: "#6B7280",
                lineHeight: 1.7,
                marginBottom: 24,
              }}>
                {tournament.description}
              </p>

              {/* Stats */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
                marginBottom: 24,
                paddingBottom: 24,
                borderBottom: "1px solid var(--border)",
              }}>
                <div>
                  <div style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 11,
                    color: "#374151",
                    textTransform: "uppercase",
                    letterSpacing: ".1em",
                    marginBottom: 4,
                  }}>
                    Participants
                  </div>
                  <div style={{
                    fontFamily: "'Bebas Neue',sans-serif",
                    fontSize: "1.4rem",
                    color: "#fff",
                    letterSpacing: ".04em",
                  }}>
                    {tournament.participants.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 11,
                    color: "#374151",
                    textTransform: "uppercase",
                    letterSpacing: ".1em",
                    marginBottom: 4,
                  }}>
                    Prize Pool
                  </div>
                  <div style={{
                    fontFamily: "'Bebas Neue',sans-serif",
                    fontSize: "1.4rem",
                    background: `linear-gradient(135deg,${tournament.color},#fff)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    letterSpacing: ".04em",
                  }}>
                    {tournament.prizePool}
                  </div>
                </div>
              </div>

              {/* Bottom Info */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
                <div>
                  <span style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 12,
                    fontWeight: 600,
                    color: tournament.color,
                    background: `${tournament.color}18`,
                    padding: "4px 10px",
                    borderRadius: 6,
                    textTransform: "capitalize",
                  }}>
                    {tournament.status}
                  </span>
                  <div style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 11,
                    color: "#6B7280",
                    marginTop: 6,
                  }}>
                    {tournament.endTime}
                  </div>
                </div>
                <div style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 18,
                  color: tournament.color,
                }}>
                  →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
