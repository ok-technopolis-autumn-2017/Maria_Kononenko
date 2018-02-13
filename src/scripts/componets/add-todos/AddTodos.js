var EventBus = require('../../utils/EventBus');
var EventsTypes = require('../../constants/EventsTypes');

var TODOS_ADD_INPUT = ".todos-add_new-item";
var TODOS_MAKE_ALL_COMPLETED_BUTTON = ".todos-add_select-all";
var ENTER_KEY_CODE = 13;

function AddTodosConstructor() {
    this.todosAddInput.addEventListener('keypress', this.handlerKeyPress);
    this.todosDelButton.addEventListener('click', this.handlerClick);
}

var addTodosConstructorPrototype = AddTodosConstructor.prototype;

addTodosConstructorPrototype.todosAddInput = document
    .querySelector(TODOS_ADD_INPUT);

addTodosConstructorPrototype.todosDelButton = document
    .querySelector(TODOS_MAKE_ALL_COMPLETED_BUTTON);

addTodosConstructorPrototype.bus = EventBus;

addTodosConstructorPrototype.setVisibility = function (numTodoItems) {
    if (numTodoItems == 0) {
        this.todosDelButton.style.visibility = "hidden";
    } else {
        this.todosDelButton.style.visibility = "visible";
    }
};

addTodosConstructorPrototype.handlerKeyPress = function (event) {
    if (event.keyCode == ENTER_KEY_CODE) {
        addTodosConstructorPrototype.bus.emit(EventsTypes.ADD_TODOS, {
            "id": new Date().getTime(),
            "text": this.value
        });

        this.value = '';
    }
};

addTodosConstructorPrototype.handlerClick = function (event) {
    addTodosConstructorPrototype.bus.emit(
        EventsTypes.MAKE_ALL_COMPLETED_TODOS, null);
};

module.exports = new AddTodosConstructor();