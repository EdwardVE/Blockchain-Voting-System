import React, { useEffect, useState } from "react";
import algorandService from "../services/algorandService";

const Results = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const rawVotes = await algorandService.getElectionResults();
                const voteCount = {};
                
                rawVotes.forEach(vote => {
                    const formattedName = vote.name.trim().toLowerCase();
                    voteCount[formattedName] = (voteCount[formattedName] || 0) + 1;
                });
                
                const formattedResults = Object.keys(voteCount).map(name => ({
                    name: name.replace(/\b\w/g, char => char.toUpperCase()), // Capitaliza nombres
                    votes: voteCount[name]
                }));
                
                setResults(formattedResults);
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
