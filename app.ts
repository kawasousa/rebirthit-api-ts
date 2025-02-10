import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import PostRouter from "./src/routes/PostRouter"
import ProfileRouter from "./src/routes/ProfileRouter"
import AuthRouter from './src/routes/AuthRouter'
import FriendshipRouter from './src/routes/FriendshipRouter'
import InteractionRouter from './src/routes/InteractionRouter'
import { errorMiddleware } from './src/middlewares/errorMiddleware'

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
app.use("/friendships", FriendshipRouter);
app.use("/interactions", InteractionRouter);

app.use(errorMiddleware);

export default app;