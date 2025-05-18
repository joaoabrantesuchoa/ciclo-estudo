import express from 'express';
import cors from 'cors';
import subjectRoutes from './routes/subjectRoutes';

const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN?.split(",") || "*",
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
