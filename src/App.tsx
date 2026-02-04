import { Routes, Route } from "react-router-dom";
import { Login, Quiz, Result } from "@/pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  );
}

export default App;
