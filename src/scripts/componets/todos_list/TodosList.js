var TodosItem = require('./TodosItem');
var EventBus = require('../../utils/EventBus');
var EventsTypes = require('../../constants/EventsTypes');

var TODOS_LIST = ".todos-list";

var TODOS_DELETE_BUTTON_CLASS_NAME = "todos-item_delete";
var TODOS_CHECKBOX_CLASS_NAME ="todos-item_checkbox-ready-mark";


function TodosListConstructor() {
    this.bus = EventBus;
    this.todosList = document.querySelector(TODOS_LIST);

    this.todosList.addEventListener(
        'click',
        this.handlerClick.bind(this)
    );
    this.todosList.addEventListener(
        'change',
        this.handlerChange.bind(this)
    );
}

var todosListConstructorPrototype = TodosListConstructor.prototype;

todosListConstructorPrototype.handlerClick = function (event) {
    if (event.target.className === TODOS_DELETE_BUTTON_CLASS_NAME) {
        this.bus.emit(
            EventsTypes.DELETE_TODOS,
            event.target.parentNode.parentNode.id
        )
    }
};

todosListConstructorPrototype.handlerChange = function (event) {
    if (event.target.className === TODOS_CHECKBOX_CLASS_NAME) {
        this.bus.emit(
            EventsTypes.TOGGLE_TODOS,
            event.target.parentNode.parentNode.id
        )
    }
};

todosListConstructorPrototype.render = function (currentModel) {
    this.todosList.innerHTML = "";

    currentModel.todosArray.forEach((function (todoModel) {
        this.todosList.appendChild(
            TodosItem.render(todoModel, currentModel.currentFilter))
    }).bind(this))
};


module.exports = new TodosListConstructor();
