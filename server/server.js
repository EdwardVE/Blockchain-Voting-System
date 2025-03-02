import express from "express";
import cors from "cors";
import algosdk from "algosdk";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Configurar Algorand Client
const ALGOD_TOKEN = "";  // TestNet no necesita token
const ALGOD_SERVER = "https://testnet-api.algonode.cloud";
const ALGOD_PORT = "";  // No se necesita puerto
const ADMIN_MNEMONIC = "curve group police grunt eyebrow goose wire maid spatial garlic pair payment stereo system pull able mouse nurse rotate fiction hurry tail fork able remove";

const algodClient = new algosdk.Algodv2(ALGOD_TOKEN, ALGOD_SERVER, ALGOD_PORT);

// Recuperar cuenta del administrador
const adminAccount = algosdk.mnemonicToSecretKey(ADMIN_MNEMONIC);

app.post("/sign-transaction", async (req, res) => {
    try {
        console.log("🔐 Firmando transacción en el backend...");

        const txnEncoded = req.body.txn;
        const txn = algosdk.decodeUnsignedTransaction(new Uint8Array(Buffer.from(txnEncoded, "base64")));

        const signedTxn = txn.signTxn(adminAccount.sk);
        const { txId } = await algodClient.sendRawTransaction(signedTxn).do();

        console.log("✅ Transacción enviada:", txId);
        res.json({ txId });
    } catch (error) {
        console.error("❌ Error en el backend:", error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(5000, () => console.log("🚀 Backend corriendo en http://localhost:5000"));
