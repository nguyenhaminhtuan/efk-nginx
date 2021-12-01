const pinoHttp = require('pino-http');
const logger = require('./logger');

const httpLogger = pinoHttp({
  logger,
  customLogLevel: function (res, err) {
    if (res.statusCode >= 400 && res.statusCode < 500) {
      return 'error';
    } else if (res.statusCode >= 500 || err) {
      return 'fatal';
    }
    return 'info';
  },
  customSuccessMessage: function (res) {
    if (res.statusCode >= 400) {
      return 'request errored';
    }
    return 'request completed';
  },
  customErrorMessage: function (error, res) {
    return 'request fatal errored';
  },
});

module.exports = httpLogger;
