import CategoryEntity from "../../../domain/entities/category.entity.js";

export default class CategoryService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    async createCategory(data) {
        if (!data.name) {
            throw new Error("Name is required");
        }
        const category = new CategoryEntity(data);
        return await this.categoryRepository.save(category);
    }

    async getCategoriesByUserId(userId) {
        return await this.categoryRepository.findByUserId(userId);
    }

    async getCategoryById(id) {
        return await this.categoryRepository.findById(id);
    }

    async updateCategory(id, data) {
        if (!data.name && !data.color) {
            throw new Error("At least one field must be provided");
        }
        return await this.categoryRepository.update(id, data);
    }

    async deleteCategory(id) {
        return await this.categoryRepository.delete(id);
    }
}
