import Joi from "joi";

export const SchemaR = {
  payload: Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    passwords: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    email: Joi.string().email({
      maxDomainSegments: 2,
      tlds: {
        allow: ["com", "net", "in", "study"],
      },
    }),
    FirstName: Joi.string().max(10),
    LastName: Joi.string().max(10),
    isAdmin: Joi.boolean(),
    isActive: Joi.boolean(),
    hasPasswordChange: Joi.boolean(),
  }),
};
