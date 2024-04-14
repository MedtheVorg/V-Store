"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeNotFound = void 0;
function routeNotFound(req, res, next) {
    const error = new Error('Endpoint Not found.');
    logging.warning(error);
    return res.status(404).json({
        error: {
            message: error.message
        }
    });
}
exports.routeNotFound = routeNotFound;
