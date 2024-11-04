"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomErrors = void 0;
class CustomErrors extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
        this.code = code;
    }
}
exports.CustomErrors = CustomErrors;
