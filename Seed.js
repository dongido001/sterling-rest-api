/**
 * Seed the app with fairly "lots of data"
 */
require("@babel/register")({
    presets: ["@babel/preset-env"]
});

const UserService = require("./services/UserService");
const TeamService = require("./services/UserService");
const Fixture = require('./documents/Fixture');
const User = require('./documents/Users');
const Team = require('./documents/Team');
const bcrypt = require('bcryptjs');

const Roles = {
    user: ['user'],
    admin: ['admin']
}

const adminAccounts = [
    {
        username: "admin",
        password: "admin",
        firstName: "admin",
        lastName: "admin",
        role: Roles.admin
    },
    {
        username: "maker",
        password: "maker",
        firstName: "maker",
        lastName: "maker",
        role: Roles.admin
    },
    {
        username: "dongido",
        password: "dongido",
        firstName: "dongido",
        lastName: "dongido",
        role: Roles.admin
    }
];

const userAccounts = [
    {
        username: "user",
        password: "user",
        firstName: "user",
        lastName: "user",
        role: Roles.user
    },
    {
        username: "user2",
        password: "user2",
        firstName: "user2",
        lastName: "user2",
        role: Roles.user
    },
    {
        username: "user3",
        password: "user3",
        firstName: "user3",
        lastName: "user3",
        role: Roles.user
    },
    {
        username: "user4",
        password: "user4",
        firstName: "user4",
        lastName: "user4",
        role: Roles.user
    },
    {
        username: "user5",
        password: "user5",
        firstName: "user5",
        lastName: "user5",
        role: Roles.user
    }
];

const teams = [
    {
        name: "Chelsea",
        logo: "ddd",
        detail: "kadksda",
        createdBy: null
    },
    {
        name: "Manchester United",
        logo: "ddd",
        detail: "kadksda",
        createdBy: null
    },
    {
        name: "Liverpool",
        logo: "ddd",
        detail: "kadksda",
        createdBy: null
    },
    {
        name: "Barcelona",
        logo: "ddd",
        detail: "kadksda",
        createdBy: null
    },
    {
        name: "Mkilion",
        logo: "ddd",
        detail: "kadksda",
        createdBy: null
    },
]

const fixtures = [
    {
        team1: "Chelsea",
        team2: "Liverpool",
        createdBy: "",
        dateTime: new Date(2019, 03, 01, 20, 10, 00)
    },
    {
        team1: "Chelsea",
        team2: "Liverpool",
        createdBy: "",
        dateTime: new Date(2019, 10, 01, 20, 10, 00)
    },
    {
        team1: "Mkilion",
        team2: "Liverpool",
        createdBy: "",
        dateTime: new Date(2019, 11, 01, 20, 10, 00)
    },
    {
        team1: "Mkilion",
        team2: "Barcelona",
        createdBy: "",
        dateTime: new Date(2019, 02, 01, 20, 10, 00)
    }
]


function seedUsers() {
    async function createUser(userDetail) {
        if (await User.findOne({ username: userDetail.username })) {
            throw 'Username "' + userDetail.username + '" is already taken';
        }
    
        const user = new User(userDetail);
    
        if (userDetail.password) {
            user.hash = bcrypt.hashSync(userDetail.password, 10);
        }
    
        user.role = userDetail.role || ['user']

        return await user.save();
    }

    [...userAccounts, ...adminAccounts].forEach(user => {
        createUser(user)
    })
}

async function seedTeams() {
    const user = await User.findOne()

    teams.forEach(async team => {
        team.createdBy = user._id
        await (new Team(team)).save();
    })
}

async function seedFixtures() {
    const user = await User.findOne()

    fixtures.forEach(async fixture => {
        fixture.createdBy = user._id

        await (new Fixture(fixture)).save();
    })
}

// Seed all ...
( async () => {
    await seedUsers()
    await seedTeams()
    await seedFixtures()
})()