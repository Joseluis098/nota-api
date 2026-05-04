import { jest } from '@jest/globals';
import CategoryService from '../../src/application/application/use-cases/category.service.js';

const mockCategoryRepository = {
    save: jest.fn(),
    findByUserId: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
};

describe('CategoryService - createCategory (Happy Path)', () => {
    let categoryService;

    beforeEach(() => {
        jest.clearAllMocks();
        categoryService = new CategoryService(mockCategoryRepository);
    });

    test('debería crear y guardar una categoría correctamente', async () => {
        // Arrange
        const data = {
            name: 'Trabajo',
            color: '#e74c3c',
            userId: 'user_123'
        };
        const expectedSavedCategory = {
            _id: 'cat_001',
            ...data
        };
        mockCategoryRepository.save.mockResolvedValue(expectedSavedCategory);

        // Act
        const result = await categoryService.createCategory(data);

        // Assert
        expect(mockCategoryRepository.save).toHaveBeenCalledTimes(1);
        expect(result).toBeDefined();
        expect(result.name).toBe('Trabajo');
        expect(result.color).toBe('#e74c3c');
        expect(result.userId).toBe('user_123');
        expect(result._id).toBe('cat_001');
    });

    test('debería usar color por defecto cuando no se provee', async () => {
        // Arrange
        const data = { name: 'Ideas', userId: 'user_123' };
        mockCategoryRepository.save.mockImplementation(async (entity) => ({
            _id: 'cat_002',
            name: entity.name,
            color: entity.color,
            userId: entity.userId
        }));

        // Act
        const result = await categoryService.createCategory(data);

        // Assert
        expect(result.color).toBe('#3498db');
        expect(mockCategoryRepository.save).toHaveBeenCalledTimes(1);
    });
});
