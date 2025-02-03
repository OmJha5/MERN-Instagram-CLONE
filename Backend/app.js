import express, { urlencoded } from "express"
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import connectDB from "./utils/db.js"

const app = express();
dotenv.config({})
let port = process.env.PORT;

app.use(express.json())
app.use(cookieParser())
app.use(urlencoded({extended : true}))
const corsOptions = {
    origin : "http://localhost:5173",
    credentials : true
}

app.use(cors(corsOptions))

app.get("/" , (req , res) => {
    res.send("I am in home page")
})

app.listen(port , () => {
    connectDB()
    console.log(`Server is listening on port ${port}`);
})