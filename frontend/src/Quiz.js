import React, { useState } from "react";

const Quiz = ({ questions, onFinish, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);

  if (!questions || questions.length === 0) return <div>No questions available</div>;

  const currentQuestion = questions[currentStep];

  const handleAnswer = (selected) => {
    const isCorrect = selected === currentQuestion.answer;
    if (isCorrect) setScore((prev) => prev + 1);

    if (currentStep + 1 < questions.length) setCurrentStep((prev) => prev + 1);
    else onFinish(score + (isCorrect ? 1 : 0));
  };

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={onBack} style={{ marginBottom: "20px" }}>← Back</button>
      <h2>{currentQuestion.question}</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        {currentQuestion.options.map((opt, i) => (
          <button 
            key={i} 
            onClick={() => handleAnswer(opt)}
            style={{ padding: "10px 20px", fontWeight: "bold", backgroundColor: "#2d3436", color: "white", border: "none", borderRadius: "8px" }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;