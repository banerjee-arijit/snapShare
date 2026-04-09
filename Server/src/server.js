import express from "express";
import connectDB from "./Config/DbConfig.js";
import dotenv from 'dotenv'
import router from "./routes/routes.js";
import cors from 'cors'

const app=express();
app.use(express.json());
dotenv.config();


connectDB();

app.use(cors(
    {
        origin:"http://localhost:5173",
        credentials:true
    }
))
app.use("/api",router);

app.get("/", (req, res) => {
    res.send("SnapShare API is running perfectly! 🎉");
});

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})