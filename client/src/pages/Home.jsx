import React from "react";

const Home = () => {
    const styles = {
        container: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "40px 20px",
            backgroundColor: "#f4f4f4",
            minHeight: "100vh",
        },
        title: {
            fontSize: "28px",
            color: "#333",
            fontWeight: "bold",
            marginBottom: "10px",
        },
        description: {
            fontSize: "16px",
            color: "#555",
            maxWidth: "600px",
            lineHeight: "1.6",
            marginBottom: "20px",
        },
        image: {
            width: "100%",
            maxWidth: "600px",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            marginBottom: "20px",
        },
        button: {
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
            textDecoration: "none",
            display: "inline-block",
            marginTop: "10px",
        },
        buttonHover: {
            backgroundColor: "#0056b3",
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>🗳️ Bienvenido al sistema de votación en Algorand</h2>
            {/* https://img.freepik.com/free-vector/elections-voting-concept-icons-set-with-online-voting-symbols-isometric-isolated_1284-31873.jpg?t=st=1740896056~exp=1740899656~hmac=5617b698de1d944de122e1199db725e2e106778dd0477030149504e3099749c4&w=740 */}
            <img 
                src="https://as1.ftcdn.net/v2/jpg/10/18/18/82/1000_F_1018188283_vJkTaUmVRLZvgsmEBQxFa4U0SkMDE5hD.jpg"
                 
                alt="Sistema de votación en Blockchain" 
                style={styles.image} 
            />
            <p style={styles.description}>
                Este sistema aprovecha la tecnología de Algorand para proporcionar una votación 
                segura, transparente y descentralizada. Aquí podrás registrar candidatos, votar 
                y verificar los resultados en la blockchain de Algorand.
            </p>
            <p style={styles.description}>
                La blockchain garantiza que cada voto sea inmutable, sin posibilidad de fraude 
                ni alteraciones, asegurando una elección justa y confiable.
            </p>
            <a 
                href="/voting" 
                style={styles.button} 
                onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
                onMouseOut={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
            >
                Ir a la Votación
            </a>
        </div>
    );
};

export default Home;
