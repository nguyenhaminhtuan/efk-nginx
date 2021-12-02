const { Router } = require('express');
const logger = require('./logger');

const users = [
  {
    username: 'tuan@nguyen.com',
    firstName: 'Tuan',
    lastName: 'Nguyen',
    age: 24,
  },
];

const router = Router();

router
  .get('/', (req, res) => {
    return res.status(200).json(users);
  })
  .get('/:username', (req, res) => {
    const user = users.find((u) => u.username === req.params.username);
    if (!user) {
      const error = new Error('User not found');
      error.status = 404;
      throw error;
    }

    return res.status(200).json(user);
  })
  .post('/', (req, res) => {
    const user = req.body;
    const existsUser = users.find((u) => u.username === user.username);
    if (existsUser) {
      const error = new Error('Username already exists');
      error.status = 409;
      throw error;
    }

    logger.info('Creating user with username %s', user.username);
    users.push(user);
    logger.info('User %o created', user);
    return res.status(201).json(user);
  })
  .put('/', (req, res) => {
    throw new Error('Kaboom');
  })
  .delete('/:username', (req, res) => {
    const user = users.find((u) => u.username === req.params.username);
    if (!user) {
      const error = new Error('User not found');
      error.status = 404;
      throw error;
    }

    logger.info('Deleting user with username %s', req.params.username);
    users = users.filter((u) => u.username !== req.params.username);
    return res.status(204).end();
  });

module.exports = router;
