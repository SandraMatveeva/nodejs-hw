import { Router } from "express";
import { createNote, deleteNote, getNotes, getOneNote, updateNote } from "../controllers/notesController.js";

const router = Router();

router.get("/notes", getNotes);
router.get("/notes/:noteId", getOneNote);
router.post("/notes", createNote);
router.delete("/notes/:noteId", deleteNote);
router.patch("/notes/:noteId", updateNote);

export default router;

