const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
    {
        nom:{
            type: String,
            required: [true, "Le nom est obligatoire"],
            trim: true
        },
        
        email:{
            type: String,
            required: [true, "L'email est obligatoire"],
            unique: true,
            lowercase: true,
            trim: true
        },
        
        telephone: { type: String, trim: true },
        entreprise: { type: String, trim: true },

        statut:{
            type: String,
            enum: {
                values: ["prospect", "client", "inactif"],
                message: "Statut invalide : prospect, client ou inactif"
            },
            default: "prospect"
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Client", clientSchema);