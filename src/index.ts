import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes/routes';
import HttpException from './models/http-exception.model';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(express.static('public'));

app.get('/', (req: Request, res: Response) => {
  res.json({ status: 'API is running on /api' });
});

app.use((err: Error | HttpException, req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  if (err && err.errorCode) {
    // @ts-ignore
    res.status(err.errorCode).json(err.message);
  } else if (err) {
    res.status(500).json(err.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.info(`server up on port ${PORT}`);
});

// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()

// async function main() {
   
// }

// // call main and handle error using catch and finally

// main().catch(e => {
//     console.error(e.message)
// }).finally(async () => {
//     await prisma.$disconnect();
// })