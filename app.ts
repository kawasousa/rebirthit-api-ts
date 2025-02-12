import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
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

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'RebirthIt API',
            version: '1.0.0',
            description: 'API documentation for the RebirthIt application',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 3000}`,
            },
        ],
    },
    apis: ['./src/routes/*.ts']
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

declare module "express-serve-static-core" {
    interface Request {
        profile?: { profileId: string };
    }
}

app.use("/auth", AuthRouter)
app.use("/profiles", ProfileRouter);
app.use("/friendships", FriendshipRouter);
app.use("/posts", PostRouter);
app.use("/interactions", InteractionRouter);

app.use(errorMiddleware);

export default app;