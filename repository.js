// let users = [
//     {
//         id: 1,
//         firstName: 'ben',
//         lastName: 'ben',
//         image: true,
//         pdf: true,
//     },
//     {
//         id: 2,
//         firstName: 'olya',
//         lastName: 'ben',
//         image: true,
//         pdf: true,
//     },
//     {
//         id: 3,
//         firstName: 'nikita',
//         lastName: 'ben',
//         image: true,
//         pdf: true,
//     },
// ];

const {readJsonFromFile, writeJsonToFile} = require("./fs-utils");

const getUsers = () => {
    return readJsonFromFile("db");
};

const addUser = async (name) => {
    let users = await getUsers();
    let newUser = {
        id: users.length + 1,
        firstName: name,
    };
    return writeJsonToFile("db",[...users, newUser])
};

exports.getUsers = getUsers;
exports.addUser = addUser;