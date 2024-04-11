"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
const mongoose_1 = __importStar(require("mongoose"));
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String
    }
}, {
    versionKey: false,
    timestamps: true,
    collection: 'users'
});
//  User Schema methods
UserSchema.methods = {
    validatePassword: function (candidatePassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, bcrypt_1.compare)(candidatePassword, this.password);
            }
            catch (error) {
                logging.error('Failed to validate password');
                return false;
            }
        });
    }
};
//  User Schema Middlewares
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        logging.warn('is modified :', this.isModified('password'));
        logging.warn('is New :', this.isNew);
        logging.warn('Result  :', this.isModified('password') || this.isNew);
        if (this.isModified('password') || this.isNew) {
            logging.warn('unhashed password : ', this.password);
            const salt = yield (0, bcrypt_1.genSalt)(12);
            const hashedPassword = yield (0, bcrypt_1.hash)(this.password, salt);
            logging.warn('hashed password : ', hashedPassword);
            this.password = hashedPassword;
        }
        next();
    });
});
exports.default = mongoose_1.default.model('User', UserSchema);
