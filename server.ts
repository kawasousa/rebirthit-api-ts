import app from "./app";
import prisma from "./prisma/client";

const PORT = process.env.PORT || 3000;

prisma.$connect().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}.`);
    })
}
).catch((err: any) => {
    console.error(`Error when trying to connect to the server: ${err}.`);
})