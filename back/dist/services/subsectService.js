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
const prismaClient_1 = __importDefault(require("../prisma/prismaClient"));
class SubjectService {
    // Obter todos os Subjects
    getAllSubjects() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prismaClient_1.default.subject.findMany();
        });
    }
    // Criar um novo Subject
    createSubject(name, totalTime, actualTime) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prismaClient_1.default.subject.create({
                data: {
                    name,
                    totalTime,
                    actualTime,
                },
            });
        });
    }
    // Atualizar um Subject pelo ID (id agora é string)
    updateSubject(id, name, totalTime, actualTime) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prismaClient_1.default.subject.update({
                where: { id },
                data: {
                    name,
                    totalTime,
                    actualTime,
                },
            });
        });
    }
    // Excluir um Subject pelo ID (id agora é string)
    deleteSubject(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prismaClient_1.default.subject.delete({
                where: { id },
            });
        });
    }
}
exports.default = new SubjectService();
