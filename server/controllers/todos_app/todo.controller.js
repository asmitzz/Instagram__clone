const Todos = require("../../models/todos_app/todo.model");

const checkTodos = async (req, res, next) => {
    const {user:{_id}} = req;
    const todos = await Todos.findOne({userId:_id});
    console.log(todos)
    req.todos = todos;
    next();
};

const getTodos = async(req,res) => {
    const { todos } = req;
    if (todos) {
        return res.status(200).json({
            todos:todos,
        });
    }
    res.status(404).json({
        message:"Todos not found",
    });
}

const addTodo = async(req,res) => {
    const { todos,user:{ _id } } = req;
    if (todos) {
        todos.todos.push(req.body);
        await todos.save();
        return res.status(201).json({
            success:true,
            todos:todos,
            message:"Todo added successfully"
        });
    }
    await Todos({
        userId:_id,
        todos:[req.body]
    }).save((err,todos) => {
        console.log(err)
        if(err){
            return res.status(422).json({
                success:false,
                message:err
            });
        }
        res.status(201).json({
            success:true,
            todos:todos,
            message:"Todo added succesfully"
        });
    });

    
}

const deleteTodo = async(req,res) => {
    const { todos } = req;
    const { todoId } = req.params;
    if (todos) {
        todos.todos.remove(todoId);
        await todos.save();
        return res.status(201).json({
            success:true,
            todos:todos,
            message:"Todo deleted successfully"
        });
    }

    res.status(404).json({
        success:false,
        message:"Todo not found"
    });
}

const updateTodo = async(req,res) => {
    const { todos } = req;
    const { todoId } = req.params;
    if (todos) {
        todos.todos = todos.todos.map(todo => todo._id == todoId ? req.body : todo);
        await todos.save();
        return res.status(201).json({
            success:true,
            todos:todos,
            message:"Todo updated successfully"
        });
    }
    res.status(404).json({
        success:false,
        message:"Todo not found"
    });
}

module.exports = {
    checkTodos,
    getTodos,
    addTodo,
    deleteTodo,
    updateTodo
}