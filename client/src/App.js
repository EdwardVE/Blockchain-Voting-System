import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Voting from "./pages/Voting";
import Results from "./pages/Results";
import CandidateRegistration from "./pages/CandidateRegistration";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>🗳️ Sistema de Votación en Algorand</h1>
        <nav>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/register">Registrar Candidatos</Link></li>
            <li><Link to="/voting">Votar</Link></li>
            <li><Link to="/results">Resultados</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<CandidateRegistration />} />
          <Route path="/voting" element={<Voting />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
