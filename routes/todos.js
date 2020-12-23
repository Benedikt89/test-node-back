import express from "express";
import {todosRepository} from "./dal/todos";

const router = express.Router();

/* GET users listing. */
router.get('/',
    function (req, res) {
        try {
            todosRepository.getTodos().then(todos => {
                res.send(todos);
                console.log('get todos');
            }).catch(e => console.log(e));
        } catch (e) {
            console.log(e);
            res.send(e.message)
        }
    });
// router.get('/:id',
//     async (req, res) => {
//       const todoId = req.params.id;
//       let product = await todosRepository.getTodos(todoId);
//       if (product) {
//           res.send(product);
//       }
//       res.send(404)
//     });

router.put('/',
    async (req, res) => {
      try {
        let newTodo = req.body;
        let updated = await todosRepository.updateTodo(newTodo);
        res.status(200).send(updated)
      } catch (e) {
        res.status(402).send(e)
      }
    });

router.delete('/:id',
    async (req, res) => {
        try {
            const todoId = req.params.id;
            let founded = await todosRepository.getTodo(todoId);

            todosRepository.deleteTodo(todoId);

            return res.status(204).send(founded)
        } catch (e) {
            return res.status(400).send(e);
        }
    });

router.post('/',
    async (req, res) => {
        try {
            let todo = {...req.body};
            let result = await todosRepository.addTodo(todo);
            return res.send(result);
        } catch (error) {
            console.log(error);
            return res.status(400).send(error);
        }
    });

export default router;