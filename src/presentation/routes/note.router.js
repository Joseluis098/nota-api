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

/**
 * @swagger
 * /notes:
 *   post:
 *     summary: Crear una nueva nota
 *     description: Crea una nota asociada al usuario autenticado. Acepta una imagen opcional.
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/NoteInput'
 *     responses:
 *       201:
 *         description: Nota creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       400:
 *         description: Datos inválidos (title o content faltantes)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/notes", upload.single("image"), noteController.createNote);

/**
 * @swagger
 * /notes:
 *   get:
 *     summary: Obtener todas las notas del usuario autenticado
 *     tags: [Notes]
 *     responses:
 *       200:
 *         description: Listado de notas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/notes", noteController.getNotesByUserId);

/**
 * @swagger
 * /notes/{id}:
 *   get:
 *     summary: Obtener una nota por su identificador
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único de la nota
 *     responses:
 *       200:
 *         description: Nota encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       404:
 *         description: Nota no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/notes/:id", noteController.getNoteById);

/**
 * @swagger
 * /notes/{id}:
 *   put:
 *     summary: Actualizar una nota existente
 *     description: Reemplaza los campos enviados. Acepta nueva imagen opcional.
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único de la nota
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/NoteUpdateInput'
 *     responses:
 *       200:
 *         description: Nota actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Nota no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/notes/:id", upload.single("image"), noteController.updateNote);

/**
 * @swagger
 * /notes/{id}:
 *   delete:
 *     summary: Eliminar una nota por su identificador
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único de la nota
 *     responses:
 *       204:
 *         description: Nota eliminada (sin contenido en la respuesta)
 *       404:
 *         description: Nota no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/notes/:id", noteController.deleteNote);

export default router;
