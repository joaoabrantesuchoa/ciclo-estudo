import { Router } from 'express';
import subjectService from '../services/subsectService';

const router = Router();

router.post('/', async (req, res) => {
  const { name, totalTime, actualTime } = req.body;

  try {
    const newSubject = await subjectService.createSubject(
      name,
      totalTime,
      actualTime ?? 0,
    );
    res.status(201).json(newSubject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/', async (_req, res) => {
  try {
    const subjects = await subjectService.getAllSubjects();
    res.status(200).json(subjects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter os Subjects.' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, totalTime, actualTime } = req.body;

  try {
    const updatedSubject = await subjectService.updateSubject(
      id,
      name,
      totalTime,
      actualTime,
    );
    res.status(200).json(updatedSubject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar o Subject.' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await subjectService.deleteSubject(id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir o Subject.' });
  }
});

export default router;
