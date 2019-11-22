let {getUsers, addUser, deleteUser, getUser, updateUser} = require('../dal/users-repository');
const express = require("express");
const router = express.Router();

//middleware to this router
router.use(function timeLog(req, res, next){
    console.log('Time', Date.now());
    next();
});

router.get('/', async (req, res)=>{
    let users = await getUsers(req.query.search);
    res.send(users);
    console.log('getUsers');
});

router.get('/:id', async (req, res)=>{
    const userId = req.params.id;
    let user = await getUser(userId);
    if (user) res.send(user);
    res.send(404)
});

router.put('/', async (req, res)=>{
    let newUser = req.body.firstName;
    const userId = req.body.id;
    await updateUser(userId, newUser);
    res.send(204)
});
router.delete('/:id', async (req, res)=>{
    const userId = req.params.id;
    await deleteUser(userId);
    res.send(204)
});
router.post('/', async (req, res)=>{
    let name = req.body.firstName;
    await addUser(name);

    res.send({success: true});
});

module.exports = router;