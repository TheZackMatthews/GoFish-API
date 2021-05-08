const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');

const app = express();

const port = process.env.PORT || 3001;
const host = process.env.HOST || 'localhost';

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(routes);
app.listen(port, host, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://${host}:${port}`);
});

// gofish.cjz2iriyd5i6.us-east-2.rds.amazonaws.com:5432