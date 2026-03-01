// Lesson.js
import React from "react";
import LessonView from "./LessonView";

const Lesson = ({ chapter, onBack, onStartFlashcards, onStartQuiz }) => {
  if (!chapter) return <div>Loading lesson...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={onBack} style={{ marginBottom: "20px" }}>← Back</button>

      <LessonView
        title={chapter.title}
        content={chapter.text}
        imageUrl={chapter.imageUrl}
      />

      <div style={{ marginTop: "30px" }}>
        {chapter.flashcards?.length > 0 && (
          <button
            onClick={onStartFlashcards}
            style={{ marginRight: "10px", padding: "10px 20px" }}
          >
            Go to Flashcards
          </button>
        )}

        {chapter.test?.length > 0 && (
          <button
            onClick={onStartQuiz}
            style={{ padding: "10px 20px" }}
          >
            Take Quiz
          </button>
        )}
      </div>
    </div>
  );
};

export default Lesson;