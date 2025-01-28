import express from 'express'
import dotenv from 'dotenv'
import PostRouter from "./src/routes/PostRouter"
import ProfileRouter from "./src/routes/ProfileRouter"

dotenv.config();

const app = express();
app.use(express.json());

/* Routes */
app.use("/posts", PostRouter);
app.use("/profiles", ProfileRouter);

export default app;