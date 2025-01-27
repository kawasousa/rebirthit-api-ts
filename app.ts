import express from 'express'
import dotenv from 'dotenv'
import PostRouter from "./src/routes/PostRouter"

dotenv.config();

const app = express();
app.use(express.json());

/* Routes */
app.use("/posts", PostRouter)

export default app;