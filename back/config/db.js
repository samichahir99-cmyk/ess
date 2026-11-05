const mongoose = require("mongoose");

async function connectDB() {
    // Déjà connecté ? Alors on ne fait rien.
    if (mongoose.connection.readyState === 1) {
        return;
    }
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connecté");
}

module.exports = connectDB;