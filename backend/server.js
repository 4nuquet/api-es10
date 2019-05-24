import express from 'express';
import indexRoutes from './routes/index.routes';
import bookRoutes from './routes/book.routes';

const app = express();

//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Routes
app.use(indexRoutes);
app.use('/book', bookRoutes);

export default app;