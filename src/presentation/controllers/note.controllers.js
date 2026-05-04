export default class NoteController {
    constructor(noteService) {
        this.noteService = noteService;
    }

    createNote = async (req, res) => {
        const data = req.body;
        if (req.file) data.imageUrl = '/uploads/' + req.file.filename;
        data.userid = (req.user && req.user.id) || 'user_123'; // TODO: obtener desde JWT real
        // Normalizar isPrivate (en form-data los booleanos llegan como string)
        if (typeof data.isPrivate === 'string') {
            data.isPrivate = data.isPrivate === 'true';
        }
        try {
            const note = await this.noteService.createNote(data);
            res.status(201).json(note);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    /**
     * Endpoint público para compartir notas no privadas.
     * No requiere autenticación. Si la nota es isPrivate=true, retorna 403.
     */
    getPublicNote = async (req, res) => {
        const { id } = req.params;
        try {
            const result = await this.noteService.getPublicNote(id);
            if (!result.found) return res.status(404).json({ error: "Note not found" });
            if (result.isPrivate) return res.status(403).json({ error: "This note is private" });
            res.status(200).json(result.note);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    getNotesByUserId = async (req, res) => {
        const userId = 'user_123';
        try {
            const notes = await this.noteService.getNotesByUserId(userId);
            res.status(200).json(notes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    getNoteById = async (req, res) => {
        const { id } = req.params;
        try {
            const note = await this.noteService.getNoteById(id);
            if (!note) return res.status(404).json({ error: "Note not found" });
            res.status(200).json(note);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    updateNote = async (req, res) => {
        const { id } = req.params;
        const data = req.body;
        if (req.file) data.imageUrl = '/uploads/' + req.file.filename;
        try {
            const note = await this.noteService.updateNote(id, data);
            if (!note) return res.status(404).json({ error: "Note not found" });
            res.status(200).json(note);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    deleteNote = async (req, res) => {
        const { id } = req.params;
        try {
            const note = await this.noteService.deleteNote(id);
            if (!note) return res.status(404).json({ error: "Note not found" });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
