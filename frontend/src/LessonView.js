import React from "react";
import { Theme } from "./Theme";

const LessonView = ({ chapter, onBack, onStartQuiz, onStartFlashcards }) => {
  if (!chapter) return null;
  return (
    
    <div style={{ 
      maxWidth: "900px", 
      margin: "0 auto", 
      padding: "40px", 
      fontFamily: Theme.fontFamily,
      backgroundColor: Theme.background,
      minHeight: "100vh"
    }}>
      {/* 1. BACK BUTTON - Simple & Clean */}
      <button 
        onClick={onBack} 
        style={{ 
          fontSize: "20px", 
          color: Theme.accent, 
          border: "none", 
          background: "none", 
          cursor: "pointer", 
          marginBottom: "30px",
          fontWeight: "bold"
        }}
      >
        ← Back to Dashboard
      </button>

      {/* 2. CONTENT CARD */}
      <div style={{ 
        backgroundColor: "white", 
        padding: "50px", 
        borderRadius: Theme.borderRadius, 
        boxShadow: Theme.cardShadow,
        border: "1px solid #E2E8F0"
      }}>
        <h1 style={{ fontSize: Theme.fontSize.header, color: Theme.textMain, marginBottom: "25px" }}>
          {chapter.title}
        </h1>

        <img 
          src={chapter.imageUrl} 
          alt={chapter.title} 
          style={{ width: "100%", borderRadius: "12px", marginBottom: "35px", objectFit: "cover", maxHeight: "400px" }} 
        />

        {/* 3. DYSLEXIA FRIENDLY TEXT BLOCK */}
        <div style={{ 
          fontSize: Theme.fontSize.base, 
          lineHeight: Theme.lineHeight, 
          color: Theme.textMain,
          letterSpacing: "0.5px",
          textAlign: "left"
        }}>
          {/* Automatically breaks long text into clean paragraphs */}
          {chapter.text.split('. ').map((sentence, i) => (
            <p key={i} style={{ marginBottom: "25px" }}>{sentence}.</p>
          ))}
        </div>

        {/* 4. ACTION BUTTONS - Combined Styles to avoid warnings */}
        <div style={{ display: "flex", gap: "20px", marginTop: "40px" }}>
          <button 
            onClick={onStartFlashcards} 
            style={{
              flex: 1,
              padding: "20px",
              fontSize: "22px",
              borderRadius: "12px",
              border: `3px solid ${Theme.accent}`,
              backgroundColor: "white",
              color: Theme.accent,
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            🗂 Practice Cards
          </button>

          <button 
            onClick={onStartQuiz} 
            style={{
              flex: 1,
              padding: "20px",
              fontSize: "22px",
              borderRadius: "12px",
              border: "none",
              backgroundColor: Theme.success,
              color: "white",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            ✍️ Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonView;