import express from "express";
import connectDB from "./Config/DbConfig.js";
import dotenv from "dotenv";
import router from "./routes/routes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

connectDB();
app.use(express.static(path.join(__dirname, "../../Client/dist")));

app.use("/api", router);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});