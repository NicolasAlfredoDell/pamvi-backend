import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
    DBHOST: Joi.string(),
    DBNAME: Joi.string().default('PAMVIDB'),
    DBPASSWORD: Joi.string(),
    DBPORT: Joi.number().default(5432),
    DBUSERNAME: Joi.string().default('postgres'),
    DEFAULT_LIMIT: Joi.number().default(5),
    HOST_API: Joi.string(),
    JWTSECRET: Joi.string(),
    MAILHOST: Joi.string().default('smtp.gmail.com'),
    MAILPASSWORD: Joi.string(),
    MAILSENDER: Joi.string().default('nicolasalfredodell@gmail.com'),
    MAILUSER: Joi.string().default('nicolasalfredodell@gmail.com'),
    PORT: Joi.number(),
});