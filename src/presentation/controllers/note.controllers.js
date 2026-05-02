export default class NoteController {
    constructor(noteService) {
        this.noteService = noteService;
    }

    createNote = async (req, res) => {
        const data = req.body;
        if (req.file) data.imageUrl = '/uploads/' + req.file.filename;
        data.userid = 'user_123'; // TODO: obtener el usuario desde la sesión o token
        try {
            const note = await this.noteService.createNote(data);
            res.status(201).json(note);
        } catch (error) {
            res.status(400).json({ error: error.message });
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
