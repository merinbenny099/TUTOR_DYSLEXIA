import React from "react";
import "./App.css";

function Dashboard({ currentUserData, onStartLesson, onBack }) {
  const subjects = ["Science", "Math", "English", "GK"];
  const quotes = [
    "Believe you can and you're halfway there.",
    "Success is the sum of small efforts repeated daily.",
    "Dream it. Wish it. Do it.",
  ];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  const xpForNextLevel = 100;
  const xpProgress = Math.min((currentUserData?.xp || 0)/xpForNextLevel, 1);

  return (
    <div style={{ padding: "20px", paddingBottom: "80px" }}>
      {/* Top User Card */}
      <div className="skill-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2>{currentUserData.username}</h2>
          <p>Level {currentUserData.level} | XP {currentUserData.xp}/{xpForNextLevel}</p>
          <div className="progress-bar" style={{ width: "150px" }}>
            <div className="progress-bar-fill" style={{ width: `${xpProgress*100}%` }} />
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <p>Total Points</p>
          <h3>{currentUserData.totalPoints}</h3>
        </div>
      </div>

      {/* Subject Cards */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", marginTop: "20px" }}>
        {subjects.map(subject => {
          const completed = currentUserData.completedLessons[subject].length || 0;
          const progress = completed/5;
          return (
            <div className="skill-card" key={subject}>
              <h3>{subject}</h3>
              <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: `${progress*100}%`, backgroundColor: "#FF9800" }} />
              </div>
              <p>{completed}/5 Lessons Completed</p>
              <button style={{ backgroundColor: "#007acc", color: "white" }} onClick={() => onStartLesson(subject)}>Continue</button>
            </div>
          )
        })}
      </div>

      <p style={{ fontStyle: "italic", marginTop: "30px", textAlign: "center" }}>"{randomQuote}"</p>

      {/* Logout */}
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button style={{ backgroundColor: "#999", color: "white" }} onClick={onBack}>Logout</button>
      </div>
    </div>
  );
}

export default Dashboard;
