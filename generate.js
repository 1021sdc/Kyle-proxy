const faker = require('faker');

const generate = (userContext, events, done) => {
    let id = faker.random.number({min: 1, max: 10000000});
    userContext.vars.id = id;
    return done();
}


module.exports = {
    generate,
};
