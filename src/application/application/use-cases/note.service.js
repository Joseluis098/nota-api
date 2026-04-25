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