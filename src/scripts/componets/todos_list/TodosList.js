var TodosItem = require('./TodosItem');
var EventBus = require('../../utils/EventBus');
var EventsTypes = require('../../constants/EventsTypes');

var TODOS_LIST = ".todos-list";

var TODOS_DELETE_BUTTON_CLASS_NAME = "todos-item_delete";
var TODOS_CHECKBOX_CLASS_NAME =
    ["todos-item_done-mark", "todos-item_undone-mark"];


function TodosListConstructor() {
    this.todosList.addEventListener('click', this.handlerClick);
}

var todosListConstructorPrototype = TodosListConstructor.prototype;

todosListConstructorPrototype.todosList = document.querySelector(TODOS_LIST);

todosListConstructorPrototype.bus = EventBus;

todosListConstructorPrototype.handlerClick = function (event) {
    switch (event.target.className) {
        case TODOS_CHECKBOX_CLASS_NAME[0]:
        case TODOS_CHECKBOX_CLASS_NAME[1]: {
            todosListConstructorPrototype.bus.emit(
                EventsTypes.TOGGLE_TODOS,
                event.target.parentNode.parentNode.id
            )
        } break;

        case TODOS_DELETE_BUTTON_CLASS_NAME: {
            todosListConstructorPrototype.bus.emit(
                EventsTypes.DELETE_TODOS,
                event.target.parentNode.parentNode.id
            )
        } break;
    }
};

todosListConstructorPrototype.render = function (currentModel) {
    todosListConstructorPrototype.todosList.innerHTML = "";

    currentModel.todosArray.forEach(function (todoModel) {
        todosListConstructorPrototype.todosList.appendChild(
            TodosItem.render(todoModel, currentModel.currentFilter))
    })
};


module.exports = new TodosListConstructor();