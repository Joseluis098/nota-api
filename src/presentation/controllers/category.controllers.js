export default class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }

    createCategory = async (req, res) => {
        const data = req.body;
        data.userId = (req.user && req.user.id) || 'user_123'; // TODO: obtener del token JWT real
        try {
            const category = await this.categoryService.createCategory(data);
            res.status(201).json(category);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    getCategoriesByUserId = async (req, res) => {
        const userId = (req.user && req.user.id) || 'user_123';
        try {
            const categories = await this.categoryService.getCategoriesByUserId(userId);
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    getCategoryById = async (req, res) => {
        const { id } = req.params;
        try {
            const category = await this.categoryService.getCategoryById(id);
            if (!category) return res.status(404).json({ error: "Category not found" });
            res.status(200).json(category);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    updateCategory = async (req, res) => {
        const { id } = req.params;
        const data = req.body;
        try {
            const category = await this.categoryService.updateCategory(id, data);
            if (!category) return res.status(404).json({ error: "Category not found" });
            res.status(200).json(category);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    deleteCategory = async (req, res) => {
        const { id } = req.params;
        try {
            const category = await this.categoryService.deleteCategory(id);
            if (!category) return res.status(404).json({ error: "Category not found" });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
