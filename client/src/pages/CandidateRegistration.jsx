import React, { useEffect, useState } from "react";
import { registerCandidate, getAllTransactionNotes } from "../services/algorandService";
import Card from "../components/Card";

const CandidateRegistration = () => {
    const [name, setName] = useState("");
    const [candidates, setCandidates] = useState([]);
    const [refreshTrigger, setRefreshTrigger] = useState(0); // Para forzar actualización
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Cargar candidatos al iniciar y cuando se agregue uno nuevo
    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                setLoading(true);
                const storedCandidates = await getAllTransactionNotes(); 
                setCandidates(storedCandidates);
            } catch (err) {
                setError("Error al obtener candidatos");
            } finally {
                setLoading(false);
            }
        };
        fetchCandidates();
    }, [refreshTrigger]); // Se ejecuta cada vez que cambia refreshTrigger

    const handleAddCandidate = async () => {
        if (name.trim() === "") return;
    
        try {
            setLoading(true);
            const txId = await registerCandidate(name);
    
            if (txId) {
                const newCandidate = { txId, name };
                setCandidates(prevCandidates => [...prevCandidates, newCandidate]);
                setName("");
                setRefreshTrigger(prev => prev + 1);
            } else {
                setError("Error al registrar el candidato.");
            }
        } catch (err) {
            setError("Error en la transacción.");
        } finally {
            setLoading(false);
            window.location.reload();
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>🏆 Registro de Candidatos</h2>

            <div style={styles.formContainer}>
                <input
                    type="text"
                    placeholder="Nombre del candidato"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                    style={styles.input}
                />
                <button 
                    onClick={handleAddCandidate} 
                    disabled={name.trim() === "" || loading} 
                    style={{ 
                        ...styles.button, 
                        backgroundColor: loading ? "#ccc" : "#28a745"
                    }}
                >
                    {loading ? "Registrando..." : "Agregar"}
                </button>
            </div>

            {error && <p style={styles.error}>{error}</p>}

            <h3 style={styles.subtitle}>📋 Candidatos Registrados:</h3>
            {loading ? (
                <p style={styles.loadingText}>Cargando candidatos...</p>
            ) : (
                <div style={styles.cardContainer}>
                    {candidates.length === 0 ? (
                        <p style={styles.noCandidates}>Aún no hay candidatos registrados.</p>
                    ) : (
                        candidates.map((candidate) => (
                            <Card key={candidate.txId} txId={candidate.txId} name={candidate.name} />
                        ))
                    )}
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
    subtitle: {
        fontSize: "22px",
        color: "#555",
        marginTop: "20px",
    },
    formContainer: {
        display: "flex",
        gap: "10px",
        marginBottom: "20px",
    },
    input: {
        padding: "10px",
        fontSize: "16px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        outline: "none",
    },
    button: {
        padding: "10px 20px",
        fontSize: "16px",
        color: "#fff",
        borderRadius: "5px",
        border: "none",
        cursor: "pointer",
        transition: "0.3s",
    },
    error: {
        color: "red",
        fontSize: "14px",
        marginTop: "-10px",
    },
    loadingText: {
        fontSize: "16px",
        color: "#777",
    },
    noCandidates: {
        fontSize: "16px",
        fontStyle: "italic",
        color: "#777",
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

export default CandidateRegistration;
