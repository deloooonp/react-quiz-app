import { useState } from "react";
import { useNavigate } from "react-router";

export default function Login() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleStart = () => {
    if (!username.trim()) return;

    localStorage.setItem("username", username);
    navigate("/quiz");
  };

  return (
    <div>
      <h1>Quiz App</h1>

      <input
        type="text"
        placeholder="Enter your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <button onClick={handleStart}>Start Quiz</button>
    </div>
  );
}
