import { model, Schema } from "mongoose";
import { TAGS } from "../constants/tags.js";

const noteSchema = new Schema ({
   title: {
    type: String,
    required: true,
    trim: true
   },
   content: {
    type: String,
    default: "",
  trim: true,
   },
   tag: {
    type: String,
    default: 'Todo',
    enum: TAGS,
    // enum: ['Work', 'Personal', 'Meeting', 'Shopping', 'Ideas', 'Travel', 'Finance', 'Health', 'Important', 'Todo']
   },

}, {timestamps: true});

noteSchema.index({
  tag:1,
});

export const Note = model("Note", noteSchema);

