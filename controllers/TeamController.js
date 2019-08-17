const express = require('express');
const router = express.Router();
const TeamService = require('../services/TeamService');

const {permit} = require('../jwt')

// routes
router.post('/create', permit('admin'), create);
router.get('/', getAll);
router.get('/:id', getById);
router.get('/search/:query', search);
router.put('/:id', permit('admin'), update);
router.delete('/:id', permit('admin'), _delete);

module.exports = router;

async function create(req, res, next) {
    if (!req.user.role.includes('admin')) {
        return res.status(400).json({status: "error", message: "You are not authorize"});
    }

    TeamService.create({...req.body, cretedBy: req.user.sub})
        .then((team) => res.status(201).json({status: "success", team}))
        .catch(err => res.status(200).json({status: "error", err}) );
}

function getAll(req, res, next) {
    TeamService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getById(req, res, next) {
    TeamService.getById(req.params.id)
        .then(team => team ? res.json(team) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    TeamService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    TeamService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function search(req, res, next) {
    const query = req.params.query

    TeamService.search(query)
        .then(() => res.json({}))
        .catch(err => next(err));
}