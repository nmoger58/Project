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
  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg)",
      padding: "120px 40px 80px",
    }}>
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
              onClick={() => onSelectTournament(tournament)}
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
