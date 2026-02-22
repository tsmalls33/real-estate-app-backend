"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedPasswordHash = seedPasswordHash;
const bcrypt_1 = __importDefault(require("bcrypt"));
const SALT_ROUNDS = 12;
async function seedPasswordHash(plain) {
    return bcrypt_1.default.hash(plain, SALT_ROUNDS);
}
//# sourceMappingURL=_password.js.map