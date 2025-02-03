import express, { urlencoded } from "express"
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import connectDB from "./utils/db.js"
import userRouter from "./routes/user.route.js"
import postRouter from "./routes/post.route.js"
import messageRouter from "./routes/message.route.js"

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

// API's
app.use("/api/v1/user" , userRouter)
app.use("/api/v1/user" , postRouter)
app.use("/api/v1/user" , messageRouter)

app.listen(port , () => {
    connectDB()
    console.log(`Server is listening on port ${port}`);
})