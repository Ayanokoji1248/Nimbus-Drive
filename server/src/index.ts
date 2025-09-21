import express from "express"
import dotenv from "dotenv"
import authRouter from "./routes/auth.route";
import { dbConnection } from "./config/dbConnection";
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRouter)

async function main() {
    await dbConnection()

    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`)
    })

}

main()