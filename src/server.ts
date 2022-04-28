import morgan from 'morgan';
import helmet from 'helmet';
import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import BaseRouter from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV === 'production') {
	app.use(morgan(':remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms'));
} else {
	app.use(morgan('dev'));
}

if (process.env.NODE_ENV === 'production') {
	app.use(helmet());
}

app.use('/', BaseRouter);

app.use((req: Request, res: Response, next) => {
	const err: any = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use((err: any, req: Request, res: Response, next: any) => {
	console.log(err);
	if (err.status === 404) res.status(404).json({ message: 'not found' });
	else res.status(500).json({ message: 'something looks wrong :P' });
});

export default app;
