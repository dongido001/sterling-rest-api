const express = require('express');
const router = express.Router();
const UserService = require('../services/UserService');

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function authenticate(req, res, next) {
    UserService.authenticate(req.body)
        .then(user => user 
            ? res.json(user)
            : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => res.status(500).json({status: "error", err}));
}

async function register(req, res, next) {
    UserService.create(req.body)
        .then((user) => res.status(201).json({status: "success", user}))
        .catch(err => res.status(500).json({status: "error", err}));
}

function getAll(req, res, next) {
    UserService.getAll()
        .then(users => res.json(users))
        .catch(err => res.status(500).json({status: "error", err}));
}

function getCurrent(req, res, next) {
    UserService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => res.status(500).json({status: "error", err}));
}

function getById(req, res, next) {
    UserService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => res.status(500).json({status: "error", err}));
}

function update(req, res, next) {
    UserService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    UserService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => res.status(500).json({status: "error", err}));
}