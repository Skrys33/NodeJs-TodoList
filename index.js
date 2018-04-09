const express = require('express');
const bodyParser = require("body-parser");

const Todo = require('./models/todo.js');
const Controller = require('./controllers/todos.js');

const app = express();
const PORT = process.env.PORT||8080;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',function(req,res){
});

app.get('/todos', (req,res) => {
    Controller.index(req,res);
});


app.get('/todos/add', (req,res) => {
    Controller.pageInsertTodo(req,res);
});


app.post('/todos', (req,res) => {
    Controller.insertTodo(req,res);
});

app.get('/todos/:todoId', (req,res) => {
    let header = req["headers"]["content-type"];
    if(header == "application/json") {        
        Controller.jsonIdTodo(req,res);
    }
    else {
        Controller.pageIdTodo(req,res);
    }
});

app.get('/todos/:todoId/delete',(req,res) => {
    Controller.deleteTodo(req,res);
});

app.get('/todos/:todoId/edit', (req,res) => {
    Controller.pageUpdateTodo(req,res);
});

app.get('/todos/:todoId/register', (req,res) => {
    Controller.updateTodo(req,res);
});

app.use(function(req, res, next) {
    res.status(404);
    res.json({status:404,title:"Not Found",msg:"Route not found"});
    next();
});

app.listen(PORT,() => {
    console.log("Serveur sur port : " + PORT);
});