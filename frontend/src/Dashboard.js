import React from "react";
import { Theme } from "./Theme";
import { useLevelProgress } from "./LevelProgressContext";

const Dashboard = ({ user, onSelectSubject, onEnterLevel2 }) => {
  const { progress, isLevel2Unlocked } = useLevelProgress();
  
  // Define subjects with their corresponding icons
  const subjects = [
    { name: "Science", icon: "🔬", color: "#9b59b6" },
    { name: "Math", icon: "📐", color: "#3498db" },
    { name: "English", icon: "📚", color: "#e67e22" }
  ];

  const totalStars = subjects.reduce((acc, sub) => {
    const scores = Object.values(progress[sub.name] || {});
    return acc + scores.filter(s => s >= 7).length;
  }, 0);

  const percent = Math.round((totalStars / 15) * 100);

  return (
    <div style={{ padding: "40px", backgroundColor: Theme.background, minHeight: "100vh", fontFamily: Theme.fontFamily }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        
        <h1 style={{ color: Theme.textMain, marginBottom: "5px" }}>Level 1: Foundations</h1>
        <p style={{ color: Theme.textMuted, marginBottom: "30px" }}>Welcome back, {user.username}!</p>

        {/* --- PROGRESS BAR --- */}
        <div style={{ backgroundColor: "white", padding: "25px", borderRadius: Theme.borderRadius, boxShadow: Theme.cardShadow, marginBottom: "40px" }}>
           <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontWeight: "bold" }}>
              <span>Course Progress</span>
              <span>{totalStars} / 15 Stars</span>
           </div>
           <div style={{ position: "relative", width: "100%", height: "24px", backgroundColor: "#eee", borderRadius: "12px", overflow: "hidden" }}>
             <div style={{ width: `${percent}%`, height: "100%", backgroundColor: "#9b59b6", transition: "width 1s ease-out" }} />
           </div>
        </div>

        {/* --- THE SUBJECT CARDS --- */}
        <div style={{ display: "flex", gap: "25px" }}>
          {subjects.map(sub => (
            <button 
              key={sub.name} 
              onClick={() => onSelectSubject(sub.name)} 
              style={{ 
                flex: 1, // Makes them equal width
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "40px 20px",
                borderRadius: Theme.borderRadius, 
                border: "none", 
                backgroundColor: "white", 
                boxShadow: Theme.cardShadow, 
                borderBottom: `8px solid ${sub.color}`, // Accent color at the bottom
                cursor: "pointer",
                transition: "transform 0.2s"
              }}
              // Simple hover effect
              onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              {/* LARGE ICON */}
              <span style={{ fontSize: "60px", marginBottom: "15px" }}>{sub.icon}</span>
              
              <span style={{ fontSize: "24px", fontWeight: "bold", color: Theme.textMain }}>
                {sub.name}
              </span>
            </button>
          ))}
        </div>

        {isLevel2Unlocked() && (
          <button onClick={onEnterLevel2} style={{ marginTop: "40px", padding: "20px", backgroundColor: Theme.success, color: "white", border: "none", borderRadius: "15px", fontSize: "20px", fontWeight: "bold", cursor: "pointer", width: "100%", boxShadow: "0 4px 15px rgba(46, 204, 113, 0.3)" }}>
            🚀 Unlock Level 2: Advanced Explorer! →
          </button>
        )}
      </div>
    </div>
  );
};

export default Dashboard;