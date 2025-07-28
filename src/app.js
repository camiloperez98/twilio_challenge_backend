import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';

import userRoutes from './routes/user.route.js';
import verifyRoutes from './routes/verify.route.js';
import buyRoutes from './routes/buy.route.js';
import webHookRoutes from './routes/webHook.route.js';
import productRoutes from './routes/product.route.js';

dotenv.config();

const app = express();

app.use(cors()); //para permitir solicitudes de diferentes orígenes
app.use(helmet()); //para mejorar la seguridad de la aplicación y proteger contra ataques comunes
app.use(express.json()); //parcea el cuerpo de las solicitudes a formato JSON
app.use(morgan('dev')); //para registrar las solicitudes HTTP en la consola
app.use(express.urlencoded({ extended: true })); //para analizar el cuerpo de las solicitudes URL-encoded

app.use('/api/users', userRoutes);
app.use('/api/verify', verifyRoutes);
app.use('/api/', buyRoutes);
app.use('/api/', webHookRoutes);
app.use('/api/', productRoutes);

export default app;
