// importante al trabajar con nuestros archivos debemos añadir al final .js requerido para ESM
import NoteEntity from "../../../domain/entities/note.entity.js";

export default class NoteService {
    constructor(noteRepository) {
        this.noteRepository = noteRepository;
    }

    async createNote(data) {
        if (!data.title || !data.content) { throw new Error("Title and content are required"); }

        const note = new NoteEntity(data);
        return await this.noteRepository.save(note);
    }

    async getNotesByUserId(userId) {
        return await this.noteRepository.findByUserId(userId);
    }

    async getNoteById(id) {
        return await this.noteRepository.findById(id);
    }

    /**
     * Obtiene una nota como pública (sin auth).
     * Devuelve un objeto con shape: { found, isPrivate, note }.
     * - found=false  → la nota no existe.
     * - isPrivate=true → la nota es privada (no debe servirse públicamente).
     * - Caso ok      → note contiene la nota a devolver.
     */
    async getPublicNote(id) {
        const note = await this.noteRepository.findById(id);
        if (!note) return { found: false };
        if (note.isPrivate) return { found: true, isPrivate: true };
        return { found: true, isPrivate: false, note };
    }

    async updateNote(id, data) {
        if (!data.title && !data.content && !data.imageUrl) {
            throw new Error("At least one field must be provided");
        }
        return await this.noteRepository.update(id, data);
    }

    async deleteNote(id) {
        return await this.noteRepository.delete(id);
    }
}