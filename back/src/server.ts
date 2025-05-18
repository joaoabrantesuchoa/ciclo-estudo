import express from 'express';
import cors from 'cors';
import subjectRoutes from './routes/subjectRoutes';

const app = express();

const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(express.json());
app.use(cors(corsOptions));

app.use('/subjects', subjectRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
