import React from "react";
import { Theme } from "./Theme";
import { useLevelProgress } from "./LevelProgressContext";

const Level2Dashboard = ({ user, onSelectSubject, onBackToLevel1, onEnterLevel3 }) => {
  const { progress } = useLevelProgress();
  
  // Mapping icons to subjects for a better visual experience
  const subjectData = [
    { name: "Science", icon: "🧬", color: "#9b59b6" }, // Level 2 gets a DNA strand!
    { name: "Math", icon: "📐", color: "#3498db" },
    { name: "English", icon: "✍️", color: "#e67e22" }
  ];

  const totalStars = subjectData.reduce((acc, sub) => {
    const scores = Object.values(progress[sub.name] || {});
    return acc + scores.filter(s => s >= 7).length;
  }, 0);

  const percent = Math.round((totalStars / 15) * 100);
  const isLevel3Ready = totalStars >= 15;

  return (
    <div style={{ padding: "40px", backgroundColor: Theme.background, minHeight: "100vh", fontFamily: Theme.fontFamily }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        
        {/* HEADER SECTION */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
          <div>
            <h1 style={{ color: Theme.textMain, margin: 0 }}>Level 2: Intermediate</h1>
            <p style={{ color: Theme.textMuted, marginTop: "5px" }}>Keep going, {user.username}!</p>
          </div>
          <button 
            onClick={onBackToLevel1} 
            style={{ 
              padding: "12px 24px", 
              borderRadius: "12px", 
              border: `2px solid ${Theme.sidebar}`, 
              background: "white", 
              color: Theme.sidebar, 
              fontWeight: "bold", 
              cursor: "pointer",
              transition: "all 0.2s" 
            }}
          >
            ← Back to Level 1
          </button>
        </div>

        {/* PROGRESS CARD */}
        <div style={{ backgroundColor: "white", padding: "30px", borderRadius: Theme.borderRadius, boxShadow: Theme.cardShadow, marginBottom: "40px" }}>
           <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
              <span style={{ fontWeight: "bold", color: Theme.textMain }}>Level 3 Unlock Progress</span>
              <span style={{ fontWeight: "bold", color: "#9b59b6" }}>{totalStars} / 15 Stars</span>
           </div>
           <div style={{ position: "relative", width: "100%", height: "28px", backgroundColor: "#f0f0f0", borderRadius: "14px", overflow: "hidden" }}>
              <div style={{ width: `${percent}%`, height: "100%", backgroundColor: "#9b59b6", transition: "width 1s ease-out" }} />
           </div>
        </div>

        {/* SUBJECT CARDS */}
        <div style={{ display: "flex", gap: "25px" }}>
          {subjectData.map(sub => (
            <button 
              key={sub.name} 
              onClick={() => onSelectSubject(sub.name)} 
              style={{ 
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "50px 20px",
                borderRadius: Theme.borderRadius, 
                border: "none", 
                backgroundColor: "white", 
                boxShadow: Theme.cardShadow, 
                borderBottom: `10px solid ${sub.color}`,
                cursor: "pointer",
                transition: "transform 0.2s"
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-10px)"}
              onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              {/* LARGE SUBJECT ICON */}
              <span style={{ fontSize: "70px", marginBottom: "20px" }}>{sub.icon}</span>
              <span style={{ fontSize: "24px", fontWeight: "bold", color: Theme.textMain }}>{sub.name}</span>
            </button>
          ))}
        </div>

        {/* LEVEL 3 UNLOCK BUTTON */}
        {isLevel3Ready && (
          <div style={{ marginTop: "40px", textAlign: "center", padding: "40px", backgroundColor: "#d4edda", borderRadius: Theme.borderRadius, border: "3px dashed #2ecc71" }}>
            <span style={{ fontSize: "50px", display: "block", marginBottom: "15px" }}>🏆</span>
            <h2 style={{ color: "#155724", marginBottom: "20px" }}>Level 2 Mastered!</h2>
            <button 
              onClick={onEnterLevel3} 
              style={{ 
                padding: "20px 60px", 
                backgroundColor: "#2ecc71", 
                color: "white", 
                border: "none", 
                borderRadius: "15px", 
                fontSize: "22px", 
                fontWeight: "bold", 
                cursor: "pointer", 
                boxShadow: "0 10px 20px rgba(46, 204, 113, 0.4)" 
              }}
            >
              Unlock Level 3: Advanced
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Level2Dashboard;