var TodosFilters = require('./TodosFilters');
var TodosCounter = require('./TodosCounter');
var TodosDeleteAllCompletedButton = require('./TodosDeleteAllCompletedButton');

var TODOS_BAR = ".todos-actions-bar";

function TodosBarConstructor() {
}

var todosBarConstructorPrototype = TodosBarConstructor.prototype;

todosBarConstructorPrototype.todoBar = document.querySelector(TODOS_BAR);

todosBarConstructorPrototype.setVisibility = function (num) {
    if (num == 0) {
        todosBarConstructorPrototype.todoBar.style.display = "none"
    } else {
        todosBarConstructorPrototype.todoBar.style.display = "flex"
    }
};

todosBarConstructorPrototype.render = function (currentModel) {
    todosBarConstructorPrototype.setVisibility(currentModel.todosArray.length);
    TodosCounter.render(currentModel.todosArray);
    TodosFilters.render(currentModel.currentFilter);
};

module.exports = new TodosBarConstructor();