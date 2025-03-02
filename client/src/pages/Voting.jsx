import React, { useEffect, useState } from "react";
import { getAllTransactionNotes, voteForCandidate } from "../services/algorandService";
import CardVoting from "../components/CardVoting";

const Voting = () => {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(false);

    // Cargar candidatos desde Algorand
    useEffect(() => {
        const loadCandidates = async () => {
            try {
                const storedCandidates = await getAllTransactionNotes();
                setCandidates(storedCandidates);
            } catch (error) {
                console.error("Error al obtener candidatos:", error);
            }
        };

        loadCandidates();
    }, []);

    // Función para votar por un candidato
    const handleVote = async (candidateName) => {
        setLoading(true);
        try {
            const txId = await voteForCandidate(candidateName);
            if (txId) {
                alert(`✅ Voto registrado con éxito (Tx ID: ${txId})`);
            } else {
                alert("❌ Error al registrar el voto.");
            }
        } catch (error) {
            console.error("Error al votar:", error);
            alert("⚠️ Hubo un problema al emitir el voto.");
        }
        setLoading(false);
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>🗳️ Votación</h2>
            {candidates.length === 0 ? (
                <p style={styles.noCandidates}>No hay candidatos registrados.</p>
            ) : (
                <div style={styles.cardContainer}>
                    {candidates.map((candidate) => (
                        <CardVoting 
                            key={candidate.txId} 
                            candidate={candidate} 
                            showVoteButton={!loading} 
                            onVote={handleVote} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "40px 20px",
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
    },
    title: {
        fontSize: "28px",
        color: "#333",
        fontWeight: "bold",
        marginBottom: "20px",
    },
    noCandidates: {
        fontSize: "18px",
        color: "#777",
        fontStyle: "italic",
    },
    cardContainer: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "15px",
        maxWidth: "1000px",
        width: "100%",
        justifyContent: "center",
        marginTop: "20px",
    },
};

export default Voting;
