import { Router } from "express";
import CategoryController from "../controllers/category.controllers.js";
import CategoryService from "../../application/application/use-cases/category.service.js";
import CategoryMongoRepository from "../../infrastructure/database/mongo/category.mongo.repository.js";

const categoryRepository = new CategoryMongoRepository();
const categoryService = new CategoryService(categoryRepository);
const categoryController = new CategoryController(categoryService);

const router = Router();

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Crear una nueva categoría
 *     description: Crea una categoría para organizar las notas del usuario.
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryInput'
 *     responses:
 *       201:
 *         description: Categoría creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Datos inválidos (name requerido)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/categories", categoryController.createCategory);

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Listar categorías del usuario
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Listado de categorías
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       500:
 *         description: Error interno del servidor
 */
router.get("/categories", categoryController.getCategoriesByUserId);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Obtener categoría por id
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Categoría encontrada
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Category' }
 *       404:
 *         description: Categoría no encontrada
 */
router.get("/categories/:id", categoryController.getCategoryById);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Actualizar categoría
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/CategoryInput' }
 *     responses:
 *       200:
 *         description: Categoría actualizada
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Category' }
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Categoría no encontrada
 */
router.put("/categories/:id", categoryController.updateCategory);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Eliminar categoría
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204:
 *         description: Categoría eliminada (sin contenido)
 *       404:
 *         description: Categoría no encontrada
 */
router.delete("/categories/:id", categoryController.deleteCategory);

export default router;
