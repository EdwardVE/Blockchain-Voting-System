import React from "react";
const CardVoting = ({ candidate, showVoteButton, onVote }) => {
    return (
        <div style={styles.card}>
            <img src={`https://i.pravatar.cc/150?u=${candidate.txId}`} alt="Candidato" style={styles.image} />
            <h3 style={styles.name}>{candidate.name}</h3>
            <p style={styles.txId}>Tx: {candidate.txId}</p>
            {showVoteButton && (
                <button 
                    style={styles.button} 
                    onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
                    onMouseOut={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
                    onClick={() => onVote(candidate.name)}
                >
                    Votar
                </button>
            )}
        </div>
    );
};
const styles = {
    card: {
        backgroundColor: "#fff",
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "16px",
        marginBottom: "10px",
        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        width: "200px",
    },
    image: {
        width: "100px",
        height: "100px",
        borderRadius: "5%",
        objectFit: "cover",
        marginBottom: "8px",
    },
    name: {
        margin: "0",
        color: "#333",
        fontWeight: "bold",
        fontSize: "16px",
    },
    txId: {
        fontSize: "12px",
        color: "#777",
        wordBreak: "break-all",
    },
    button: {
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        padding: "8px 12px",
        borderRadius: "5px",
        cursor: "pointer",
        marginTop: "10px",
    },
    buttonHover: {
        backgroundColor: "#0056b3",
    }
};

export default CardVoting;
