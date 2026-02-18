import React, { useState } from "react";
import { lessonsData } from "./lessonsData";

function Lesson({ selectedSubject, currentUserData, onBack }) {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [currentTab, setCurrentTab] = useState("read");
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);

  const lesson = lessonsData[selectedSubject][currentLessonIndex];

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const submitTest = () => {
    let correct = 0;
    lesson.test.forEach((q, idx) => {
      if (userAnswers[idx] === q.answer) correct++;
    });
    setScore(correct);

    if (currentUserData) {
      const xpEarned = correct;
      currentUserData.xp += xpEarned;
      currentUserData.level = 1 + Math.floor(currentUserData.xp / 100);

      const completed = currentUserData.completedLessons[selectedSubject] || [];
      if (!completed.includes(lesson.id)) completed.push(lesson.id);
      currentUserData.completedLessons[selectedSubject] = completed;

      alert(`Test Completed! Score: ${correct}/${lesson.test.length}, XP Earned: ${xpEarned}`);
    }
  };

  const nextDisabled = !currentUserData.completedLessons[selectedSubject]?.includes(lesson.id);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>{selectedSubject} - {lesson.title}</h2>

      {/* Tabs */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setCurrentTab("read")}>Read</button>
        <button onClick={() => setCurrentTab("flashcards")}>Flashcards</button>
        <button onClick={() => setCurrentTab("test")}>Test</button>
      </div>

      {/* Tab Content */}
      {currentTab === "read" && (
        <div>
          <p>{lesson.text}</p>
          <button onClick={() => speakText(lesson.text)}>🔊 Read Aloud</button>
        </div>
      )}

      {currentTab === "flashcards" && (
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
          {lesson.flashcards.map((card, idx) => (
            <div key={idx} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "10px" }}>
              <img src={card.img} alt={card.word} width={100} />
              <p>{card.word}</p>
              <button onClick={() => speakText(card.word)}>🔊</button>
            </div>
          ))}
        </div>
      )}

      {currentTab === "test" && (
        <div>
          {score === null ? (
            lesson.test.map((q, idx) => (
              <div key={idx} style={{ marginBottom: "15px", textAlign: "left" }}>
                <p>{idx + 1}. {q.question}</p>
                {q.options.map((opt) => (
                  <label key={opt} style={{ display: "block" }}>
                    <input
                      type="radio"
                      name={`question-${idx}`}
                      value={opt}
                      checked={userAnswers[idx] === opt}
                      onChange={() => setUserAnswers({ ...userAnswers, [idx]: opt })}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            ))
          ) : (
            <h3>Your Score: {score} / {lesson.test.length}</h3>
          )}
          {score === null && lesson.test.length > 0 && (
            <button onClick={submitTest}>Submit Test</button>
          )}
        </div>
      )}

      {/* Navigation */}
      <div style={{ marginTop: "30px" }}>
        {currentLessonIndex > 0 && <button onClick={() => setCurrentLessonIndex(currentLessonIndex - 1)}>Previous Lesson</button>}
        {currentLessonIndex < lessonsData[selectedSubject].length - 1 && (
          <button onClick={() => setCurrentLessonIndex(currentLessonIndex + 1)} disabled={nextDisabled}>
            Next Lesson
          </button>
        )}
      </div>

      <button style={{ marginTop: "20px" }} onClick={onBack}>Back to Dashboard</button>
    </div>
  );
}

export default Lesson;
