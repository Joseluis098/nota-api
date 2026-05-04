import { Router } from "express";
import multer from "multer";
import NoteController from "../controllers/note.controllers.js";
import NoteService from "../../application/application/use-cases/note.service.js";
import NoteMongoRepository from "../../infrastructure/database/mongo/note.mongo.repository.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
// import NoteMySQLRepository from "../../infrastructure/database/mysql/note.mysql.repostory.js";

const upload = multer({ dest: "uploads/" });

const noteRepository = new NoteMongoRepository();
// const noteRepository = new NoteMySQLRepository();
const noteService = new NoteService(noteRepository);
const noteController = new NoteController(noteService);

const router = Router();

// =====================================================================
//  RUTA PÚBLICA — debe registrarse ANTES que /notes/:id para que Express
//  matchee primero la ruta más específica. NO usa authMiddleware.
// =====================================================================

/**
 * @swagger
 * /notes/{id}/public:
 *   get:
 *     summary: Obtener una nota pública (sin autenticación)
 *     description: Permite ver una nota sin token JWT. Si la nota es privada (isPrivate=true), retorna 403.
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
 *         description: Nota pública
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       403:
 *         description: La nota es privada y no puede ser vista públicamente
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
 */
router.get("/notes/:id/public", noteController.getPublicNote);

// =====================================================================
//  RUTAS PROTEGIDAS — todas requieren authMiddleware (header Bearer).
// =====================================================================

/**
 * @swagger
 * /notes:
 *   post:
 *     summary: Crear una nueva nota (requiere token)
 *     description: Crea una nota asociada al usuario autenticado. Acepta imagen opcional y categoryId opcional.
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
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
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Token no proveído o inválido
 *       500:
 *         description: Error interno del servidor
 */
router.post("/notes", authMiddleware, upload.single("image"), noteController.createNote);

/**
 * @swagger
 * /notes:
 *   get:
 *     summary: Listar notas del usuario autenticado
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Listado de notas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 *       401:
 *         description: Token no proveído o inválido
 *       500:
 *         description: Error interno del servidor
 */
router.get("/notes", authMiddleware, noteController.getNotesByUserId);

/**
 * @swagger
 * /notes/{id}:
 *   get:
 *     summary: Obtener una nota por id (requiere token)
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Nota encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       401:
 *         description: Token no proveído o inválido
 *       404:
 *         description: Nota no encontrada
 */
router.get("/notes/:id", authMiddleware, noteController.getNoteById);

/**
 * @swagger
 * /notes/{id}:
 *   put:
 *     summary: Actualizar una nota (requiere token)
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
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
 *       401:
 *         description: Token no proveído o inválido
 *       404:
 *         description: Nota no encontrada
 */
router.put("/notes/:id", authMiddleware, upload.single("image"), noteController.updateNote);

/**
 * @swagger
 * /notes/{id}:
 *   delete:
 *     summary: Eliminar una nota (requiere token)
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Nota eliminada
 *       401:
 *         description: Token no proveído o inválido
 *       404:
 *         description: Nota no encontrada
 */
router.delete("/notes/:id", authMiddleware, noteController.deleteNote);

export default router;
