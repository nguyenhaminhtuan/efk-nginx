const express = require('express');
const logger = require('./logger');
const httpLogger = require('./http-logger');
const usersRouter = require('./users.routes');

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  httpLogger(req, res);
  next();
});

app.use('/users', usersRouter);

app.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({
    message: err.status ? err.message : 'Something went wrong',
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => logger.info('Server is running'));
