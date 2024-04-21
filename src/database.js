const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://calasalde:53105_tercerPreEntrega@cluster0.54onomh.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Connected to database"))
    .catch(() => console.log("Database connection error"))
    