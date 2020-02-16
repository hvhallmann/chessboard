const usingMockDb = (process.env.USE_MOCK_DB || '').toLowerCase();
let userDaoPath = './User/UserDao';
let movementDaoPath = './Movement/MovementDao';

if (usingMockDb === 'true') {
    userDaoPath += '.mock';
    movementDaoPath += '.mock';
}

// tslint:disable:no-var-requires
export const { UserDao } = require(userDaoPath);
export const { MovementDao } = require(movementDaoPath);
