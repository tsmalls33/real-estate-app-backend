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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("./user.repository");
const bcrypt = __importStar(require("bcrypt"));
const config_1 = require("@nestjs/config");
let UserService = class UserService {
    userRepository;
    configService;
    saltOrRounds;
    constructor(userRepository, configService) {
        this.userRepository = userRepository;
        this.configService = configService;
        const raw = this.configService.get('BCRYPT_SALT_ROUNDS') || '10';
        const rounds = Number(raw);
        if (isNaN(rounds) || rounds < 4 || rounds > 15) {
            throw new Error(`Invalid BCRYPT_SALT_ROUNDS value: ${raw}. It must be a positive integer between 4 and 15.`);
        }
        this.saltOrRounds = rounds;
        console.log(`BCRYPT_SALT_ROUNDS set to: ${this.saltOrRounds}`);
    }
    async createUser(input) {
        const isUserExists = await this.userRepository.existsByEmail(input.email);
        if (isUserExists) {
            throw new common_1.ConflictException('User already exists');
        }
        const hashedPassword = await this.hashPassword(input.password);
        const { email, fullName, role, id_tenant } = input;
        return await this.userRepository.create({
            email,
            fullName,
            role,
            passwordHash: hashedPassword,
            tenant: id_tenant ? { connect: { id_tenant } } : undefined,
        });
    }
    async findAll() {
        return await this.userRepository.findAll();
    }
    async findOne(id_user) {
        const foundUser = await this.userRepository.findById(id_user);
        if (!foundUser) {
            throw new common_1.NotFoundException('User not found');
        }
        return foundUser;
    }
    async findByEmail(email, includePrivate = false) {
        const foundUser = await this.userRepository.findByEmail(email, includePrivate);
        if (!foundUser) {
            throw new common_1.NotFoundException('User not found');
        }
        return foundUser;
    }
    async update(id_user, input) {
        if (input.email === undefined &&
            input.fullName === undefined &&
            input.role === undefined &&
            input.id_tenant === undefined) {
            throw new common_1.BadRequestException('No fields to update');
        }
        if (input.email) {
            const emailExists = await this.userRepository.existsByEmail(input.email);
            if (emailExists) {
                throw new common_1.ConflictException(`User email '${input.email}' already exists`);
            }
        }
        const userExists = await this.userRepository.existsById(id_user);
        if (!userExists) {
            throw new common_1.NotFoundException('User not found');
        }
        return await this.userRepository.update(id_user, input);
    }
    async remove(id_user) {
        const userExists = await this.userRepository.existsById(id_user);
        if (!userExists) {
            throw new common_1.NotFoundException('User not found');
        }
        return await this.userRepository.delete(id_user);
    }
    async hashPassword(password) {
        return await bcrypt.hash(password, this.saltOrRounds);
    }
    async verifyPassword(plainTextPassword, hashedPassword) {
        return await bcrypt.compare(plainTextPassword, hashedPassword);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        config_1.ConfigService])
], UserService);
//# sourceMappingURL=user.service.js.map