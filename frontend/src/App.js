// src/App.js
import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import ChapterSelection from "./ChapterSelection";
import Lesson from "./Lesson";
import Flashcards from "./Flashcards";
import Quiz from "./Quiz";
import Auth from "./Auth";


function App() {
  return <AppContent />;
}

function AppContent() {
  const [user, setUser] = useState(null);
  const [subject, setSubject] = useState(null);
  const [chapterData, setChapterData] = useState(null); // Store selected chapter
  const [page, setPage] = useState("dashboard"); // "dashboard" | "lesson" | "flashcards" | "quiz"

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Handle login
  const handleLogin = (userData) => {
    const newUser = {
      ...userData,
      progress: userData.progress || 0,
      completedChapters: userData.completedChapters || [],
    };
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
    setPage("dashboard");
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setSubject(null);
    setChapterData(null);
    setPage("dashboard");
  };

  // Handle lesson/quiz completion
  const handleComplete = (score) => {
    // Here you can add logic to track completion, update user progress, etc.
    alert(`You scored ${score} on this quiz!`);
  };

  // --- Screens ---

  if (!user) return <Auth onLogin={handleLogin} />;

  if (page === "dashboard") {
    return (
      <Dashboard
        user={user}
        onSelectSubject={(subj) => {
          setSubject(subj);
          setPage("chapterSelection");
        }}
        onLogout={handleLogout}
      />
    );
  }

  if (page === "chapterSelection") {
    return (
      <ChapterSelection
        subject={subject}
        onSelectChapter={(ch) => {
          setChapterData(ch);
          setPage("lesson");
        }}
        onBack={() => setPage("dashboard")}
      />
    );
  }

  if (page === "lesson") {
    return (
      <Lesson
        chapter={chapterData}
        onBack={() => setPage("chapterSelection")}
        onStartFlashcards={() => setPage("flashcards")}
        onStartQuiz={() => setPage("quiz")}
      />
    );
  }

  if (page === "flashcards") {
    return (
      <Flashcards
        flashcards={chapterData.flashcards}
        onBack={() => setPage("lesson")}
      />
    );
  }

  if (page === "quiz") {
    return (
      <Quiz
        questions={chapterData.test}
        onFinish={(score) => {
          handleComplete(score);
          setPage("lesson");
        }}
      />
    );
  }

  return <div>Unknown page</div>;
}

export default App;