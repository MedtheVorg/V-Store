import './config/logging'; // import Logging object so it can be accessed from anywhere in the application
import './utils/env'; // import zod validated env variables

import mongoose from 'mongoose';
import http from 'http';
import express from 'express';
import passport from 'passport';

// Config
import { SERVER, SERVER_HOSTNAME, SERVER_PORT, mongo } from './config';

// Middlewares
import { loggingHandler, corsHandler, errorHandler, routeNotFound } from './middlewares';

// Routes
import globalRouter from './routes';

// passport authentication
// it is necessary to load the passport strategies before calling them
import './authentication/passportjs/strategies/loader';

export const application = express();
export let httpServer: ReturnType<typeof http.createServer>;

export const Main = async () => {
    logging.log('---------------------------------------------');
    logging.log('Initializing API');
    logging.log('---------------------------------------------');
    application.use(express.urlencoded({ extended: true }));
    application.use(express.json({}));

    logging.log('---------------------------------------------');
    logging.log('Connect to Mongo');
    logging.log('---------------------------------------------');
    try {
        const { connection } = await mongoose.connect(mongo.MONGO_CONNECTION, mongo.MONGO_OPTIONS);
        logging.log('---------------------------------------------');
        logging.log(`${connection.readyState === 1 && 'Connection established to Mongo successfully'}`);
        logging.log('---------------------------------------------');
    } catch (error) {
        logging.log('---------------------------------------------');
        logging.warning('Failed to establish a connection with Mongo');
        logging.error(error);
        logging.log('---------------------------------------------');
        process.exit(1); // quit if connection fails
    }

    logging.log('---------------------------------------------');
    logging.log('Logging and configuration');
    logging.log('---------------------------------------------');
    application.use(loggingHandler);
    application.use(corsHandler);
    application.use(passport.initialize({ userProperty: 'user' }));

    logging.log('---------------------------------------------');
    logging.log('Define Routers');
    logging.log('---------------------------------------------');
    application.use('/api/v1', globalRouter);

    logging.log('---------------------------------------------');
    logging.log('Define Routing Error handlers');
    logging.log('---------------------------------------------');
    application.use(routeNotFound);
    application.use(errorHandler);

    logging.log('---------------------------------------------');
    logging.log('Start Server');
    logging.log('---------------------------------------------');
    httpServer = http.createServer(application);
    httpServer.listen(SERVER.SERVER_PORT, () => {
        logging.log('---------------------------------------------');
        logging.log(`Server Started ${SERVER_HOSTNAME} : ${SERVER_PORT}`);
        logging.log('---------------------------------------------');
    });
};

export const Shutdown = (callback: any) => httpServer && httpServer.close(callback);

Main();
