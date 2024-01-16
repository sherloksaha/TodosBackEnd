import Joi from "joi";

export const SchemaT = {
  payload: Joi.object({
    desc: Joi.string().min(3).max(30).required(),
    // title: Joi.string().min(3).max(20).required(),
    // ownerId: Joi.string().required(),
    // lastDate: Joi.date().required(),
  }),
};
