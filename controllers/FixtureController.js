const express = require('express');
const router = express.Router();
const FixtureService = require('../services/FixtureService');

const {permit} = require('../jwt')

// routes
router.post('/create', permit('admin'), create);
router.get('/', getAll);
router.get('/completed', getCompleted);
router.get('/pending', getPending);
router.get('/:id', getById);
router.put('/:id', permit('admin'), update);
router.delete('/:id', permit('admin'), _delete);

module.exports = router;

async function create(req, res, next) {
    FixtureService.create({...req.body, cretedBy: req.user.sub})
        .then((fixture) => res.status(201).json({status: "success", fixture}))
        .catch(err => res.status(400).json({status: "error", err}) );
}

function getAll(req, res, next) {
    FixtureService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCompleted(req, res, next) {
    FixtureService.getCompleted()
        .then(fixtures => res.json(fixtures))
        .catch(err => res.status(400).json({status: "error", err}) );   
}

function getPending(req, res, next) {
    FixtureService.getPending()
        .then(fixtures => res.json(fixtures))
        .catch(err => res.status(400).json({status: "error", err}) );   
}

function getById(req, res, next) {
    FixtureService.getById(req.params.id)
        .then(fixture => fixture ? res.json(fixture) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    FixtureService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    FixtureService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}