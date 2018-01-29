/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	var AddTodos = __webpack_require__(1);
	var Presenter = __webpack_require__(3);
	var TodosList = __webpack_require__(7);
	var TodosBar = __webpack_require__(9);
	
	function init() {
	    var addTodos = new AddTodos();
	    var todosList = new TodosList();
	    var todosbar = new TodosBar();
	    var presenter = new Presenter();
	}
	
	document.addEventListener('DOMContentLoaded', init);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	var Eventable = __webpack_require__(2);
	
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

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	/**
	 * generates custom events
	 */
	function EventableConstructor() {
	}
	
	var evetableConstructorPrototype = EventableConstructor.prototype;
	
	/**
	 * creates event
	 * registrates event
	 * @param eventName - String
	 * @param details - Object
	 */
	evetableConstructorPrototype.on = function (eventName, details) {
	    var currentEvent = new CustomEvent(eventName, {
	        'detail' : details
	    })
	    document.dispatchEvent(currentEvent);
	}
	
	/**
	 * deletes event
	 * @param event - CusstomEvent
	 */
	evetableConstructorPrototype.off = function (event) {
	    event.preventDefault();
	}
	
	module.exports = EventableConstructor;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	var Eventable = __webpack_require__(2);
	var View = __webpack_require__(4);
	
	/**
	 * catchs evens from view
	 * sends data to model
	 * updates view with data getting from model
	 * @constructor
	 */
	function PresenterConstructor(){
	    this.init();
	}
	
	var PresenterConstructorPrototype = PresenterConstructor.prototype;
	
	PresenterConstructorPrototype.model = __webpack_require__(5);
	
	PresenterConstructorPrototype.view = new View();
	
	/**
	 * catchs Customevent
	 * sends data to model
	 * updates view
	 * @param event - CustomEvent
	 * @see Model
	 * @see View
	 */
	PresenterConstructorPrototype.catchEvent = function (event) {
	    var currentEvent = new Eventable();
	
	    currentEvent.off(event);
	
	    switch (event.detail.name) {
	        case "selectAll": {
	            let currentModel = PresenterConstructorPrototype.model.markAllDone();
	
	            PresenterConstructorPrototype.view.update(currentModel);
	        } break;
	
	        case "addTodos": {
	            let currentModel = PresenterConstructorPrototype.model.addTodos({
	                name: event.detail.value,
	                state: "undone"
	            });
	
	            PresenterConstructorPrototype.view.update(currentModel);
	        } break;
	
	        case "deleteItem": {
	            let currentModel = PresenterConstructorPrototype.model.deleteItem(
	                event.detail.indexOfItem
	            );
	
	            PresenterConstructorPrototype.view.update(currentModel);
	        } break;
	
	        case "changeItemState": {
	            let currentModel = PresenterConstructorPrototype.model.changeItemState(
	                event.detail.indexOfItem
	            );
	
	            PresenterConstructorPrototype.view.update(currentModel);
	        } break;
	
	        case "deleteAllDoneItems": {
	            let currentModel = PresenterConstructorPrototype.model.deleteAllDoneItems();
	
	            PresenterConstructorPrototype.view.update(currentModel);
	        } break;
	    }
	
	}
	
	PresenterConstructorPrototype.init = function () {
	    document.addEventListener("addTodos", this.catchEvent);
	    document.addEventListener("selectAll", this.catchEvent);
	    document.addEventListener("deleteItem", this.catchEvent);
	    document.addEventListener("changeItemState", this.catchEvent);
	    document.addEventListener("deleteAllDoneItems", this.catchEvent);
	
	    let currentModel = this.model.getModel();
	
	    this.view.update(currentModel);
	}
	
	module.exports = PresenterConstructor;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	var Eventable = __webpack_require__(2);
	
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

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	var DataStorage = __webpack_require__(6)
	/**
	 * @type {{storage: DataStorageConstructor, getModel: Model.getModel, addTodos: Model.addTodos, markAllDone: Model.markAllDone, changeItemState: Model.changeItemState, deleteItem: Model.deleteItem, deleteAllDoneItems: Model.deleteAllDoneItems}}
	 * @see DataStorage
	 */
	var Model = {
	    "storage": new DataStorage(),
	
	    "getModel": function () {
	        return this.storage.getLocalStorage("todosElements");
	    },
	
	    "addTodos": function (value) {
	        this.storage.setLocalStorage(value);
	        return this.storage.getLocalStorage("todosElements");
	    },
	
	    "markAllDone": function () {
	        for (let i = 0; i < this.storage.length(); i++) {
	            this.storage.changeStateLocalStorage(i, "done");
	        }
	        return this.storage.getLocalStorage("todosElements");
	    },
	
	    "changeItemState" : function (index) {
	        this.storage.changeStateLocalStorage(index);
	        return this.storage.getLocalStorage("todosElements");
	    },
	
	    "deleteItem": function (index) {
	        this.storage.deleteFromLocalStorage(index);
	        return this.storage.getLocalStorage("todosElements");
	    },
	
	    "deleteAllDoneItems": function () {
	        this.storage.clearComFromLocalStorage();
	        return this.storage.getLocalStorage("todosElements");
	    }
	}
	
	module.exports = Model;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	/**
	 * works with localStorage
	 * @constructor
	 */
	function DataStorageConstructor() {}
	
	var dataStorageConstructorPrototype = DataStorageConstructor.prototype;
	
	/**
	 * Gets data that is in LocalStorage
	 * @param key - String that is in LocalStorage
	 * @return Array with Objects {"name": String, "state": String}
	 */
	dataStorageConstructorPrototype.getLocalStorage = function (key) {
	    return JSON.parse(localStorage.getItem(key));
	}
	
	/**
	 * Adds new element to LocalStorage
	 * @param value - Object {"name": String, "state": String}
	 * @throws QUOTA_EXCEEDED_ERR if memory is full (5 MB)
	 * @see getLocalStorage
	 */
	dataStorageConstructorPrototype.setLocalStorage = function (value) {
	    var todosStructure;
	
	    if (localStorage.length === 0) {
	        todosStructure = [value];
	    } else {
	        todosStructure = this.getLocalStorage("todosElements");
	        todosStructure.push(value);
	    }
	
	    try {
	        localStorage.setItem("todosElements", JSON.stringify(todosStructure));
	    } catch (e) {
	        if (e == QUOTA_EXCEEDED_ERR) {
	            alert('Sorry')
	        }
	    }
	}
	
	/**
	 * changes field("state") of particular object from current state to mark(@param mark).
	 * if (mark == undefined)
	 * changes state from undone to done or from done to undone
	 * @param particular  - int position -1 < index < array.size()
	 * @param mark - String "done"/"undone/undefined"
	 * @throws QUOTA_EXCEEDED_ERR if memory is full (5 MB)
	 * @see getLocalStorage
	 */
	dataStorageConstructorPrototype.changeStateLocalStorage = function (index, mark) {
	    var structure = this.getLocalStorage("todosElements");
	
	    if (index > -1) {
	        if ((typeof mark).localeCompare("undefined") === 0) {
	            if (structure[index].state.localeCompare("undone") === 0) {
	                structure[index].state = "done";
	            } else {
	                structure[index].state = "undone";
	            }
	        } else {
	            structure[index].state = "done";
	        }
	    }
	
	    localStorage.clear();
	
	    try {
	        localStorage.setItem("todosElements", JSON.stringify(structure));
	    } catch (e) {
	        if (e == QUOTA_EXCEEDED_ERR) {
	            alert('Sorry')
	        }
	    }
	}
	
	module.exports = DataStorageConstructor;
	
	/**
	 * deletes elements with state: done in array(key - "todosElements").
	 * @throws QUOTA_EXCEEDED_ERR if memory is full (5 MB)
	 * @see getLocalStorage
	 */
	dataStorageConstructorPrototype.clearComFromLocalStorage = function () {
	    var structure = this.getLocalStorage("todosElements");
	    var index = 0;
	
	    while (index < structure.length) {
	        if (structure[index].state == "done") {
	            structure.splice(index, 1);
	
	        } else {
	            index++;
	        }
	    }
	
	    localStorage.clear();
	
	    try {
	        localStorage.setItem("todosElements", JSON.stringify(structure));
	    } catch (e) {
	        if (e == QUOTA_EXCEEDED_ERR) {
	            alert('Sorry')
	        }
	    }
	}
	
	/**
	 * deletes element of particular position in array(key - "todosElements").
	 * @param index - int particular position -1 < index < array.size()
	 * @throws QUOTA_EXCEEDED_ERR if memory is full (5 MB)
	 * @see getLocalStorage
	 */
	dataStorageConstructorPrototype.deleteFromLocalStorage = function (index) {
	    var structure = this.getLocalStorage("todosElements");
	
	    if (index > -1) {
	        structure.splice(index, 1);
	    }
	
	    localStorage.clear();
	
	    try {
	        localStorage.setItem("todosElements", JSON.stringify(structure));
	    } catch (e) {
	        if (e == QUOTA_EXCEEDED_ERR) {
	            alert('Sorry')
	        }
	    }
	}
	
	/**
	 * checks for elements in LocalStorage
	 * @return there are something ? true : false
	 * @see getLocalStorage
	 */
	dataStorageConstructorPrototype.isLocalStorageEmpty = function () {
	    var structure = this.getLocalStorage("todosElements");
	
	    return (structure.length === 0);
	
	}
	
	/**
	 *
	 * @return {Number} - number of elements in localStorage
	 */
	dataStorageConstructorPrototype.length = function () {
	    var structure = this.getLocalStorage("todosElements");
	
	    return structure.length;
	}
	
	module.exports = DataStorageConstructor;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	var Eventable = __webpack_require__(2);
	var TodosItem = __webpack_require__(8);
	
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

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	var Eventable = __webpack_require__(2);
	
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

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	var Eventable = __webpack_require__(2);
	
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

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map