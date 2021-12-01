const pino = require('pino');

const isProd = process.env.NODE_ENV === 'production';

const logger = pino({
  name: 'user-service',
  level: process.env.LOG_LEVEL || 'debug',
  formatters: {
    level(label) {
      return { level: label };
    },
  },
  transport: !isProd && {
    target: 'pino-pretty',
    options: {
      colorize: true,
      singleLine: true,
      translateTime: true,
    },
  },
});

module.exports = logger;
