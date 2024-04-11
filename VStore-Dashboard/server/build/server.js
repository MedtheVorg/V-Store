"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shutdown = exports.Main = exports.httpServer = exports.application = void 0;
require("./config/logging"); // import Logging object so it can be accessed from anywhere in the application
require("./utils/env"); // import zod validated env variables
const mongoose_1 = __importDefault(require("mongoose"));
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
// Config
const config_1 = require("./config");
// Middlewares
const middlewares_1 = require("./middlewares");
// Routes
const routes_1 = __importDefault(require("./routes"));
// passport authentication
// it is necessary to load the passport strategies before calling them
require("./authentication/passportjs/strategies/loader");
exports.application = (0, express_1.default)();
const Main = () => __awaiter(void 0, void 0, void 0, function* () {
    logging.log('---------------------------------------------');
    logging.log('Initializing API');
    logging.log('---------------------------------------------');
    exports.application.use(express_1.default.urlencoded({ extended: true }));
    exports.application.use(express_1.default.json({}));
    logging.log('---------------------------------------------');
    logging.log('Connect to Mongo');
    logging.log('---------------------------------------------');
    try {
        const { connection } = yield mongoose_1.default.connect(config_1.mongo.MONGO_CONNECTION, config_1.mongo.MONGO_OPTIONS);
        logging.log('---------------------------------------------');
        logging.log(`${connection.readyState === 1 && 'Connection established to Mongo successfully'}`);
        logging.log('---------------------------------------------');
    }
    catch (error) {
        logging.log('---------------------------------------------');
        logging.warning('Failed to establish a connection with Mongo');
        logging.error(error);
        logging.log('---------------------------------------------');
        process.exit(1); // quit if connection fails
    }
    logging.log('---------------------------------------------');
    logging.log('Logging and configuration');
    logging.log('---------------------------------------------');
    exports.application.use(middlewares_1.loggingHandler);
    exports.application.use(middlewares_1.corsHandler);
    exports.application.use(passport_1.default.initialize({ userProperty: 'user' }));
    logging.log('---------------------------------------------');
    logging.log('Define Routers');
    logging.log('---------------------------------------------');
    exports.application.use('/api/v1', routes_1.default);
    logging.log('---------------------------------------------');
    logging.log('Define Routing Error handlers');
    logging.log('---------------------------------------------');
    exports.application.use(middlewares_1.routeNotFound);
    exports.application.use(middlewares_1.errorHandler);
    logging.log('---------------------------------------------');
    logging.log('Start Server');
    logging.log('---------------------------------------------');
    exports.httpServer = http_1.default.createServer(exports.application);
    exports.httpServer.listen(config_1.SERVER.SERVER_PORT, () => {
        logging.log('---------------------------------------------');
        logging.log(`Server Started ${config_1.SERVER_HOSTNAME} : ${config_1.SERVER_PORT}`);
        logging.log('---------------------------------------------');
    });
});
exports.Main = Main;
const Shutdown = (callback) => exports.httpServer && exports.httpServer.close(callback);
exports.Shutdown = Shutdown;
(0, exports.Main)();
