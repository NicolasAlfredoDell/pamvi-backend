import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
    DBHOST: Joi.string(),
    DBNAME: Joi.string().default('PAMVIDB'),
    DBPASSWORD: Joi.string(),
    DBPORT: Joi.number().default(5432),
    DBUSERNAME: Joi.string().default('postgres'),
    DEFAULT_LIMIT: Joi.number().default(5),
    PORT: Joi.number(),
    HOST_API: Joi.string(),
    JWTSECRET: Joi.string(),
});