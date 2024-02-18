export const EnvConfiguration = () => ({
    environment: process.env.NODE_ENV || 'dev',
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME || 'PAMVIDB',
    dbPassword: process.env.DB_PASSWORD,
    dbPort: process.env.DB_PORT || 5432,
    dbUsername: process.env.DB_USERNAME || 'postgres',
    defaultLimit: +process.env.DEFAULT_LIMIT || 5,
});