var AddTodos = require('./add-todos/AddTodos');
var TodosList = require('./todos_list/TodosList');
var TodosBar = require('./todos-bar/TodosBar');

function TodosContainerConstructor() {}

var TodosContainerConstructorPrototype = TodosContainerConstructor.prototype;

TodosContainerConstructorPrototype.render = function (currentModel) {
    console.log(currentModel);
    AddTodos.setVisibility(currentModel.todosArray.length);
    TodosList.render(currentModel);
    TodosBar.render(currentModel.todosArray, currentModel.currentFilter);
};

module.exports = new TodosContainerConstructor();