# RebirthIt API
RebirthIt social network **API**, developed with **TypeScript**, **Express**, **Prisma**, and **PostgreSQL**. The API allows the creation, editing, interaction, and authentication of profiles, posts, and friendships within the platform. ([versão em português]())
## Technologies Used
- **TypeScript**: To ensure static typing and greater development security.
- **Express**: Framework for building APIs in Node.js.
- **Prisma**: ORM to facilitate interaction with the PostgreSQL database.
- **PostgreSQL**: Relational database used to store data.
- **JWT**: For authentication and session control.
- **bcrypt**: For hashing passwords.
- **Zod**: For input data validation.
- **Swagger**: For API documentation.
## Prerequisites
Before running the project, make sure you have the following tools installed:
- **Node.js** (Recommended: version 18+)
- **PostgreSQL** (or Docker to run the database)
- **Prisma CLI** (Used to run the migrations)
## Project Structure
Here is an overview of the main folders and files in the repository:
```bash
rebirthit-api-ts
┣ .env # Environment variables
┣ README.md # Project documentation
┣ app.ts # Configuration and initialization of the Express server
┣ server.ts # Server initialization file
┣ dist/ # Compiled files
┣ docs/ # Documentation in portuguese
┃   ┗ LEIAME.md
┣ package-lock.json # Dependency lock file
┣ package.json # Project dependencies
┣ prisma/ # Migration files and database schema
┃   ┣ migrations/
┃   ┗ schema.prisma
┣ src/
┃   ┣ config/ # Configuration files (JWT, Prisma)
┃   ┣ controllers/ # Controllers for handling routes
┃   ┣ errors/ # Custom error classes
┃   ┣ middlewares/ # Middleware for validation and error handling
┃   ┣ models/ # Data models
┃   ┣ routes/ # API route definitions
┃   ┣ schemas/ # Data validation with Zod
┃   ┗ services/ # Business logic
┣ tsconfig.json # TypeScript configuration
```
## How to Run the Project
1. Clone the repository:
```bash
git clone https://github.com/YOUR_USER/rebirthit-api-ts.git &&
cd rebirthit-api-ts
```
2. Install the dependencies
```bash
npm install
```
3. Configure the database
   - Create a PostgreSQL database.
   - In the `.env` file, define the database connection URL:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/rebirthit"
```
4. Run Prisma migrations to create the tables:
```bash
npx prisma migrate deploy
```
5. Start the server
```bash
npm run dev
```
The API is now running at [http://localhost:3000](http://localhost:3000)
## API Documentation with Swagger
The API documentation is generated using **Swagger** and is accessible at:
```bash
http://localhost:3000/api-docs
```

This provides a complete reference to all available endpoints, their expected inputs, and responses.
## How to Contribute
1. Fork the repository.
2. Create a branch for your feature (`git checkout -b feature/feature-name`).
3. Commit your changes (`git commit -m 'Add feature'`).
4. Push to the remote repository (`git push origin feature/feature-name`).
5. Create a pull request.