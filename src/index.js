import express, { json } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';

require('dotenv').config();

const app = express();

const port = process.env.PORT || 3001;
const host = process.env.HOST || 'localhost';

app.use(morgan('dev')); // TODO remove this and the corresponding node package
app.use(cors()); // TODO this should have a specific policy later
app.use(json());
app.use(routes);
app.listen(port, host, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://${host}:${port}`);
});
