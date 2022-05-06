import 'reflect-metadata';
import { ApiServer } from './server/index';
import { DatabaseProvider } from './database/index';
import config = require('./config');

DatabaseProvider.configure({
    type: 'mysql',
    database: config.databaseSettings.databaseName,
    username: config.databaseSettings.username,
    password: config.databaseSettings.password,
    host: config.databaseSettings.host,
    port: config.databaseSettings.port,
    ssl: config.databaseSettings.ssl
});

const server = new ApiServer();
server.start(config.HTTP.port);
