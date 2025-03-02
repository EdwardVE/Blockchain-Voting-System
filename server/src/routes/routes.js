const express = require("express");
const { registerCandidate, voteForCandidate, getElectionResults } = require("../services/algorandService");

const router = express.Router();

// Ruta para registrar un candidato
router.post("/register-candidate", async (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Nombre del candidato requerido" });

    const txId = await registerCandidate(name);
    if (txId) {
        res.status(201).json({ message: "Candidato registrado", txId });
    } else {
        res.status(500).json({ error: "Error registrando candidato" });
    }
});

// Ruta para votar por un candidato
router.post("/vote", async (req, res) => {
    const { candidateId } = req.body;
    if (!candidateId) return res.status(400).json({ error: "ID del candidato requerido" });

    const txId = await voteForCandidate(candidateId);
    if (txId) {
        res.status(201).json({ message: "Voto registrado", txId });
    } else {
        res.status(500).json({ error: "Error al votar" });
    }
});

// Ruta para obtener los resultados de la votación
router.get("/results", async (req, res) => {
    const results = await getElectionResults();
    res.json(results);
});

module.exports = router;
