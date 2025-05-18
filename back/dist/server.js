"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const subjectRoutes_1 = __importDefault(require("./routes/subjectRoutes"));
const app = (0, express_1.default)();
const corsOptions = {
    origin: ((_a = process.env.CORS_ORIGIN) === null || _a === void 0 ? void 0 : _a.split(",")) || "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOptions));
app.use('/subjects', subjectRoutes_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
