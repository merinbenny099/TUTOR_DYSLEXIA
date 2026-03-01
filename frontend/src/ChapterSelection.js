// ChapterSelection.js
import React from "react";
import { lessonsData } from "./lessonsData";

const ChapterSelection = ({ subject, onSelectChapter, onBack }) => {
  const chapters = lessonsData[subject]; // <-- This must match "Math", "English", "Science"

  if (!chapters) return <div>No chapters found for {subject}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={onBack} style={{ marginBottom: "20px" }}>← Back</button>
      <h2>{subject} Chapters</h2>
      {chapters.map((chapter) => (
        <div key={chapter.id} style={{ margin: "10px 0" }}>
          <button onClick={() => onSelectChapter(chapter)} style={{ padding: "10px 20px" }}>
            {chapter.title}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ChapterSelection;