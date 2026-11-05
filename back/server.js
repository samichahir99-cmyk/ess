require("dotenv").config();

const cors = require("cors");
const connectDB = require("./config/db");
const clientRoutes = require("./routes/clients");
const express = require("express");

const app = express();

// 1. Autoriser le frontend à appeler cette API
 
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000" }));

// 2. Transformer le JSON reçu en objet JavaScript (req.body)

app.use(express.json());

// 3. Route de test : l'API répond-elle ?
 
app.get("/", (req, res) => {
    res.json({ message: "API CRM opérationnelle" });
});

// 4. Se connecter à MongoDB avant chaque requête sur les clients

app.use("/api/clients", async (req, res, next) => {
    try {
        await connectDB();
        next();
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Connexion à la base impossible" });
    }
});

// 5. Toutes les routes des clients

app.use("/api/clients", clientRoutes);

// 6. Dernier filet de sécurité (exemple : JSON mal écrit)
 
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({ message: "Requête invalide" });
});

// 7. En local, on démarre le serveur. Sur Vercel, c'est Vercel qui s'en charge.

if (!process.env.VERCEL) {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Serveur démarré sur http://localhost:${PORT}`);
    });
}

module.exports = app;