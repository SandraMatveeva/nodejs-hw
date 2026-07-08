import express from "express";
import cors from "cors";
import 'dotenv/config';
import {connectMongoDB} from './db/connectMongoDB.js';
import {notFoundHandler} from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { logger } from "./middleware/logger.js";
import notesRoutes from "./routes/notesRoutes.js";


const app = express();
const PORT = Number(process.env.PORT) || 3000;


app.use(
  cors({
    origin: "*",
    methods: "GET,PUT,POST,DELETE",
  }),
);


app.use(logger);
app.use(express.json());

app.use(notesRoutes);


app.use(notFoundHandler);
app.use(errorHandler);

await connectMongoDB ();

app.listen(PORT, () => {
  console.log(`Server is running on localhost: ${PORT}`);
});


