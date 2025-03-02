// Ver Resultados 📊

// Results.jsx debe mostrar cuántos votos ha recibido cada candidato.
// Puedes obtener los datos de Algorand


import React, { useEffect, useState } from "react";
import algosdk from "algosdk";
import algorandService from "../services/algorandService"; // Asegúrate de tener este servicio implementado

const Results = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const resultsFromAlgorand = await algorandService.getElectionResults();
                setResults(resultsFromAlgorand);
            } catch (error) {
                console.error("Error obteniendo resultados:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, []);

    return (
        <div style={styles.container}>
            <h2>📊 Resultados de la Votación</h2>
            {loading ? (
                <p>Cargando resultados...</p>
            ) : results.length > 0 ? (
                <ul style={styles.list}>
                    {results.map((candidate, index) => (
                        <li key={index} style={styles.item}>
                            {candidate.name}: {candidate.votes} votos 🗳️
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay resultados disponibles.</p>
            )}
        </div>
    );
};

const styles = {
    container: {
        textAlign: "center",
        padding: "20px",
    },
    list: {
        listStyleType: "none",
        padding: 0,
    },
    item: {
        fontSize: "18px",
        margin: "10px 0",
    },
};

export default Results;
