// express to set up API
// cors to cumminucate frontend-backend cross origin resource sharing
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const {sequelize} = require("./config/db")
const userRoutes = require("./routes/users")
const categoriesRoutes = require("./routes/categories")
const questsRoutes = require("./routes/quests")


const PORT = 8080;
const app = express();

// middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
dotenv.config();

app.get("/", (req,res) => {
    res.send("API is a go")
})
app.use("/users", userRoutes)
app.use("/quests", questsRoutes)
app.use("/categories", categoriesRoutes)

sequelize.sync().then(()=>{
    app.listen(PORT,()=>{
        console.log("server is running");
    })
})