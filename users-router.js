let {getUsers, addUser} = require('./repository');
const express = require("express");
const router = express.Router();

router.get('/', async (req, res)=>{
    let users = await getUsers();

    if(!!req.query.search) {
        users = users.filter(u=> u.firstName.indexOf(req.query.search) > -1)
    }
    res.send(users);
    console.log('getUsers');
});

router.get('/:id', async (req, res)=>{
    const userId = req.params.id;
    let users = await getUsers();
    let user = users.find(u => u.id === +userId);
    if (user) res.send(user);
    res.send(404)
});

router.post('/', async (req, res)=>{
    let name = req.body.firstName;
    let result = await addUser(name);
    res.send({success: true});
});

module.exports = router;