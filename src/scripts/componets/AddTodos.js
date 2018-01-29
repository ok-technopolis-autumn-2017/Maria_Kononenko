var Eventable = require('../utils/Eventable');

var TODOS_INPUT = ".todos-add_new-item";
var TODOS_SELECT_ALL_BUTTON = ".todos-add_select-all";
var ENTER_KEY_CODE = 13;

/**
 * catchs click event from input and button
 * registrates event for view
 * @constructor
 */
function AddTodosConstructor() {
    this.init();
}

var addTodosConstructorPrototype = AddTodosConstructor.prototype;

addTodosConstructorPrototype.todoInput = document.querySelector(TODOS_INPUT);

addTodosConstructorPrototype.todoSelectAllButton = document.querySelector(TODOS_SELECT_ALL_BUTTON);

/**
 * catchs event
 * @param event
 */
addTodosConstructorPrototype.handler = function (event) {
    var currentEvent = new Eventable();

    switch (event.target.className) {
        case addTodosConstructorPrototype.todoInput.className: {
            if (event.keyCode == ENTER_KEY_CODE) {
                currentEvent.on("UserActions", {
                    'action': "addTodos",
                    'value': this.value
                });

                this.value = "";
            }
        } break;

        case addTodosConstructorPrototype.todoSelectAllButton.className: {
            currentEvent.on("UserActions", {
                'action': "selectAll"
            });
        }
    }
}

addTodosConstructorPrototype.init = function () {
    this.todoInput.addEventListener('keypress', this.handler);
    this.todoSelectAllButton.addEventListener('click', this.handler);
}

module.exports = AddTodosConstructor;