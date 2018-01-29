var Eventable = require('../../utils/Eventable');

var TODOS_LIST = ".todos-list";

/**
 * catchs events
 * shows all to user
 * @constructor
 */
function ViewConstructor(){
    this.init();
}

/**
 * (model.length === 0) ?
 * hides todosBar:
 * shows todosBar
 * @param model - Array with Objects {"name": String, "state": String}
 */
function updateStateOfViewTodosBar(model) {
    var todosBar = document.querySelector(".todos-actions-bar");

    if (model.length === 0) {
        todosBar.style.display = "none";
    } else {
        todosBar.style.display = "flex";
    }
}

/**
 * (model.length === 0) ?
 * hides todosButton:
 * shows todosButton
 * @param model - Array with Objects {"name": String, "state": String}
 */
function updateStateOfViewSellectAllButton(model) {
    var todosButton = document.querySelector(".todos-add_select-all");

    if (model.length === 0) {
        todosButton.style.visibility = "hidden";
    } else {
        todosButton.style.visibility = "visible";
    }
}

/**
 * counts elements of @param with the state == "undone"
 * shows the counted number
 * @param model - Array with Objects {"name": String, "state": String}
 */
function updateUndoneItemsCounter(model) {
    var counter = document.querySelector(".todos-actions-bar_counter-undone");

    let numElements = 0;
    for (let i = 0; i < model.length; i++) {
        if (model[i].state.localeCompare("undone") === 0) {
            numElements++;
        }
    }

    counter.innerHTML = numElements.toString() + " items left";
}

var viewConstructorPrototype = ViewConstructor.prototype;

/**
 * creates new DOM element
 * adds to DOM
 * @param insertionPoint Node
 * @param element - Node
 */
var addElementToDom = function (insertionPoint, element) {
    var newListEl = document.createElement("div");

    newListEl.className = (element.state.localeCompare("undone") === 0)
        ? "todos-item":
        "todos-item __done";

    /**
     * first child
     */
    var newListElChild = document.createElement("div");
    newListElChild.className = (element.state.localeCompare("undone") === 0)
        ? "todos-item_undone-mark-w":
        "todos-item_done-mark-w";

    //1 child of first child
    var newListElChildChild = document.createElement("div");
    newListElChildChild.className = (element.state.localeCompare("undone") === 0)
        ? "todos-item_undone-mark-icon":
        "todos-item_done-mark-icon";
    newListElChild.appendChild(newListElChildChild);

    //2 child of first child
    newListElChildChild = document.createElement("input");
    newListElChildChild.className = (element.state.localeCompare("undone") === 0)
        ? "todos-item_undone-mark":
        "todos-item_done-mark";
    newListElChildChild.setAttribute("type", "checkbox");
    if (element.state.localeCompare("undone") !== 0) {
        newListElChildChild.setAttribute("checked", "checked");
    }
    newListElChildChild.setAttribute("aria-label", "mark undone");
    newListElChild.appendChild(newListElChildChild);

    newListEl.appendChild(newListElChild);

    /**
     * Second child
     */
    newListElChild = document.createElement("div");
    newListElChild.className = "todos-item_delete-w";

    //1 of second child
    newListElChildChild = document.createElement("div");
    newListElChildChild.className = "todos-item_delete_icon";
    newListElChild.appendChild(newListElChildChild);

    //2 of second child
    newListElChildChild = document.createElement("button");
    newListElChildChild.className = "todos-item_delete";
    newListElChildChild.setAttribute("aria-label", "delete item");
    newListElChild.appendChild(newListElChildChild);

    newListEl.appendChild(newListElChild);

    /**
     * Third child
     */
    newListElChild = document.createElement("div");
    newListElChild.className = "todos-item_name-w";

    //1 of third child
    newListElChildChild = document.createElement("textarea");
    newListElChildChild.className = "todos-item_name";
    newListElChildChild.value = element.name;
    newListElChild.appendChild(newListElChildChild);

    newListEl.appendChild(newListElChild);

    insertionPoint.appendChild(newListEl);

    newListEl = null;
    newListElChild = null;
    newListElChildChild = null;
}

/**
 * hides DOM element with class name == "todos-item __done"
 * shows DOM element with class name == "todos-item"
 */
viewConstructorPrototype.viewActive = function() {
    var listItems = document.querySelector(TODOS_LIST).childNodes;

    for (var i = 0; i < listItems.length; i++) {
        if (listItems[i].className.localeCompare("todos-item") === 0){
            listItems[i].style.display = "block";
        } else {
            listItems[i].style.display = "none";
        }
    }
}

/**
 * shows DOM element
 * with class name == "todos-item" or "todos-item __done"
 */
viewConstructorPrototype.viewAll = function() {
    var listItems = document.querySelector(TODOS_LIST).childNodes;

    for (var i = 0; i < listItems.length; i++) {
        listItems[i].style.display = "block";
    }
}

/**
 * shows DOM element with class name == "todos-item __done"
 * hides DOM element with class name == "todos-item"
 */
viewConstructorPrototype.viewCompleted = function() {
    var listItems = document.querySelector(TODOS_LIST).childNodes;

    for (var i = 0; i < listItems.length; i++) {
        if (listItems[i].className.localeCompare("todos-item __done") === 0){
            listItems[i].style.display = "block";
        } else {
            listItems[i].style.display = "none";
        }
    }
}

/**
 * updates view
 * @param model - Array with Objects {"name": String, "state": String}
 * @see addElementToDom
 * @see updateUndoneItemsCounter
 * @see updateStateOfViewTodosBar
 * @see updateStateOfViewSellectAllButton
 */
viewConstructorPrototype.update = function (model) {
    var listNode = document.querySelector(TODOS_LIST);

    listNode.innerHTML = "";

    for (let i  = 0; i < model.length; i++) {
        addElementToDom(listNode, model[i]);
    }

    updateUndoneItemsCounter(model);
    updateStateOfViewTodosBar(model);
    updateStateOfViewSellectAllButton(model);
}

/**
 * catchs CustomEvent from componets
 * generates new CustomEvent to presenter
 * @param event - CustomEvent
 */
viewConstructorPrototype.catchEvent = function (event) {
    var currentEvent = new Eventable();

    currentEvent.off(event);

    switch (event.detail.action) {
        case "selectAll": {
            currentEvent.on("selectAll", {
                'name' : "selectAll"
            })
        } break;

        case "addTodos": {
            currentEvent.on("addTodos", {
                'name' : "addTodos",
                'value': event.detail.value
            })
        } break;

        case "deleteItem": {
            currentEvent.on("deleteItem", {
                'name' : "deleteItem",
                'indexOfItem': event.detail.indexOfItem
            })
        } break;

        case "changeItemState": {
            currentEvent.on("changeItemState", {
                'name' : "changeItemState",
                'indexOfItem': event.detail.indexOfItem
            })
        } break;

        case "deleteAllDoneItems": {
            currentEvent.on("deleteAllDoneItems", {
                'name' : "deleteAllDoneItems"
            })
        } break;

        case "viewAll": {
            viewConstructorPrototype.viewAll();
        } break;

        case "viewActive": {
            viewConstructorPrototype.viewActive();
        } break;

        case "viewCompleted": {
            viewConstructorPrototype.viewCompleted();
        } break;
    }
}

viewConstructorPrototype.init = function () {
    document.addEventListener("UserActions", this.catchEvent);
}

module.exports = ViewConstructor;