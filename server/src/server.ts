import 'module-alias';
import './config/logging';
import './utils/env';

import http from 'http';
import express from 'express';

import { loggingHandler } from './middleware/loggingHandler';
import { corsHandler } from './middleware/corsHandler';
import { routeNotFound } from './middleware/routeNotFound';
import { SERVER, SERVER_HOSTNAME, SERVER_PORT } from './config/config';

export const application = express();
export let httpServer: ReturnType<typeof http.createServer>;

export const Main = () => {
    logging.info('---------------------------------------------');
    logging.info('Initializing API');
    logging.info('---------------------------------------------');
    application.use(express.urlencoded({ extended: true }));
    application.use(express.json({}));

    logging.info('---------------------------------------------');
    logging.info('Logging and configuration');
    logging.info('---------------------------------------------');
    application.use(loggingHandler);
    application.use(corsHandler);

    logging.info('---------------------------------------------');
    logging.info('Define Controller Routing');
    logging.info('---------------------------------------------');
    application.get('/main/healthcheck', (_req, res, next) => res.status(200).json({ server: 'is Running.' }));

    logging.info('---------------------------------------------');
    logging.info('Define Routing Error');
    logging.info('---------------------------------------------');
    application.use(routeNotFound);

    logging.info('---------------------------------------------');
    logging.info('Start Server');
    logging.info('---------------------------------------------');
    httpServer = http.createServer(application);
    httpServer.listen(SERVER.SERVER_PORT, () => {
        logging.info('---------------------------------------------');
        logging.info(`Server Started ${SERVER_HOSTNAME} : ${SERVER_PORT}`);
        logging.info('---------------------------------------------');
    });
};

export const Shutdown = (callback: any) => httpServer && httpServer.close(callback);

Main();
