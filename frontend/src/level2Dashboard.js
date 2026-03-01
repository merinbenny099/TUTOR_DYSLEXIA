import React from "react";
import { Theme } from "./Theme";
import { useLevelProgress } from "./LevelProgressContext";

const Level2Dashboard = ({ user, onSelectSubject, onBackToLevel1, onEnterLevel3 }) => {
  const { progress } = useLevelProgress();
  const subjects = ["Science", "Math", "English"];

  // Calculate TOTAL stars for Level 2
  const totalStars = subjects.reduce((acc, sub) => {
    const scores = Object.values(progress[sub] || {});
    return acc + scores.filter(s => s >= 7).length;
  }, 0);

  const percent = Math.round((totalStars / 15) * 100);
  const isLevel3Ready = totalStars >= 15;

  return (
    <div style={{ padding: "40px", backgroundColor: Theme.background, minHeight: "100vh", fontFamily: Theme.fontFamily }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{ color: Theme.textMain }}>Level 2: Intermediate</h1>
          <button onClick={onBackToLevel1} style={{ padding: "10px 20px", borderRadius: "8px", border: `2px solid ${Theme.accent}`, background: "white", color: Theme.accent, fontWeight: "bold", cursor: "pointer" }}>
            ← Back to Level 1
          </button>
        </div>
        <p style={{ color: Theme.textMuted, marginBottom: "30px" }}>Keep going, {user.username}!</p>

        {/* --- LEVEL 2 PROGRESS BAR --- */}
        <div style={{ position: "relative", width: "100%", height: "24px", backgroundColor: "#eee", borderRadius: "12px", overflow: "hidden" }}>
  {/* The Fill */}
  <div style={{ width: `${percent}%`, height: "100%", backgroundColor: "#9b59b6", transition: "width 1s ease-out" }} />
  
  {/* Milestone Markers */}
  <div style={{ position: "absolute", left: "33.3%", top: 0, width: "2px", height: "100%", backgroundColor: "rgba(255,255,255,0.3)" }} />
  <div style={{ position: "absolute", left: "66.6%", top: 0, width: "2px", height: "100%", backgroundColor: "rgba(255,255,255,0.3)" }} />
</div>
<div style={{ display: "flex", justifyContent: "space-between", padding: "0 5px", marginTop: "5px", fontSize: "11px", color: Theme.textMuted }}>
  <span>Start</span>
  <span>5 Stars</span>
  <span>10 Stars</span>
  <span>Level Up!</span>
</div>

        {/* --- SUBJECT CARDS --- */}
        <div style={{ display: "flex", gap: "25px" }}>
          {subjects.map(s => (
            <button key={s} onClick={() => onSelectSubject(s)} style={{ width: Theme.cardWidth, height: Theme.cardHeight, borderRadius: Theme.borderRadius, border: "none", backgroundColor: "white", fontSize: Theme.cardFontSize, fontWeight: "bold", color: Theme.textMain, boxShadow: Theme.cardShadow, borderTop: `8px solid ${Theme.accent}`, cursor: "pointer" }}>
              {s}
            </button>
          ))}
        </div>

        {/* --- LEVEL 3 UNLOCK BUTTON --- */}
        {isLevel3Ready && (
          <div style={{ marginTop: "40px", textAlign: "center", padding: "30px", backgroundColor: "#d4edda", borderRadius: Theme.borderRadius, border: "2px dashed #28a745" }}>
            <h2 style={{ color: "#155724", marginBottom: "10px" }}>🎉 Level 2 Complete!</h2>
            <button 
              onClick={onEnterLevel3} 
              style={{ padding: "15px 40px", backgroundColor: "#2ecc71", color: "white", border: "none", borderRadius: "10px", fontSize: "20px", fontWeight: "bold", cursor: "pointer", boxShadow: "0 4px 15px rgba(46, 204, 113, 0.3)" }}
            >
              Unlock Level 3
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Level2Dashboard;