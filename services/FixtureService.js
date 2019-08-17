const config = require('../config.json');
const jwt = require('jsonwebtoken');
const Fixture = require('../documents/Fixture');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    getCompleted,
    getPending
};

async function getAll() {
    return await Fixture.find();
}

async function getCompleted() {
    // return await Fixture.find().select('-hash');
    console.log(new Date(), Date.now())
    return await Fixture.find({"dateTime": {"$lt": Date.now()}});
}

async function getPending() {
    return await Fixture.find({"dateTime": {"$gte": Date.now()}});
}

async function getById(id) {
    return await Fixture.findById(id);
}

async function create(fixtureParam) {
    const fixture = new Fixture(fixtureParam);

    return fixture.save();
}

async function update(id, userParam) {
    const user = await Fixture.findById(id);

    // validate
    if (!fixture) throw 'Team not found';
    if (fixture.username !== teamParam.teamname && await Fixture.findOne({ teamname: teamParam.teamname })) {
        throw 'Team "' + teamParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (teanParam.password) {
        teamParam.hash = bcrypt.hashSync(teamParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, teamParam);

    await fixture.save();
}

async function _delete(id) {
    await Fixture.findByIdAndRemove(id);
}