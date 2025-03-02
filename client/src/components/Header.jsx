import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header style={styles.header}>
            <h1 style={styles.title}>Sistema de Votación Blockchain 🗳️</h1>
            <nav>
                <ul style={styles.navList}>
                    <li><Link to="/" style={styles.link}>Inicio</Link></li>
                    <li><Link to="/register" style={styles.link}>Registro de Candidatos</Link></li>
                    <li><Link to="/voting" style={styles.link}>Votaaación</Link></li>
                    <li><Link to="/results" style={styles.link}>Resultados</Link></li>
                </ul>
            </nav>
        </header>
    );
};

const styles = {
    header: {
        backgroundColor: "#1E1E2F",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        margin: "10px",
    },
    title: {
        margin: 0,
        fontSize: "22px",
        fontWeight: "bold",
        color: "#fff",
    },
    navList: {
        listStyle: "none",
        display: "flex",
        gap: "20px",
        padding: 0,
        margin: 0,
    },
    link: {
        color: "white",
        textDecoration: "none",
        fontWeight: "bold",
        padding: "8px 15px",
        borderRadius: "5px",
        transition: "background 0.3s ease, transform 0.2s",
    },
    linkHover: {
        backgroundColor: "#ff5733",
        transform: "scale(1.05)",
    }
};

export default Header;
