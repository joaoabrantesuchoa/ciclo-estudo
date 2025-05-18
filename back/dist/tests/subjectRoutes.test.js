"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const express_1 = __importDefault(require("express"));
const supertest_1 = __importDefault(require("supertest"));
const prismaClient_1 = __importDefault(require("../prisma/prismaClient"));
const subjectRoutes_1 = __importDefault(require("../routes/subjectRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/subjects", subjectRoutes_1.default);
(0, vitest_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prismaClient_1.default.subject.deleteMany();
}));
(0, vitest_1.afterAll)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prismaClient_1.default.$disconnect();
}));
(0, vitest_1.describe)("Subject Routes", () => {
    (0, vitest_1.it)("Deve criar um novo Subject", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post("/subjects").send({
            name: "Matemática",
            totalTime: 120,
            actualTime: 60,
        });
        (0, vitest_1.expect)(response.status).toBe(201);
        (0, vitest_1.expect)(response.body).toHaveProperty("id");
        (0, vitest_1.expect)(response.body.name).toBe("Matemática");
    }));
    (0, vitest_1.it)("Deve obter todos os Subjects", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/subjects");
        (0, vitest_1.expect)(response.status).toBe(200);
        (0, vitest_1.expect)(response.body).toBeInstanceOf(Array);
        (0, vitest_1.expect)(response.body.length).toBeGreaterThan(0);
    }));
    (0, vitest_1.it)("Deve atualizar um Subject pelo ID", () => __awaiter(void 0, void 0, void 0, function* () {
        // Criar um Subject para atualizar
        const subject = yield prismaClient_1.default.subject.create({
            data: {
                name: "Física",
                totalTime: 90,
                actualTime: 30,
            },
        });
        const response = yield (0, supertest_1.default)(app).put(`/subjects/${subject.id}`).send({
            name: "Física Avançada",
            totalTime: 100,
            actualTime: 50,
        });
        (0, vitest_1.expect)(response.status).toBe(200);
        (0, vitest_1.expect)(response.body.name).toBe("Física Avançada");
        (0, vitest_1.expect)(response.body.totalTime).toBe(100);
        (0, vitest_1.expect)(response.body.actualTime).toBe(50);
    }));
    (0, vitest_1.it)("Deve excluir um Subject pelo ID", () => __awaiter(void 0, void 0, void 0, function* () {
        // Criar um Subject para excluir
        const subject = yield prismaClient_1.default.subject.create({
            data: {
                name: "Química",
                totalTime: 60,
                actualTime: 45,
            },
        });
        const response = yield (0, supertest_1.default)(app).delete(`/subjects/${subject.id}`);
        (0, vitest_1.expect)(response.status).toBe(204);
        // Verificar se o Subject foi realmente excluído
        const deletedSubject = yield prismaClient_1.default.subject.findUnique({
            where: { id: subject.id },
        });
        (0, vitest_1.expect)(deletedSubject).toBeNull();
    }));
});
