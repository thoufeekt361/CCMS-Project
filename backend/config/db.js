const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://test:test@ac-pipxct5-shard-00-00.rnrlscg.mongodb.net:27017,ac-pipxct5-shard-00-01.rnrlscg.mongodb.net:27017,ac-pipxct5-shard-00-02.rnrlscg.mongodb.net:27017/?ssl=true&replicaSet=atlas-103jjl-shard-0&authSource=admin&appName=Cluster0"

    );

        console.log("MongoDB Connected");
    } catch (err) {
        console.log("Database Connection Error:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;