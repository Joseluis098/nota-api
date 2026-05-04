import { Schema, model } from "mongoose";

const categorySchema = new Schema({
    name: { type: String, required: true, trim: true },
    color: { type: String, default: '#3498db' },
    userId: { type: String, required: true }
}, { timestamps: true });

export default model('Category', categorySchema);
