const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

connectDB();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));

if(process.env.NODE_ENV !== 'test'){
    // Change port if 5000 is busy
    const PORT = process.env.PORT || 5001; 
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;



