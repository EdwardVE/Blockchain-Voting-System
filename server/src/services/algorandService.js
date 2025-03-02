const algosdk = require("algosdk");

// Configuración de Algorand TestNet
const ALGOD_TOKEN = "";
const ALGOD_SERVER = "https://testnet-api.algonode.cloud";
const ALGOD_PORT = "";

const algodClient = new algosdk.Algodv2(ALGOD_TOKEN, ALGOD_SERVER, ALGOD_PORT);

// Cuenta de administrador (usa un mnemónico válido)
const ADMIN_MNEMONIC = "curve group police grunt eyebrow goose wire maid spatial garlic pair payment stereo system pull able mouse nurse rotate fiction hurry tail fork able remove";
const adminAccount = algosdk.mnemonicToSecretKey(ADMIN_MNEMONIC);



console.log("✅ Conectado a Algorand TestNet");

// Función para registrar un candidato
const registerCandidate = async (candidateName) => {

    try {

        console.log("🔹 Registrando candidato:", candidateName);

        const params = await algodClient.getTransactionParams().do();
        // console.log("🔹 Dirección del administrador:", adminAccount);
        // console.log("🔹 Dirección de la segunda cuenta:", secondAccount);
        const note = new TextEncoder().encode(`Candidato: ${candidateName}`);

        // sender: 'QDJH7QEBCU6QRHGJRYJPHEWU6HUMORBF32RL7GTAVDLLIZIMQ5VBHB2R7I',
        // receiver: 'YSWZNDMMOSIS24AIZUWRF4E2ANNPLGM3FNLH65ZVWFKBX3UGGB6SSEDTZM',

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
        console.error("❌ Error registrando candidato:", error);
        return null;
    }
};


// Función para votar por un candidato
const voteForCandidate = async (candidateId) => {
    try {
        const params = await algodClient.getTransactionParams().do();
        const note = new TextEncoder().encode(`Voto para: ${candidateId}`);

        const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            from: adminAccount.addr,
            to: adminAccount.addr,
            amount: 0,
            note,
            suggestedParams: params,
        });

        const signedTxn = txn.signTxn(adminAccount.sk);
        const { txId } = await algodClient.sendRawTransaction(signedTxn).do();

        console.log("✅ Voto registrado con Tx ID:", txId);
        return txId;
    } catch (error) {
        console.error("❌ Error al votar:", error);
        return null;
    }
};

// Función para obtener los resultados de la votación
const getElectionResults = async () => {
    try {
        const transactions = await algodClient
            .searchForTransactions()
            .address(adminAccount.addr)
            .do();

        const votes = {};

        transactions.transactions.forEach((txn) => {
            if (txn.note) {
                const decodedNote = new TextDecoder().decode(
                    new Uint8Array(Buffer.from(txn.note, "base64"))
                );

                if (decodedNote.startsWith("Voto para: ")) {
                    const candidateId = decodedNote.replace("Voto para: ", "");
                    votes[candidateId] = (votes[candidateId] || 0) + 1;
                }
            }
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

module.exports = { registerCandidate, voteForCandidate, getElectionResults };
