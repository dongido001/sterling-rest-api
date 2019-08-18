const expressJwt = require('express-jwt');
const config = require('./config.json');
const UserService = require('./services/UserService');

module.exports = {
    jwt,
    permit
};

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/',
            '/users/authenticate',
            '/users/register'
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await UserService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};

function permit(...allowed) {
    const isAllowed = roles => () => {
        roles.forEach(role => {
            if (allowed.includes(role)) return true;
        });

        return false;
    }
    
    // return a middleware
    return (request, response, next) => {
      if (request.user && isAllowed(request.user.role))
        next(); // role is allowed, so continue on the next middleware
      else {
        response.status(403).json({status: "error", message: "Forbidden"}); // user is forbidden
      }
    }
}