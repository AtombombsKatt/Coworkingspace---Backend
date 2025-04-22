"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = void 0;
const apiError_1 = require("../utils/apiError");
const requireAdmin = (req, res, next) => {
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== 'Admin') {
        throw new apiError_1.ApiError(403, 'endast admin har tillgång');
    }
    next();
};
exports.requireAdmin = requireAdmin;
