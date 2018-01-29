var AddTodos = require("./componets/AddTodos");
var Presenter = require('./modules/presenter/Presenter');
var TodosList = require('./componets/todos_list/TodosList');
var TodosBar = require('./componets/TodosBar');

function init() {
    var addTodos = new AddTodos();
    var todosList = new TodosList();
    var todosbar = new TodosBar();
    var presenter = new Presenter();
}

document.addEventListener('DOMContentLoaded', init);