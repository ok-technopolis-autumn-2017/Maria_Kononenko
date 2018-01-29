var Eventable = require('../../utils/Eventable');

var TODOS_LIST = ".todos-list";
var TODOS_ITEM_CLASS_NAME_UNDONE = "todos-item";
var TODOS_ITEM_CLASS_NAME_DONE = "todos-item __done";
var TODOS_DELETE_BUTTON_CLASS_NAME = "todos-item_delete";
var TODOS_CHECKBOX_CLASS_NAME = ["todos-item_done-mark", "todos-item_undone-mark"];

/**
 * @constructor
 */
function TodosItemConstructor() {}

var todosItemConstructorPrototype = TodosItemConstructor.prototype;

todosItemConstructorPrototype.todoList = document.querySelector(TODOS_LIST);

todosItemConstructorPrototype.currentItem;

/**
 * finds Dom element in which is current element
 * @param target - Node
 * @return Dom element
 */
function getItemNode(target) {
    while (target.className != TODOS_ITEM_CLASS_NAME_UNDONE &&
           target.className != TODOS_ITEM_CLASS_NAME_DONE) {
        target = target.parentNode;
    }

    return target;
}

/**
 * indetifies the event
 * @param target - Node
 * @return String
 */
todosItemConstructorPrototype.getAction = function (target) {
    this.currentItem = getItemNode(target);

    switch (target.className) {
        case TODOS_DELETE_BUTTON_CLASS_NAME: {
            return "deleteItem";
        } break;

        case TODOS_CHECKBOX_CLASS_NAME[0]: {
            return "changeItemState";
        } break;

        case TODOS_CHECKBOX_CLASS_NAME[1]: {
            return "changeItemState";
        } break;

        default: {
            return "failClick";
        }
    }
}

/**
 * searches index of particular element
 * @return {number} - index of Node with class name "todos-item"
 */
todosItemConstructorPrototype.getIndex = function () {
    var items = this.todoList.childNodes;

    for (let i = 0; i < items.length; i++) {
        if (items[i] === this.currentItem) {
            return i;
        }
    }
}

module.exports = TodosItemConstructor;