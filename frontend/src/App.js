import React, { useState } from "react";
import Welcome from "./Welcome";
import Login from "./Login";
import CreateUser from "./CreateUser";
import Dashboard from "./Dashboard";
import Lesson from "./Lesson";
import "./App.css";

function App() {
  const [view, setView] = useState("welcome");
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState({});
  const [selectedSubject, setSelectedSubject] = useState(null);

  const handleCreateUser = (userData) => {
    setUsers(prev => ({
      ...prev,
      [userData.username]: {
        username: userData.username,
        level: 1,
        xp: 0,
        totalPoints: 0,
        completedLessons: {
          Science: [],
          Math: [],
          English: [],
          GK: []
        }
      }
    }));
    setCurrentUser(userData.username);
    alert(`User ${userData.username} created!`);
    setView("dashboard");
  };

  const handleLogin = (username) => {
    if (!users[username]) {
      alert("User not found! Please create an account.");
      return;
    }
    setCurrentUser(username);
    setView("dashboard");
  };

  return (
    <div>
      {view === "welcome" && <Welcome onCreate={() => setView("createUser")} onLogin={() => setView("login")} />}
      {view === "login" && <Login onSuccess={handleLogin} onBack={() => setView("welcome")} />}
      {view === "createUser" && <CreateUser onCreate={handleCreateUser} onBack={() => setView("welcome")} />}
      {view === "dashboard" && (
        <Dashboard
          currentUserData={users[currentUser]}
          onStartLesson={(subject) => {
            setSelectedSubject(subject);
            setView("lesson");
          }}
          onBack={() => setView("welcome")}
        />
      )}
      {view === "lesson" && (
        <Lesson
          selectedSubject={selectedSubject}
          currentUserData={users[currentUser]}
          onBack={() => setView("dashboard")}
        />
      )}
    </div>
  );
}

export default App;
