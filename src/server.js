import express from "express";
import cors from "cors";
import 'dotenv/config';
import pinoHttp from "pino-http";

const app = express();
const PORT = Number(process.env.PORT) || 3000;


app.use(
  cors({
    origin: "*",
    methods: "GET,PUT,POST,DELETE",
  }),
);

app.use(express.json());

app.use(
  pinoHttp({
    transport:
      process.env.NODE_ENV === "production"
        ? undefined
        : { target: "pino-pretty" },
  }),
);

app.get("/notes", (req, res) => {
    console.log("Get notes controller");
    res.status(200).json({message: "Retrieved all notes"});
});

app.get("/notes/:noteId", (req, res) =>{
  console.log("Get noteId controller");
  // console.log(req.params);

  const {noteId} = req.params;

  // const note = notes.find((n) => n.id === noteId);
  // if (!note) {
  //   res.status(404).json({message: " Note not found"});
  // }
  // console.log(note);
  res.status(200).json({message: "Retrieved note with ID: " + noteId});
});

app.get("/test-error", (req, res) => {
  throw new Error ("Simulated server error");
});

app.use((req, res)=> {
  res.status(404).json({message: "Route not found"});
});

app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on localhost: ${PORT}`);
});


