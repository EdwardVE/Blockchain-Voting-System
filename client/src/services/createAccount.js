const algosdk = require("algosdk");
//! Usar node createAccount.js
// Función para crear una nueva cuenta en Algorand TestNet
const createAccount = () => {
    try {
        const account = algosdk.generateAccount();
        const mnemonic = algosdk.secretKeyToMnemonic(account.sk);

        console.log("✅ Cuenta creada con éxito:");
        console.log("🔑 Dirección de la cuenta:", account.addr);
        console.log("🔐 Mnemónico (guárdalo seguro):", mnemonic);

        return { address: account.addr, mnemonic };
    } catch (error) {
        console.error("❌ Error al crear la cuenta:", error);
        return null;
    }
};

// Ejecutar la función
createAccount();
