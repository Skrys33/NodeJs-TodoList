const pug = require('pug');
const moment = require('moment');

const Todo = require('../models/todo.js');

moment.locale('fr');

async function index(req,res) {
    let text = './views/todos/index.pug';
    let renderIndex = pug.compileFile(text);
    let todos = await Todo.findAll();

    let html = renderIndex({
        title: 'Todos',
        todos : todos
    });

    res.writeHead(200, { 'Content-Type': 'text/html' } )
    res.write(html);
    res.end();
}

async function pageIdTodo(req,res) {
    let todoId = req.params.todoId;
    let text = './views/todos/show.pug';
    let renderIndex = pug.compileFile(text);
    let todo = await Todo.findOne({
        where: { id: todoId }
    });

    let html = renderIndex({ title: 'Todos', todo : todo });

    res.writeHead(200, { 'Content-Type': 'text/html' } )
    res.write(html);
    res.end();
  }

async function jsonIdTodo(req,res) {
    let todoId = req.params.todoId;
    let todo = await Todo.findOne({
        where: { id: todoId }
    });

    res.json(todo);
}


async function pageInsertTodo(req,res) {
    let text = './views/todos/insert.pug';
    let renderAdd = pug.compileFile(text);
    let html = renderAdd({
        title: "Ajout d'un Todo"
    });

    res.writeHead(200, { 'Content-Type': 'text/html' } )
    res.write(html);
    res.end();
}

async function pageUpdateTodo(req,res) {
    let todoId = req.params.todoId;
    let todo = await Todo.findOne({
        where: { id: todoId }
    });
    let text = './views/todos/edit.pug';
    let renderEdit = pug.compileFile(text);
    let html = renderEdit({
        title : "Modifier un Todo",
        todo : todo
    });
    res.writeHead(200, { 'Content-Type': 'text/html' } )
    res.write(html);
    res.end();
}

async function insertTodo(req,res) {
    let header = req["headers"]["content-type"];
    let message = req.body.message;
    let heure = moment().format('LLL');
    let json = {
        message:message,
        completion:"non",
        created: heure,
    }
    Todo.create(json);
    if(header == "application/json") {        
        res.json(json);
    }
    else {
        return res.redirect(301,"http://localhost:8080/todos");
    }
}

async function deleteTodo(req,res) {
    let idTodo = req.params.todoId;
    Todo.destroy({
        where: {
            id: idTodo
        }
    });
    let header = req["headers"]["content-type"];
    if(header == "application/json") {
        let json = {
            id:idTodo,
            status:'deleted'
        }
        res.json(json);    
    }
    else {
        return res.redirect(301,'/todos');  
    }
}

async function updateTodo(req,res) {
    let header = req["headers"]["content-type"];
    let todoId = req.params.todoId;
    let message = req.body.message;
    let completion = req.body.completion;
    let heure = moment().format('LLL');
    Todo.update({
        message : message,
        completion : completion,
        updated : heure
    }, {
    where: {
        id:todoId
        }
    });
    if(header == "application/json") {
        todoController.jsonIdTodo(req,res);
    }
    else {
        return res.redirect(301, '/todos');        
    }      
}

  module.exports = {index, pageIdTodo, jsonIdTodo, pageInsertTodo, 
    pageUpdateTodo, insertTodo, deleteTodo, updateTodo};