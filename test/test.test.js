const request = require('supertest');
const app = require('../index');

const dummyDetail = {
    username: "dongido1",
    password: "dongido"
}

async function getToken(username, password) {
    return await request(app).post("/users/authenticate")
        .send(dummyDetail)
}

describe('Test the root path', () => {    
    test('It should response the GET method', () => {
        return request(app).get("/").then(response => {
            expect(response.statusCode).toBe(200)
        })
    });

    test('It should response give a 403 error if no token is provided', () => {
        return request(app).get("/users").then(response => {
            expect(response.statusCode).toBe(401)
        })
    });

    test('It should return 200 status', () => {
        return request(app).get("/users")
                .set('Authorization', 'token')
                .then(response => {
            expect(response.statusCode).toBe(401)
        })
    });

    test('It should be able to generate a token', () => {
        return request(app)
                .post("/users/authenticate")
                .set('Accept', 'application/json')
                .send(dummyDetail)
                .then(response => {
                    expect(response.statusCode).toBe(200)
                    expect(typeof response.body).toBe("object")
                    expect(typeof response.body.token).toBe("string")
        })
    });
})