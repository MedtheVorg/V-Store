"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const schemas_1 = require("../schemas");
const store_controller_1 = require("../controllers/store.controller");
const loader_1 = require("../authentication/passportjs/strategies/loader");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router();
router.get('/', (0, middlewares_1.validateSchema)(schemas_1.Schemas.store.readAll), store_controller_1.storeControllers.readAllStoresHandler);
router.get('/:storeId', (0, middlewares_1.validateSchema)(schemas_1.Schemas.store.read), store_controller_1.storeControllers.readStoreHandler);
router.post('/', (0, loader_1.jwtAuth)(), (0, middlewares_1.validateSchema)(schemas_1.Schemas.store.create), store_controller_1.storeControllers.createStoreHandler);
router.patch('/:storeId', (0, loader_1.jwtAuth)(), (0, middlewares_1.validateSchema)(schemas_1.Schemas.store.update), store_controller_1.storeControllers.updateStoreHandler);
router.delete('/:storeId', (0, loader_1.jwtAuth)(), (0, middlewares_1.validateSchema)(schemas_1.Schemas.store.delete), store_controller_1.storeControllers.deleteStoreHandler);
exports.default = router;
