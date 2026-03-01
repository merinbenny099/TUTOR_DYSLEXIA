import React, { createContext, useContext, useState } from "react";
const LevelProgressContext = createContext();

export const LevelProgressProvider = ({ children }) => {
  // 1. Initialize progress by looking at the CURRENT user
  const [progress, setProgress] = useState(() => {
    const currentUser = JSON.parse(localStorage.getItem("current_user"));
    if (currentUser) {
      const allUsers = JSON.parse(localStorage.getItem("tutor_users") || "{}");
      // Return the specific progress for this username, or empty if new
      return allUsers[currentUser.username]?.progress || { Science: {}, Math: {}, English: {} };
    }
    return { Science: {}, Math: {}, English: {} };
  });

  // 2. This function saves the star to the correct user's slot
  const markModuleComplete = (subject, moduleId, score) => {
    const currentUser = JSON.parse(localStorage.getItem("current_user"));
    if (!currentUser) return;

    setProgress((prev) => {
      const newProgress = {
        ...prev,
        [subject]: { ...prev[subject], [moduleId]: score },
      };

      // UPDATE MASTER LIST: Save this user's new progress back to the database
      const allUsers = JSON.parse(localStorage.getItem("tutor_users") || "{}");
      if (allUsers[currentUser.username]) {
        allUsers[currentUser.username].progress = newProgress;
        localStorage.setItem("tutor_users", JSON.stringify(allUsers));
      }

      return newProgress;
    });
  };

  const isLevel2Unlocked = () => {
    const subjects = ["Science", "Math", "English"];
    let totalStars = 0;
    subjects.forEach((sub) => {
      const scores = Object.values(progress[sub] || {});
      totalStars += scores.filter((s) => s !== null && s >= 7).length;
    });
    return totalStars >= 15;
  };

  return (
    <LevelProgressContext.Provider value={{ progress, markModuleComplete, isLevel2Unlocked }}>
      {children}
    </LevelProgressContext.Provider>
  );
};

export const useLevelProgress = () => useContext(LevelProgressContext);