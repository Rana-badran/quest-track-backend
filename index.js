// express to set up API
// cors to cumminucate frontend-backend cross origin resource sharing
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db")
const app = express();
const PORT = 8080;

// middleware
app.use(cors());
app.use(express.json());

app.get("/", (req,res) => {
    res.send("API is a go")
})
sequelize.sync().then(()=>{
    app.listen(PORT,()=>{
        console.log("server is running");
    })
})