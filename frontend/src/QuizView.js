import React, { useState } from "react";
import { Theme } from "./Theme";

const QuizView = ({ questions, onFinish }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (selectedOption) => {
    // Check if the answer is correct (supports both index or string matching)
    const currentQuestion = questions[currentIdx];
    const isCorrect = selectedOption === currentQuestion.answer || 
                      selectedOption === currentQuestion.options[currentQuestion.correct];

    if (isCorrect) setScore(prev => prev + 1);

    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    const passed = score >= 7;
    return (
      <div style={{ textAlign: "center", padding: "60px", fontFamily: Theme.fontFamily }}>
        <h1 style={{ fontSize: "48px", color: passed ? Theme.success : Theme.textMain }}>
          {passed ? "🌟 Amazing!" : "📚 Good Effort!"}
        </h1>
        <p style={{ fontSize: "24px", margin: "20px 0", color: Theme.textMuted }}>
          You scored {score} out of 10
        </p>
        <button 
          onClick={() => onFinish(score)}
          style={{
            padding: "20px 50px", fontSize: "22px", backgroundColor: Theme.accent,
            color: "white", border: "none", borderRadius: "50px", cursor: "pointer", fontWeight: "bold"
          }}
        >
          {passed ? "Get My Star! →" : "Try Lesson Again"}
        </button>
      </div>
    );
  }

  const q = questions[currentIdx];

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "40px", fontFamily: Theme.fontFamily }}>
      <div style={{ marginBottom: "20px", fontSize: "18px", color: Theme.textMuted, fontWeight: "bold" }}>
        QUESTION {currentIdx + 1} OF {questions.length}
      </div>

      <div style={{ 
        backgroundColor: "#1E293B", color: "white", padding: "40px", 
        borderRadius: "20px", marginBottom: "30px", fontSize: "26px", lineHeight: "1.4"
      }}>
        {q.question}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(opt)}
            style={{
              padding: "20px 30px", fontSize: "20px", textAlign: "left",
              backgroundColor: "white", border: "3px solid #E2E8F0",
              borderRadius: "15px", cursor: "pointer", color: Theme.textMain,
              display: "flex", alignItems: "center"
            }}
          >
            <span style={{ marginRight: "15px", color: Theme.accent, fontWeight: "bold" }}>
              {String.fromCharCode(65 + i)}.
            </span>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizView;