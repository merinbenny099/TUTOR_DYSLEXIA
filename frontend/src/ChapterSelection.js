import React from "react";
import { Theme } from "./Theme";
import { useLevelProgress } from "./LevelProgressContext";

const ChapterSelection = ({ subject, chapters, onSelectChapter, onBack, currentLevel }) => {
  const { progress } = useLevelProgress();
  
  // Calculate LEVEL progress (Total Stars), not just subject progress
  const subjects = ["Science", "Math", "English"];
  const totalStars = subjects.reduce((acc, sub) => {
    const scores = Object.values(progress[sub] || {});
    return acc + scores.filter(s => s >= 7).length;
  }, 0);
  const percent = Math.round((totalStars / 15) * 100);

  return (
    <div style={{ padding: "40px", backgroundColor: Theme.background, minHeight: "100vh" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        
        <button onClick={onBack} style={{ color: Theme.accent, background: "none", border: "none", cursor: "pointer", fontWeight: "bold", marginBottom: "20px" }}>
          ← Back to Dashboard
        </button>

        {/* --- REPLICA PROGRESS BAR AT TOP --- */}
        <div style={{ marginBottom: "40px" }}>
           <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ color: Theme.textMuted }}>Level {currentLevel} Progress</span>
            <span style={{ fontWeight: "bold", color: "#9b59b6" }}>{totalStars} / 15 Stars</span>
          </div>
          <div style={{ width: "100%", height: "12px", backgroundColor: "#e0e0e0", borderRadius: "10px", overflow: "hidden" }}>
            <div style={{ width: `${percent}%`, height: "100%", backgroundColor: "#9b59b6", transition: "width 0.5s" }} />
          </div>
        </div>

        <h2 style={{ color: Theme.textMain, marginBottom: "20px" }}>Select a {subject} Chapter</h2>

        <div style={{ display: "flex", gap: "25px", flexWrap: "wrap" }}>
          {chapters.map((ch) => {
            const isDone = (progress[subject] || {})[ch.id] >= 7;
            return (
              
                // Replace the button style inside Chapters.map
<button 
  key={ch.id} 
  onClick={() => onSelectChapter(ch)} 
  style={{ 
    width: "260px", 
    height: "140px", 
    borderRadius: Theme.borderRadius, 
    backgroundColor: isDone ? "#f0fff4" : "white", // Light green background if done
    border: isDone ? "2px solid #2ecc71" : "none", 
    boxShadow: Theme.cardShadow, 
    borderTop: `8px solid ${isDone ? "#2ecc71" : Theme.accent}`, 
    cursor: "pointer", 
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    transition: "0.2s"
  }}
>
  <span style={{ fontSize: "18px", fontWeight: "bold", color: Theme.textMain }}>{ch.title}</span>
  {isDone && (
    <div style={{ 
      position: "absolute", top: "-10px", right: "-10px", 
      backgroundColor: "#2ecc71", color: "white", borderRadius: "50%", 
      width: "30px", height: "30px", display: "flex", alignItems: "center", 
      justifyContent: "center", boxShadow: "0 2px 5px rgba(0,0,0,0.2)" 
    }}>
      ⭐
    </div>
  )}
</button>


            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChapterSelection;