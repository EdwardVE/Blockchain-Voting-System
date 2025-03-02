// Conectar con Algorand 🔗

// algorandService.js debe manejar la creación de una cuenta, enviar votos y obtener datos de la blockchain.
import algosdk from "algosdk";
import axios from "axios";

// Configuración de Algorand TestNet
const ALGOD_TOKEN = "";  // TestNet no necesita token
const ALGOD_SERVER = "https://testnet-api.algonode.cloud";
const ALGOD_PORT = "";  // No se necesita puerto

const algodClient = new algosdk.Algodv2(ALGOD_TOKEN, ALGOD_SERVER, ALGOD_PORT);

algodClient.status().do()
    .then(status => console.log("🚀 Conectado a Algorand TestNet:", status))
    .catch(error => console.error("❌ Error conectando a Algorand:", error));

// Cuenta de administrador (Usa una clave privada válida)
const ADMIN_MNEMONIC = "curve group police grunt eyebrow goose wire maid spatial garlic pair payment stereo system pull able mouse nurse rotate fiction hurry tail fork able remove";

const adminAccount = algosdk.mnemonicToSecretKey(ADMIN_MNEMONIC);
const election =  "Eleccion 1"
// const addressAdminAccount = algosdk.encodeAddress(adminAccount.addr.publicKey)

// Función para registrar un candidato en la blockchain
export const registerCandidate = async (candidateName) => {
    try {
        console.log("🔹 Registrando candidato:", candidateName);
        console.log("🔹 Dirección del admin (desde función):", adminAccount.addr);

        const params = await algodClient.getTransactionParams().do();

        const acctInfo = await algodClient.accountInformation(adminAccount.addr).do();
        console.log(`Account balance: ${acctInfo.amount} microAlgos`);

        const note = new TextEncoder().encode(`${election} - Candidato: ${candidateName}`);
        // from: "QDJH7QEBCU6QRHGJRYJPHEWU6HUMORBF32RL7GTAVDLLIZIMQ5VBHB2R7I",
        // to: "QDJH7QEBCU6QRHGJRYJPHEWU6HUMORBF32RL7GTAVDLLIZIMQ5VBHB2R7I", 
        const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            sender: adminAccount.addr,
            suggestedParams: params,
            receiver: adminAccount.addr,
            amount: 0,
            note: note,
        });

        const signedTxn =  txn.signTxn(adminAccount.sk);
        const {txid}  = await algodClient.sendRawTransaction(signedTxn).do();
        console.log("✅ Candidato registrado con Tx ID:", txid);
        return txid;
    } catch (error) {
        console.log("Error al registrar candidato:", error);
        console.error("Error al registrar candidato:", error);
        return null;
    }
};

export const getAllTransactionNotes = async () => {
    try {
        console.log("🔎 Obteniendo todas las transacciones de:", adminAccount.addr);
        //! Decodificar la cuenta para buscar todas las transacciones
        //algosdk.encodeAddress(adminAccount.addr.publicKey)
        const { data: { transactions } } = await axios.get(`https://testnet-idx.algonode.cloud/v2/transactions?address=${adminAccount.addr}&limit=200`);

        console.log("📜 Transacciones encontradas:", transactions);


        const filteredTransactions = transactions
        .map(tx => ({
            txId: tx.id,
            name: tx.note ? new TextDecoder().decode(
                new Uint8Array(atob(tx.note).split("").map(c => c.charCodeAt(0)))
            ) : "" // Convertir de Uint8Array a string
        }))
        .filter(tx => tx.name.startsWith(election)) // Filtrar por "Eleccion 1"
        .map(tx => ({
            txId: tx.txId,
            name: tx.name.split(": ")[1] // Extraer solo el nombre y apellido
        }));
    
    console.log(filteredTransactions);
    
        return filteredTransactions;
    } catch (error) {
        console.error("❌ Error al obtener las transacciones:", error);
        return [];
    }
};
// Función para emitir un voto
export const voteForCandidate = async (candidateId) => {
    try {
        const params = await algodClient.getTransactionParams().do();
        const note = new TextEncoder().encode(`Voto para: ${candidateId}`);

        const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            sender: adminAccount.addr,
            suggestedParams: params,
            receiver: adminAccount.addr,
            amount: 0,
            note: note,
        });

        const signedTxn = txn.signTxn(adminAccount.sk);
        const { txid } = await algodClient.sendRawTransaction(signedTxn).do();

        console.log("Voto registrado con Tx ID:", txid);
        return txid;
    } catch (error) {
        console.error("Error al votar:", error);
        return null;
    }
};

// Función para obtener los resultados de la votación desde Algorand
export const getElectionResults = async () => {
    try {
        console.log("🔎 Obteniendo todas las transacciones de:", adminAccount.addr);
        
        // Obtener todas las transacciones de la cuenta administradora
        const { data: { transactions } } = await axios.get(
            `https://testnet-idx.algonode.cloud/v2/transactions?address=${adminAccount.addr}&limit=200`
        );

        const votes = {};

        const filteredTransactions = transactions
            .map(tx => ({
                txId: tx.id,
                name: tx.note ? new TextDecoder().decode(
                    new Uint8Array(atob(tx.note).split("").map(c => c.charCodeAt(0)))
                ) : ""
            }))
            .filter(tx => tx.name.startsWith("Voto para: "))
            .map(tx => ({
                txId: tx.txId,
                name: tx.name.replace("Voto para: ", "").trim()
            }));

        filteredTransactions.forEach(({ name }) => {
            // Normalizar el nombre (mayúscula inicial en cada palabra)
            const candidateName = name
                .toLowerCase()
                .replace(/\b\w/g, (char) => char.toUpperCase());
            
            votes[candidateName] = (votes[candidateName] || 0) + 1;
        });

        return Object.keys(votes).map((candidate) => ({
            name: candidate,
            votes: votes[candidate],
        }));
    } catch (error) {
        console.error("❌ Error obteniendo resultados:", error);
        return [];
    }
};

export default {
    registerCandidate,
    voteForCandidate,
    getElectionResults,
    getAllTransactionNotes
};