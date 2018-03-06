var TodosFilters = require('./TodosFilters');
var TodosCounter = require('./TodosCounter');
var TodosDeleteAllCompletedButton = require('./TodosDeleteAllCompletedButton');

var TODOS_BAR = ".todos-actions-bar";

function TodosBarConstructor() {
    this.todoBar = document.querySelector(TODOS_BAR);
}

var todosBarConstructorPrototype = TodosBarConstructor.prototype;

todosBarConstructorPrototype.setVisibility = function (num) {
    if (num == 0) {
        this.todoBar.style.display = "none"
    } else {
        this.todoBar.style.display = "flex"
    }
};

todosBarConstructorPrototype.render = function (currentModel) {
    this.setVisibility(currentModel.todosArray.length);
    TodosCounter.render(currentModel.todosArray);
    TodosFilters.render(currentModel.currentFilter);
};

module.exports = new TodosBarConstructor();
