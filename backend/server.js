import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();


const app = express();

// body-parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// middlewares
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:5000');
});