import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import { TAGS } from "../constants/tags.js";


export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1),
    perPage: Joi.number().integer().min(3).max(15),
    tag: Joi.string()
      .valid(...TAGS),
      search: Joi.string().trim().allow(""),
  })
};

export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(2).max(15).required(),
    content: Joi.string().min(2).max(25).required(),
    tag: Joi.string()
      .valid(...TAGS)
        // 'Work',
        // 'Personal',
        // 'Meeting',
        // 'Shopping',
        // 'Ideas',
        // 'Travel',
        // 'Finance',
        // 'Health',
        // 'Important',
        // 'Todo',

      .required(),
  }),
};

const objIdValidator = (value, helpers) => {
  if (isValidObjectId(value)) {
    return value;
  }
  return helpers.message('Bad ID format');
};

export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objIdValidator).required(),
  }),
};

export const updateNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(2).max(15),
    content: Joi.string().min(2).max(25),
    tag: Joi.string().valid(...TAGS),
  }).min(1),
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objIdValidator).required(),
  }),
};
