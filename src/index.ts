import './LoadEnv'; // Must be the first import
import app from '@server';
import "reflect-metadata";
import { logger } from '@shared';
import {createConnection} from "typeorm";
import { User } from "./entities/User";
import { Movement } from "./entities/Movement";
import * as PostgressConnectionStringParser from "pg-connection-string";

logger.info(`my database url is database ${process.env.DATABASE_URL}`);

// Connect Database
if (process.env.NODE_ENV === 'development') {
    createConnection({
        type: "postgres",
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT || '', 10),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: [
            User, Movement
        ],
        synchronize: true,
        logging: false
    }).then(connection => {
        logger.info('server connected successfuly on database ');
    }).catch(error => console.log('Database connection failure', error));
} else  {
    const databaseUrl: string = process.env.DATABASE_URL || '';
    const connectionOptions = PostgressConnectionStringParser.parse(databaseUrl);
    createConnection({
        type: "postgres",
        // name: connectionOptions.name,
        host: connectionOptions.host || '',
        port: parseInt(connectionOptions.port || '', 10),
        username: connectionOptions.user,
        password: connectionOptions.password,
        database: connectionOptions.database || '',
        entities: [
            User, Movement
        ],
        synchronize: true,
        logging: false
    }).then(() => {
        logger.info('server connected successfuly on database ');
    }).catch(error => console.log('Database connection failure', error));
}

// Start the server
const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
    logger.info(`NodeENV ${process.env.NODE_ENV} - Express server started on portz: ${port}`);
});
