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
const express_1 = require("express");
const subsectService_1 = __importDefault(require("../services/subsectService"));
const router = (0, express_1.Router)();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, totalTime, actualTime } = req.body;
    try {
        const newSubject = yield subsectService_1.default.createSubject(name, totalTime, actualTime !== null && actualTime !== void 0 ? actualTime : 0);
        res.status(201).json(newSubject);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subjects = yield subsectService_1.default.getAllSubjects();
        res.status(200).json(subjects);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao obter os Subjects.' });
    }
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, totalTime, actualTime } = req.body;
    try {
        const updatedSubject = yield subsectService_1.default.updateSubject(id, name, totalTime, actualTime);
        res.status(200).json(updatedSubject);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar o Subject.' });
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield subsectService_1.default.deleteSubject(id);
        res.status(204).send();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao excluir o Subject.' });
    }
}));
exports.default = router;
