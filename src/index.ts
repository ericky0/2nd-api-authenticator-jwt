require('dotenv').config();
import 'reflect-metadata';
import cors from 'cors';
import express from 'express';
import path from 'path';
import router from './routes';
import './database/connection.ts';
import morgan from 'morgan';


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev')); 
app.use(router);
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')))

app.listen(3000, () =>
  console.log('🔥 server started at http://localhost:3000')
);
