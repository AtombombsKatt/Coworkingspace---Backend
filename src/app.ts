import express from 'express';
import routes from './routes';
import path from 'path';
import { errorMiddleware } from './middlewares/errorMiddleware';

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public'))); 
app.use('/api', routes);
//errormiddleware för att fånga fel globalt
app.use(errorMiddleware);
export default app;

