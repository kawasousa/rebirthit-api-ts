import express from 'express'
import dotenv from 'dotenv'
import PostRouter from "./src/routes/PostRouter"
import ProfileRouter from "./src/routes/ProfileRouter"
import AuthRouter from './src/routes/AuthRouter'
import cors from 'cors'
import cookieParser from 'cookie-parser'

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: process.env.REBIRTHIT_FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}))

declare module "express-serve-static-core" {
    interface Request {
        profile?: { profileId: string};
    }
}

app.use("/posts", PostRouter);
app.use("/profiles", ProfileRouter);
app.use("/auth", AuthRouter)

export default app;