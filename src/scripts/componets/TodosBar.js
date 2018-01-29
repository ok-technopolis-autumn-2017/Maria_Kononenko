var Eventable = require('../utils/Eventable');

var TODOS_BAR = ".todos-actions-bar";
var TODOS_FILTERS_CLASS_NAME = ["todos-filter __all",
                     "todos-filter __active",
                     "todos-filter __completed"];
var TODOS_DELETE_ALL_BUTTON_CLASS_NAME = "todos-actions-bar_delete-done";

/**
 * catchs click event from filters and deleteAllDoneButton
 * registrates event for view
 * @constructor
 */
function TodosBarConstructor() {
    this.init();
}

/**
 * identifies the event from user
 * @param target - Node
 * @return String - name of action
 */
function getAction(target) {
    switch (target.className) {
        case TODOS_DELETE_ALL_BUTTON_CLASS_NAME: {
            return "deleteAllDoneItems";
        } break;

        case TODOS_FILTERS_CLASS_NAME[0]: {
            return "viewAll";
        } break;

        case TODOS_FILTERS_CLASS_NAME[1]: {
            return "viewActive";
        } break;

        case TODOS_FILTERS_CLASS_NAME[2]: {
            return "viewCompleted";
        } break;

        default: {
            return "failClick";
        }
    }
}

var todosBarConstructorPrototype = TodosBarConstructor.prototype;

todosBarConstructorPrototype.todoBar = document.querySelector(TODOS_BAR);

/**
 * catchs event
 * @param event
 */
todosBarConstructorPrototype.handler = function (event) {
    var currentEvent = new Eventable();

    var itemAction = getAction(event.target);

    if (itemAction.localeCompare("failClick") !== 0) {
        currentEvent.on("UserActions", {
            'action': itemAction
        });
    }
}

todosBarConstructorPrototype.init = function () {
    this.todoBar.addEventListener('click', this.handler);
}

module.exports = TodosBarConstructor;