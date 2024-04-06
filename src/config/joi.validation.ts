import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
    APIHOST: Joi.string().default('localhost'),
    APIPORT: Joi.number().default(3000),
    APIPROTOCOL: Joi.string().default('http'),
    APPVERSION: Joi.string().default('0.0.1'),
    CORSORIGIN: Joi.string().default('http://localhost:3000/'),
    DBHOST: Joi.string(),
    DBNAME: Joi.string().default('PAMVIDB'),
    DBPASSWORD: Joi.string(),
    DBPORT: Joi.number().default(5432),
    DBUSERNAME: Joi.string().default('postgres'),
    DEFAULT_LIMIT: Joi.number().default(5),
    FILESEXTENSIONSIMAGEVALID: Joi.array(),
    HOST_API: Joi.string(),
    JWTSECRET: Joi.string(),
    MAILHOST: Joi.string().default('smtp.gmail.com'),
    MAILPASSWORD: Joi.string(),
    MAILSENDER: Joi.string().default('nicolasalfredodell@gmail.com'),
    MAILUSER: Joi.string().default('nicolasalfredodell@gmail.com'),
    STAGE: Joi.string().default('dev'),
});