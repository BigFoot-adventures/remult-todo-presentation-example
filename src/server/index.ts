import express from 'express';
import { api } from './api';
import session from 'cookie-session';
import { auth } from './auth';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(session({
	secret: process.env['SESSION_SECRET'] || "my secret"
}))
app.use(auth);
app.use(api);

app.listen(3002, () => console.log("Server started"));
