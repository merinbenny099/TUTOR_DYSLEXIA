// src/LessonView.js
import React, { useState } from "react";

const LessonView = ({ title, content, imageUrl }) => {
  const [isReading, setIsReading] = useState(false);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9; 
    utterance.onstart = () => setIsReading(true);
    utterance.onend = () => setIsReading(false);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1>{title}</h1>
      {imageUrl && <img src={imageUrl} alt="Visual Aid" style={{ width: "100%", borderRadius: "10px" }} />}
      <div style={{ margin: "20px 0", lineHeight: 1.8 }}>
        <p>{content}</p>
      </div>
      <button 
        onClick={() => speak(content)} 
        disabled={isReading}
        style={{ backgroundColor: "#4CAF50", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px" }}
      >
        {isReading ? "Reading..." : "🔊 Read Lesson Aloud"}
      </button>
    </div>
  );
};

export default LessonView;