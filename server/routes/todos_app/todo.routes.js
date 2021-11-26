const express = require("express");
const router = express.Router();
const {
    checkTodos,
    getTodos,
    addTodo,
    deleteTodo,
    updateTodo
} = require("../../controllers/todos_app/todo.controller");


router.route("/",)
.get(checkTodos,getTodos)
.post(checkTodos,addTodo)

router.route("/:todoId").post(checkTodos,updateTodo);
router.route("/:todoId").delete(checkTodos,deleteTodo);

module.exports = router;
