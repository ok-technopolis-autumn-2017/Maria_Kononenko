var EventBus = require('../../utils/EventBus');
var EventsTypes = require('../../constants/EventsTypes');
var TodoModel = require('../../modules/model/TodoModel');

var TODOS_ADD_INPUT = ".todos-add_new-item";
var TODOS_MAKE_ALL_COMPLETED_BUTTON = ".todos-add_select-all";
var ENTER_KEY_CODE = 13;

function AddTodosConstructor() {
    this.bus = EventBus;
    this.todosAddInput = document.querySelector(TODOS_ADD_INPUT);
    this.todosDelButton = document
      .querySelector(TODOS_MAKE_ALL_COMPLETED_BUTTON);

    this.todosAddInput.addEventListener(
      'keypress',
      this.handlerKeyPress.bind(this)
    );
    this.todosDelButton.addEventListener('click', this.handlerClick.bind(this));
}

var addTodosConstructorPrototype = AddTodosConstructor.prototype;

addTodosConstructorPrototype.setVisibility = function (numTodoItems) {
    if (numTodoItems == 0) {
        this.todosDelButton.style.visibility = "hidden";
    } else {
        this.todosDelButton.style.visibility = "visible";
    }
};

addTodosConstructorPrototype.handlerKeyPress = function (event) {
    if (event.keyCode == ENTER_KEY_CODE) {
        this.bus.emit(
            EventsTypes.ADD_TODOS,
            new TodoModel(new Date().getTime(), event.target.value, false)
        );

        event.target.value = '';
    }
};

addTodosConstructorPrototype.handlerClick = function (event) {
    this.bus.emit(
        EventsTypes.MAKE_ALL_COMPLETED_TODOS, null);
};

module.exports = new AddTodosConstructor();
