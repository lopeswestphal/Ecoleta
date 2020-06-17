import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes';
import { errors } from 'celebrate';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

// funcao(express.static) que serve para acessar arquivos estaticos'EX: imagens, PDFs, Word etc...'
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads'))); 

app.use(errors());

app.listen(3333);
