var Eventable = require('../../utils/Eventable');
var TodosItem = require('./TodosItem');

var TODOS_LIST = ".todos-list";

/**
 * catchs click event from list elements
 * registrates event for view
 * @constructor
 */
function TodosListConstructor() {
    this.init();
}

var todosListConstructorPrototype = TodosListConstructor.prototype;

todosListConstructorPrototype.todoInput = document.querySelector(TODOS_LIST);

/**
 * catchs event
 * @param event
 */
todosListConstructorPrototype.handler = function (event) {
    var currentEvent = new Eventable();
    var todosItem = new TodosItem();

    var itemAction = todosItem.getAction(event.target);

    if (itemAction.localeCompare("failClick") !== 0) {
        currentEvent.on("UserActions", {
            'action': itemAction,
            'indexOfItem': todosItem.getIndex()
        });
    }
}

todosListConstructorPrototype.init = function () {
    this.todoInput.addEventListener('click', this.handler);
}

module.exports = TodosListConstructor;