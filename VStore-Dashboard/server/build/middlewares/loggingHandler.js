"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggingHandler = void 0;
function loggingHandler(req, res, next) {
    // log incoming request details
    logging.log(`Incoming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
    // log response details
    res.on('finish', () => {
        logging.log(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
    });
    // call the next middleware
    next();
}
exports.loggingHandler = loggingHandler;
