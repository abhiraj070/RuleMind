import dotenv from "dotenv";
dotenv.config({
    path: "./.env"
})
import {app} from "./app.js"
import db_connect from "./db/index.js";

db_connect()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`the server is connected on port: ${process.env.PORT}`)
        });
    })
    .catch((error) => {
        console.log("mongodb connection error")
        throw error;
    })