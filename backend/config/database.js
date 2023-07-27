import dotenv from "dotenv";
import mongoose from "mongoose";

import { connectionURI } from "./config.js";

dotenv.config();

mongoose.connect(
    connectionURI( process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_NAME ),
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

const connection = mongoose.connection;

export default connection;