const config = require('../config.json');
const jwt = require('jsonwebtoken');
const Team = require('../documents/Team');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Team.find();
}

async function getById(id) {
    return await Team.findById(id);
}

async function create(teamParam) {
    // validate
    if (await Team.findOne({ name: teamParam.name })) {
        throw 'Team "' + teamParam.name + '" is already taken';
    }

    const team = new Team(teamParam);

    // save user
    return team.save();
}

async function update(id, teamParam) {
    const team = await Team.findById(id);

    // validate
    if (!team) throw 'Team not found';
    if (team.username !== teamParam.teamname && await Team.findOne({ teamname: teamParam.teamname })) {
        throw 'Team "' + teamParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (teamParam.password) {
        teamParam.hash = bcrypt.hashSync(teamParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, teamParam);

    await team.save();
}

async function _delete(id) {
    await Team.findByIdAndRemove(id);
}

async function search(query) {
    // const Team = Team.find({name: query});

    // await Team.find({name});
}