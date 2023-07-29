import dotenv from "dotenv";

import connection from "./config/database.js";
import Server from "./index.js";

dotenv.config();

const port = process.env.PORT || 5000;

const server = new Server();
const app = await server.init().catch( error => console.log('Unable to initialize GraphQL-Express Server', error) );

app.listen(port, () => console.log(`Server up and running on port ${port}.`));

connection
  .once('open', () => console.log('Connection has been established successfully.'))
  .on('error', ( error ) => console.log('Unable to connect to the database: ', error));