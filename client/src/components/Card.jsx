import React from "react";

const Card = ({ txId, name }) => {
    return (
        <div style={styles.card}>
            <img src={`https://i.pravatar.cc/150?u=${txId}`} alt={name} style={styles.image} />
            <h4 style={styles.name}>{name}</h4>
            <p style={styles.txId}>Tx: {txId}</p>
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
};

export default Card;
