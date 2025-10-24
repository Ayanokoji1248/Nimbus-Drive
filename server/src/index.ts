import express from "express"
import dotenv from "dotenv"
import authRouter from "./routes/auth.route";
import cookieParser from "cookie-parser"
import { dbConnection } from "./config/dbConnection";
import folderRouter from "./routes/folder.route";
import cors from "cors"
import fileRouter from "./routes/file.route";
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
const allowedOrigins = [
    "http://localhost:5173",  // local Vite dev
    "https://nimbus-drive.vercel.app" // production frontend
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true); // allow server-to-server or Postman requests
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

app.use('/api/auth', authRouter);
app.use('/api/folder', folderRouter);
app.use('/api/file', fileRouter)

async function main() {
    await dbConnection()

    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`)
    })

}

main()