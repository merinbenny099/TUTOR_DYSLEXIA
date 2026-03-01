import React, { createContext, useState, useContext } from 'react';
import { lessonsData } from './lessonsData';

// Create Context
const LevelProgressContext = createContext();

// Provider
export const LevelProgressProvider = ({ children }) => {
  // Structure: { Science: {1: score, 2: score, ...}, Math: {...}, English: {...} }
  const initialProgress = {};
  Object.keys(lessonsData).forEach(subject => {
    initialProgress[subject] = {};
    lessonsData[subject].forEach(lesson => {
      initialProgress[subject][lesson.id] = null; // null = not completed
    });
  });

  const [progress, setProgress] = useState(initialProgress);
  const [level2Unlocked, setLevel2Unlocked] = useState(false);

  const markModuleComplete = (subject, lessonId, score) => {
    setProgress(prev => {
      const updated = { ...prev, [subject]: { ...prev[subject], [lessonId]: score } };

      // Check if Level 2 can be unlocked
      const allSubjectsCompleted = Object.keys(updated).every(sub => {
        return Object.values(updated[sub]).every(s => s >= 7);
      });

      if (allSubjectsCompleted) setLevel2Unlocked(true);

      return updated;
    });
  };

  return (
    <LevelProgressContext.Provider value={{ progress, markModuleComplete, level2Unlocked }}>
      {children}
    </LevelProgressContext.Provider>
  );
};

// Hook for easy access
export const useLevelProgress = () => useContext(LevelProgressContext);