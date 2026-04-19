import { Router } from "express";
import multer from "multer";
import NoteController from "../controllers/note.controllers.js";
import NoteService from "../../application/application/use-cases/note.service.js";
import NoteMongoRepository from "../../infrastructure/database/mongo/note.mongo.repository.js";
// import NoteMySQLRepository from "../../infrastructure/database/mysql/note.mysql.repostory.js";

const upload = multer({ dest: "uploads/" });

const noteRepository = new NoteMongoRepository();
// const noteRepository = new NoteMySQLRepository();
const noteService = new NoteService(noteRepository);
const noteController = new NoteController(noteService);

const router = Router();

router.post("/notes", upload.single("image"), noteController.createNote);
router.get("/notes", noteController.getNotesByUserId);

export default router;
