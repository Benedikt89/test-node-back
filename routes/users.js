import express from "express";
import {usersRepository} from "./dal/users";

const router = express.Router();

/* GET users listing. */
router.get('/',
  function (req, res) {
    try {
      usersRepository.getUsers().then(users => {
        res.send(users);
      }).catch(e => console.log(e));
    } catch (e) {
      res.send(e.message)
    }
  });

router.put('/',
  async (req, res) => {
    try {
      let newUser = req.body;
      let updated = await usersRepository.updateUser(newUser);
      res.status(200).send(updated)
    } catch (e) {
      res.status(402).send(e)
    }
  });

router.delete('/:id',
  async (req, res) => {
    try {
      const userId = req.params.id;
      let founded = await usersRepository.getTodo(userId);
      await usersRepository.deleteUser(userId);
      return res.status(204).send(founded)
    } catch (e) {
      return res.status(400).send(e);
    }
  });

router.post('/',
  async (req, res) => {
    try {
      let user = {...req.body};
      let result = await usersRepository.addUser(user);
      return res.send(result);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  });

export default router;