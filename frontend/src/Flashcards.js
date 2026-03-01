import React, { useState } from "react";

const Flashcards = ({ flashcards, onBack }) => {
  const [current, setCurrent] = useState(0);
  const [showWord, setShowWord] = useState(true);

  if (!flashcards || flashcards.length === 0) return <div>No flashcards available</div>;

  const card = flashcards[current];

  const nextCard = () => {
    setCurrent((prev) => (prev + 1) % flashcards.length);
    setShowWord(true);
  };

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={onBack} style={{ marginBottom: "20px" }}>← Back</button>

      <div style={{ textAlign: "center", padding: "20px", border: "1px solid #dfe6e9", borderRadius: "10px" }}>
        {showWord ? <h2>{card.word}</h2> : <img src={card.img} alt={card.word} style={{ maxWidth: "300px" }} />}
        <button 
          onClick={() => setShowWord(!showWord)}
          style={{ marginTop: "20px", padding: "10px 20px", fontWeight: "bold", backgroundColor: "#2d3436", color: "white", border: "none", borderRadius: "8px" }}
        >
          Flip
        </button>
        <button 
          onClick={nextCard}
          style={{ marginTop: "20px", marginLeft: "10px", padding: "10px 20px", fontWeight: "bold", backgroundColor: "#2d3436", color: "white", border: "none", borderRadius: "8px" }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Flashcards;