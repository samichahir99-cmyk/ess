const express = require("express");
const Client = require("../models/Client");

const router = express.Router();

function envoyerErreur(res, error) {
    // Une seule fonction pour transformer une erreur en réponse HTTP
    
    if (error.code === 11000) { 
        return res.status(409).json({ message: "Cet email existe déjà" });
    }
    
    if (error.name === "ValidationError") {
        return res.status(400).json({ message: error.message });
    }
    
    if (error.name === "CastError") {
        return res.status(400).json({ message: "Identifiant invalide" });
    }
    
    console.error(error);
    return res.status(500).json({ message: "Erreur du serveur" });
}

// GET /api/clients : lire tous les clients
router.get("/", async (req, res) => {
    try {
        const clients = await Client.find().sort({ createdAt: -1 });
        res.status(200).json(clients);
    }
    catch (error){
        envoyerErreur(res, error);
    }
});

// GET /api/clients/:id : lire un seul client


router.get("/:id", async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) {
            return res.status(404).json({ message: "Client introuvable" });
        }
        
        res.status(200).json(client);
    }
    catch(error){
        envoyerErreur(res, error);
    }
});

// POST /api/clients : créer un client
 
router.post("/", async (req, res) => {
    try {
        const client = await Client.create(req.body);
        res.status(201).json(client);
    }
    catch(error) {
        envoyerErreur(res, error);
    }
});

// PATCH /api/clients/:id : modifier un client

router.patch("/:id", async (req, res) => {
    try {
        const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
            returnDocument: "after", // renvoyer le client APRÈS modification
            runValidators: true  // appliquer aussi les règles du modèle
        });
        
        if(!client) { 
        return res.status(404).json({ message: "Client introuvable" });
    }
    
    res.status(200).json(client);
}
catch (error) {
    envoyerErreur(res, error);
}

}); // DELETE /api/clients/:id : supprimer un client
 
router.delete("/:id", async (req, res) => {
    try{
        const client = await Client.findByIdAndDelete(req.params.id);
        if (!client) {
            return res.status(404).json({ message: "Client introuvable" });
        }
        res.status(200).json({ message: "Client supprimé" });
    }
    catch (error){
        envoyerErreur(res, error);
    }
});

module.exports = router;