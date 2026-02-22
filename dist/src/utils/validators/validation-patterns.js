"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VALIDATION_MESSAGES = exports.FULL_NAME_PATTERN = exports.PASSWORD_PATTERN = void 0;
exports.PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
exports.FULL_NAME_PATTERN = /^[A-Za-z\s]+$/;
exports.VALIDATION_MESSAGES = {
    PASSWORD: 'Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number and one special character',
    FULL_NAME: 'Full name must contain only letters and spaces',
};
//# sourceMappingURL=validation-patterns.js.map