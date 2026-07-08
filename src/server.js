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

// app.get("/notes", (req, res) => {
//     console.log("Get notes controller");
//     res.status(200).json({message: "Retrieved all notes"});
// });

// app.get("/notes", async (req, res)  => {
//   const notes = await Note.find();
//   res.status(200).json([notes]);
// });

// // app.get("/notes/:noteId", (req, res) =>{
// //   console.log("Get noteId controller");
// //   // console.log(req.params);
// //   const {noteId} = req.params;
// //   // const note = notes.find((n) => n.id === noteId);
// //   // if (!note) {
// //   //   res.status(404).json({message: " Note not found"});
// //   // }
// //   // console.log(note);
// //   res.status(200).json({message: "Retrieved note with ID: " + noteId});
// // });

// app.get("/notes/:noteId", async (req, res) => {
//   const {noteId} = req.params;
//   const note =  await Note.findById(noteId);

//   if (!note) {
//     return res.status(404).json({message: "❌ Note not found"});
//   }

// res.status(200).json(note);
// });

// app.get("/test-error", (req, res) => {
//   throw new Error ("Simulated server error");
// });

app.use(notFoundHandler);
app.use(errorHandler);

await connectMongoDB ();

app.listen(PORT, () => {
  console.log(`Server is running on localhost: ${PORT}`);
});


