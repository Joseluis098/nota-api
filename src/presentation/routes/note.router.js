import { Router } from "express";
import multer from "multer";
import NoteController from "../controllers/note.controllers.js";
import NoteService from "../../application/application/use-cases/note.service.js";
import NoteMongoRepository from "../../infrastructure/database/mongo/note.mongo.repository.js";
// import NoteMySQLRepository from "../../infrastructure/database/mysql/note.mysql.repostory.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const upload = multer({ dest: "uploads/" });

const noteRepository = new NoteMongoRepository();
// const noteRepository = new NoteMySQLRepository();
const noteService = new NoteService(noteRepository);
const noteController = new NoteController(noteService);

const router = Router();

router.post("/notes", upload.single("image"), noteController.createNote);
router.get("/notes", noteController.getNotesByUserId);
router.get("/notes/:id", noteController.getNoteById);

// PUT y DELETE requieren JWT valido + rol admin
router.put("/notes/:id", authMiddleware, roleMiddleware('admin'), upload.single("image"), noteController.updateNote);
router.delete("/notes/:id", authMiddleware, roleMiddleware('admin'), noteController.deleteNote);

export default router;
