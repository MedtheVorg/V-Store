"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const schemas_1 = require("../schemas");
const category_controller_1 = require("../controllers/category.controller");
const loader_1 = require("../authentication/passportjs/strategies/loader");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router({ mergeParams: true });
router.get('/', category_controller_1.categoryControllers.readAllCategoriesHandler);
router.get('/:categoryId', (0, middlewares_1.validateSchema)(schemas_1.Schemas.category.read), category_controller_1.categoryControllers.readCategoryHandler);
router.post('/', (0, loader_1.jwtAuth)(), (0, middlewares_1.validateSchema)(schemas_1.Schemas.category.create), category_controller_1.categoryControllers.createCategoryHandler);
router.patch('/:categoryId', (0, loader_1.jwtAuth)(), (0, middlewares_1.validateSchema)(schemas_1.Schemas.category.update), category_controller_1.categoryControllers.updateCategoryHandler);
router.delete('/:categoryId', (0, loader_1.jwtAuth)(), (0, middlewares_1.validateSchema)(schemas_1.Schemas.category.delete), category_controller_1.categoryControllers.deleteCategoryHandler);
exports.default = router;
