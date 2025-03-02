// Registro de Candidatos 🏅

// Un formulario en CandidateRegistration.jsx para ingresar candidatos.
// También puedes usar Algorand para registrar candidatos on-chain.
import React, { useState } from "react";
import { registerCandidate, getAllTransactionNotes } from "../services/algorandService";

const CandidateRegistration = () => {
    const [name, setName] = useState("");
    const [candidates, setCandidates] = useState([]);

    const handleAddCandidate = async () => {
        const TransactionNotes = await getAllTransactionNotes();
        console.log(TransactionNotes);
        if (name.trim() === "") return;

        const txId = await registerCandidate(name); // Guarda en Algorand

        if (txId) {
            setCandidates([...candidates, { id: txId, name }]);
            setName(""); // Limpiar el input
        } else {
            alert("Error al registrar el candidato.");
        }
    };

    return (
        <div>
            <h2>Registro de Candidatos</h2>
            <input
                type="text"
                placeholder="Nombre del candidato"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button onClick={handleAddCandidate}>Agregar</button>

            <h3>Candidatos Registrados:</h3>
            <ul>
                {candidates.map((candidate) => (
                    <li key={candidate.id}>{candidate.name} (Tx: {candidate.id})</li>
                ))}
            </ul>
        </div>
    );
};

export default CandidateRegistration;
