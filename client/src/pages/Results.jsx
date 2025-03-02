import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
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

                setResults(rawVotes);
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
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={results} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Bar dataKey="votes" fill="#4CAF50" barSize={60} />
                    </BarChart>
                </ResponsiveContainer>
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
        maxWidth: "600px",
        margin: "auto",
    },
};

export default Results;
