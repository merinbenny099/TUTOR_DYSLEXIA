import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import ChapterSelection from "./ChapterSelection";
import LessonView from "./LessonView"; 
import Flashcards from "./Flashcards";
import Quiz from "./Quiz"; // Note: If you renamed this to QuizView, update this import
import Auth from "./Auth";
import Level2Dashboard from "./level2Dashboard"; 
import { useLevelProgress } from "./LevelProgressContext";
import { lessonsData } from "./lessonsData"; 
import { level2Data } from "./level2Data"; 
import { Theme } from "./Theme";

// --- 1. SUCCESS SCREEN (Minimal & High Contrast) ---
const SuccessScreen = ({ level, onContinue }) => (
  <div style={{ 
    display: "flex", justifyContent: "center", alignItems: "center", 
    height: "100vh", backgroundColor: Theme.background, textAlign: "center", padding: "20px" 
  }}>
    <div style={{ 
      backgroundColor: "white", padding: "60px", borderRadius: Theme.borderRadius, 
      boxShadow: Theme.cardShadow, maxWidth: "600px", border: `8px solid ${Theme.success}` 
    }}>
      <div style={{ fontSize: "80px", marginBottom: "20px" }}>🏆</div>
      <h1 style={{ fontSize: "42px", color: Theme.textMain, fontFamily: Theme.fontFamily }}>Level {level} Mastered!</h1>
      <p style={{ fontSize: "22px", color: Theme.textMuted, marginBottom: "40px", fontFamily: Theme.fontFamily }}>
        Incredible work! You have collected all 15 stars.
      </p>
      <button 
        onClick={onContinue}
        style={{ 
          backgroundColor: Theme.success, color: "white", padding: "20px 50px", 
          borderRadius: "50px", border: "none", fontSize: "24px", fontWeight: "bold", cursor: "pointer"
        }}
      >
        Continue to Next Level →
      </button>
    </div>
  </div>
);

function App() {
  const { markModuleComplete, progress, isLevel2Unlocked } = useLevelProgress();
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("current_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [page, setPage] = useState(() => localStorage.getItem("current_page") || "dashboard");
  const [subject, setSubject] = useState(() => localStorage.getItem("current_subject") || null);
  const [currentLevel, setCurrentLevel] = useState(() => parseInt(localStorage.getItem("current_level")) || 1);
  const [chapterData, setChapterData] = useState(() => {
    const saved = localStorage.getItem("current_chapter_data");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem("current_user", JSON.stringify(user));
    else localStorage.removeItem("current_user");
  }, [user]);

  useEffect(() => {
    localStorage.setItem("current_page", page);
    localStorage.setItem("current_level", currentLevel);
    if (subject) localStorage.setItem("current_subject", subject);
    if (chapterData) localStorage.setItem("current_chapter_data", JSON.stringify(chapterData));
  }, [page, subject, chapterData, currentLevel]);

  // --- HELPERS ---
  const getStarsForLevel = (levelNum) => {
    const data = levelNum === 2 ? level2Data : lessonsData;
    const subjects = ["Science", "Math", "English"];
    let count = 0;
    subjects.forEach((sub) => {
      if (data[sub]) {
        data[sub].forEach((chapter) => {
          const score = (progress[sub] || {})[chapter.id];
          if (score !== null && score >= 7) count++;
        });
      }
    });
    return count;
  };


  const handleLogin = (userData) => {
  // 1. Save to localStorage immediately
  localStorage.setItem("current_user", JSON.stringify(userData));
  
  // 2. Update React State
  setUser(userData);
  
  // 3. Force the page to 'dashboard'
  setPage("dashboard");

  // 4. Force a quick sync (This solves the "can't login" bug)
  window.location.reload(); 
};



  const handleLogout = () => {
    setUser(null);
    setPage("dashboard");
  };

  const handleComplete = (score) => {
    if (subject && chapterData) {
      markModuleComplete(subject, chapterData.id, score);
      const levelStars = getStarsForLevel(currentLevel);
      if (levelStars >= 14 && score >= 7) { // Check if this final quiz hits the 15 mark
        setPage(currentLevel === 1 ? "level1Success" : "level2Success");
      } else {
        setPage("chapterSelection");
      }
    }
  };

 if (!user) return <Auth onLogin={handleLogin} />;

  const activeDataSource = currentLevel === 2 ? level2Data : lessonsData;

  const views = {
    dashboard: <Dashboard user={user} onSelectSubject={(subj) => { setSubject(subj); setPage("chapterSelection"); }} onLogout={handleLogout} />,
    level2Dashboard: <Level2Dashboard user={user} onSelectSubject={(subj) => { setSubject(subj); setPage("chapterSelection"); }} onBackToLevel1={() => { setCurrentLevel(1); setPage("dashboard"); }} />,
    level1Success: <SuccessScreen level={1} onContinue={() => { setCurrentLevel(2); setPage("level2Dashboard"); }} />,
    level2Success: <SuccessScreen level={2} onContinue={() => { setCurrentLevel(1); setPage("dashboard"); }} />,
    chapterSelection: <ChapterSelection subject={subject} currentLevel={currentLevel} chapters={activeDataSource[subject]} onSelectChapter={(ch) => { setChapterData(ch); setPage("lesson"); }} onBack={() => setPage(currentLevel === 2 ? "level2Dashboard" : "dashboard")} />,
    lesson: chapterData && <LessonView chapter={chapterData} onBack={() => setPage("chapterSelection")} onStartFlashcards={() => setPage("flashcards")} onStartQuiz={() => setPage("quiz")} />,
    flashcards: chapterData && <Flashcards flashcards={chapterData.flashcards} onBack={() => setPage("lesson")} />,
    quiz: chapterData && <Quiz questions={chapterData.test} onFinish={handleComplete} onBackToLesson={() => setPage("chapterSelection")} />
  };

  if (page.includes("Success")) return views[page];

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: Theme.background, fontFamily: Theme.fontFamily }}>
      
      {/* SIDEBAR - Optimized for High Contrast */}
      <div style={{ width: "280px", backgroundColor: "#1E293B", color: "white", display: "flex", flexDirection: "column", padding: "40px 20px" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "40px", textAlign: "center", color: Theme.accent }}>My Academy</h2>
        
        <nav style={{ flex: 1 }}>
          {[1, 2].map((lvl) => {
            const unlocked = lvl === 1 || isLevel2Unlocked();
            const active = currentLevel === lvl;
            const stars = getStarsForLevel(lvl);

            return (
              <div 
                key={lvl}
                onClick={() => { if (unlocked) { setCurrentLevel(lvl); setPage(lvl === 1 ? "dashboard" : "level2Dashboard"); }}}
                style={{
                  padding: "20px", marginBottom: "15px", borderRadius: "12px",
                  cursor: unlocked ? "pointer" : "not-allowed",
                  backgroundColor: active ? Theme.accent : "transparent",
                  opacity: unlocked ? 1 : 0.5,
                  border: active ? "none" : "1px solid #334155"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "18px" }}>
                  <span>Level {lvl}</span>
                  <span>{unlocked ? "🔓" : "🔒"}</span>
                </div>
                {unlocked && (
                  <div style={{ marginTop: "10px" }}>
                    <div style={{ fontSize: "14px", color: active ? "#E0F2FE" : "#94A3B8" }}>{stars} / 15 Stars</div>
                    <div style={{ width: "100%", height: "6px", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "10px", marginTop: "5px" }}>
                      <div style={{ width: `${(stars / 15) * 100}%`, height: "100%", backgroundColor: active ? "white" : Theme.accent, borderRadius: "10px" }} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <button onClick={handleLogout} style={{ padding: "15px", background: "none", color: "#F87171", border: "2px solid #F87171", borderRadius: "12px", cursor: "pointer", fontWeight: "bold", fontSize: "16px" }}>
          Sign Out
        </button>
      </div>

      {/* MAIN CONTENT AREA */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {views[page] || <div style={{ padding: "50px", textAlign: "center" }}>Loading adventure...</div>}
      </div>
    </div>
  );
}

export default App;