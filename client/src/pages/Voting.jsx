// Creación de Votación 🗳️

// Voting.jsx debe mostrar los candidatos registrados.
// Un botón para emitir el voto, enviando la transacción a Algorand.
import React, { useEffect, useState } from "react";
import algorandService from "../services/algorandService";

const Voting = () => {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(false);

    // Cargar candidatos (puede ser desde la blockchain o estado local)
    useEffect(() => {
        const loadCandidates = async () => {
            // Aquí podríamos obtener candidatos desde Algorand, pero por simplicidad los simulamos
            const storedCandidates = JSON.parse(localStorage.getItem("candidates")) || [];
            setCandidates(storedCandidates);
        };

        loadCandidates();
    }, []);

    // Función para votar por un candidato
    const handleVote = async (candidateName) => {
        setLoading(true);
        try {
            const txId = await algorandService.voteForCandidate(candidateName);
            if (txId) {
                alert(`Voto registrado con éxito (Tx ID: ${txId})`);
            } else {
                alert("Error al registrar el voto.");
            }
        } catch (error) {
            console.error("Error al votar:", error);
            alert("Hubo un problema al emitir el voto.");
        }
        setLoading(false);
    };

    return (
        <div className="container">
            <h2>🗳️ Votación</h2>
            {candidates.length === 0 ? (
                <p>No hay candidatos registrados.</p>
            ) : (
                <ul>
                    {candidates.map((candidate, index) => (
                        <li key={index}>
                            {candidate.name}
                            <button 
                                onClick={() => handleVote(candidate.name)} 
                                disabled={loading}
                            >
                                {loading ? "Enviando voto..." : "Votar"}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Voting;
