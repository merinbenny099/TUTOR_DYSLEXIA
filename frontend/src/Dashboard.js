// Dashboard.js
import React from "react";

const Dashboard = ({ user, onSelectSubject, onLogout }) => {
  const subjects = Object.keys(user.progress ? user.progress : { Science: 0, Math: 0, English: 0 });
  // Or just hardcode:
  const allSubjects = ["Science", "Math", "English"];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome, {user.name}</h1>
      <button onClick={onLogout}>Logout</button>

      <h2>Select Subject:</h2>
      {allSubjects.map((subject) => (
        <button
          key={subject}
          onClick={() => onSelectSubject(subject)}
          style={{ margin: "5px", padding: "10px 20px" }}
        >
          {subject}
        </button>
      ))}
    </div>
  );
};

export default Dashboard;