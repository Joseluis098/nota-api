export default class CategoryEntity {
    constructor({ id, name, color, userId }) {
        this.id = id;
        this.name = name;
        this.color = color || '#3498db';
        this.userId = userId;
    }
}
