# 📊 Proyecto de Votación en Algorand

Este proyecto implementa un sistema de votación basado en la blockchain de Algorand. Permite registrar votos como transacciones en la red y visualizar los resultados en tiempo real mediante un gráfico de barras.

## Deploy
https://blockchain-voting-system-eight.vercel.app/

## 🚀 Tecnologías Utilizadas

- **Frontend**: React, Recharts
- **Backend**: Algorand SDK, Node.js
- **Blockchain**: Algorand Testnet
- **API**: Algonode Indexer

## 📌 Características

✅ Registro de votos en la blockchain de Algorand.  
✅ Recuperación y procesamiento de transacciones en tiempo real.  
✅ Visualización de resultados en un gráfico de barras interactivo.  
✅ Interfaz limpia y moderna.

## 📦 Instalación

### 🔧 Prerrequisitos
Asegúrate de tener instalado:
- Node.js y npm
- Algorand Sandbox o Algonode API

### ⚙️ Pasos de Instalación
```sh
# Clonar el repositorio
git clone https://github.com/EdwardVE/lottery-with-blockchain.git

# Entrar en el directorio
cd client

# Instalar dependencias
npm install
```

## 🏃‍♂️ Uso

### 🔥 Ejecutar el Proyecto
```sh
# Iniciar el servidor
npm start
```
El servidor correrá en `http://localhost:3000`.

### 📊 Ver Resultados
El componente `Results` se encarga de mostrar los resultados en un gráfico de barras basado en las transacciones almacenadas en la blockchain de Algorand.

## ⚡ API y Blockchain
El proyecto obtiene las transacciones de la red de prueba de Algorand usando el servicio de **Algonode**:
```sh
https://testnet-idx.algonode.cloud/v2/transactions?address
```

## 🤝 Contribución
1. Haz un fork del proyecto.
2. Crea una nueva rama: `git checkout -b mi-nueva-funcionalidad`
3. Realiza tus cambios y haz commit: `git commit -m 'Añadida nueva funcionalidad'`
4. Haz push a la rama: `git push origin mi-nueva-funcionalidad`
5. Abre un Pull Request 🚀

## 🛠️ Mantenimiento
Si encuentras errores o deseas proponer mejoras, por favor abre un **Issue** en el repositorio.

## 📄 Licencia
Este proyecto está bajo la licencia MIT.

---
💡 **Desarrollado por:** *Edward Vasallo*  
📩 Contacto: (ervasallo@unal.edu.co)


