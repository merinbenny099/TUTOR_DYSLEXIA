import React, { useState } from "react";
import { Theme } from "./Theme";

const Auth = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleAuth = (e) => {
    e.preventDefault();
    setError("");

    const cleanUsername = username.trim();

    if (password.length !== 6 || isNaN(password)) {
      setError("PIN must be exactly 6 numbers.");
      return;
    }

    const allUsers = JSON.parse(localStorage.getItem("tutor_users") || "{}");

    if (isRegistering) {
      if (allUsers[cleanUsername]) {
        setError("That name is taken! Try another one.");
      } else {
        const newUser = { 
          username: cleanUsername, 
          password, 
          progress: { Science: {}, Math: {}, English: {} } 
        };
        allUsers[cleanUsername] = newUser;
        localStorage.setItem("tutor_users", JSON.stringify(allUsers));
        onLogin(newUser);
      }
    } else {
      const user = allUsers[cleanUsername];
      if (user && user.password === password) {
        onLogin(user);
      } else {
        setError("Oops! Wrong name or PIN. Try again!");
      }
    }
  };

  return (
    <div style={{ 
      height: "100vh", display: "flex", justifyContent: "center", 
      alignItems: "center", backgroundColor: Theme.background,
      fontFamily: Theme.fontFamily, padding: "20px"
    }}>
      <div style={{ 
        display: "flex", backgroundColor: "white", borderRadius: Theme.borderRadius, 
        boxShadow: Theme.cardShadow, width: "100%", maxWidth: "900px", overflow: "hidden",
        flexDirection: "row", border: "1px solid #e2e8f0"
      }}>
        
        {/* LEFT PANEL: WELCOME */}
        <div style={{ 
          flex: 1, backgroundColor: "#EBF4FF", padding: "40px", 
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          textAlign: "center"
        }}>
          <img 
            src="https://illustrations.popsy.co/blue/studying-from-home.svg" 
            alt="Welcome" 
            style={{ width: "100%", maxWidth: "250px", marginBottom: "20px" }}
          />
          <h1 style={{ color: "#2c3e50", fontSize: "32px", marginBottom: "10px" }}>Hi there! 👋</h1>
          <p style={{ color: "#7f8c8d", fontSize: "18px" }}>Ready to earn some stars today?</p>
        </div>

        {/* RIGHT PANEL: FORM */}
        <form onSubmit={handleAuth} style={{ flex: 1, padding: "50px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h2 style={{ color: "#2c3e50", fontSize: "36px", marginBottom: "30px", textAlign: "center" }}>
            {isRegistering ? "Join the Club" : "Student Login"}
          </h2>
          
          {error && (
            <div style={{ 
              backgroundColor: "#fee2e2", color: "#e74c3c", padding: "12px", 
              borderRadius: "12px", marginBottom: "20px", textAlign: "center", fontWeight: "bold" 
            }}>
              {error}
            </div>
          )}

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", fontSize: "18px" }}>Username</label>
            <input 
              type="text" placeholder="Your Name" value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ width: "100%", padding: "18px", borderRadius: "15px", border: "3px solid #E2E8F0", fontSize: "20px", outline: "none", boxSizing: "border-box" }}
              required
            />
          </div>

          <div style={{ marginBottom: "30px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", fontSize: "18px" }}>6-Digit PIN</label>
            <input 
              type="password" placeholder="● ● ● ● ● ●" value={password} maxLength={6}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", padding: "18px", borderRadius: "15px", border: "3px solid #E2E8F0", fontSize: "20px", outline: "none", letterSpacing: "5px", boxSizing: "border-box" }}
              required
            />
          </div>

          <button type="submit" style={{ 
            width: "100%", padding: "20px", backgroundColor: "#2ecc71", 
            color: "white", border: "none", borderRadius: "50px", fontSize: "22px", 
            fontWeight: "bold", cursor: "pointer", boxShadow: "0 6px 0 #27ae60"
          }}>
            {isRegistering ? "Create Account! 🚀" : "Let's Go! →"}
          </button>

          <p onClick={() => setIsRegistering(!isRegistering)} style={{ marginTop: "25px", color: "#3498db", cursor: "pointer", fontSize: "18px", textAlign: "center", textDecoration: "underline" }}>
            {isRegistering ? "I already have an account" : "I'm a new student!"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Auth;