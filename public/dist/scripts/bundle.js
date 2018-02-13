/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Model = __webpack_require__(4);
var TodosContainer = __webpack_require__(6);

function BasePresenter() {}

BasePresenterPrototype = BasePresenter.prototype;

BasePresenterPrototype.model = Model;

BasePresenterPrototype.TodosContainer = TodosContainer;

BasePresenterPrototype.changeView = function (currentModel) {
    BasePresenterPrototype.TodosContainer.render(currentModel);
};

BasePresenterPrototype.updateModel = function (data) {
    throw new Error("must be override")
};

module.exports = BasePresenter;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

function EventBusConstructor() {
    this.listeners = {};
}

EventBusConstructorPrototype = EventBusConstructor.prototype;

EventBusConstructorPrototype.on = function (event, callback) {
    this.listeners[event] = [];
    this.listeners[event].push(callback)
};

EventBusConstructorPrototype.off = function (event, callback) {
    this.listeners[event] = this.listeners[event].filter(function (listener) {
        return listener !== callback;
    })
};

EventBusConstructorPrototype.emit = function (eventName, eventData) {
    this.listeners[eventName].forEach(function (listener) {
        listener(eventData);
    })
};



module.exports = new EventBusConstructor();

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var CONSTS = {
    "ADD_TODOS": 'ADD_TODOS',
    "TOGGLE_TODOS": 'TOGGLE_TODOS',
    "DELETE_TODOS": 'DELETE_TODOS',
    "MAKE_ALL_COMPLETED_TODOS": 'MAKE_ALL_COMPLETED_TODOS',
    "DELETE_ALL_COMPLETED_TODOS": 'DELETE_ALL_COMPLETED_TODOS',
    "SET_VISIBILITY_FILTER": 'SET_VISIBILITY_FILTER'
};

module.exports = CONSTS;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var CONSTS = {
    "FILTER_ALL": 'todos-filter __all',
    "FILTER_COMPLETED": 'todos-filter __completed',
    "FILTER_ACTIVE": 'todos-filter __active'
};

module.exports = CONSTS;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var DataStorage = __webpack_require__(11);
var LocalStorageKey = __webpack_require__(5);

var Model = {
    "storage": new DataStorage(),

    "getModel": function () {
        return this.storage.getLocalStorage(LocalStorageKey)
    },

    "addTodos": function (value) {
        this.storage.setLocalStorage(value);
        return this.storage.getLocalStorage(LocalStorageKey)
    },

    "isEmpty": function () {
        return this.storage.isLocalStorageEmpty()
    },

    "makeAllCompleted": function () {
        this.storage.makeAllCompletedLocalStorage();
        return this.storage.getLocalStorage(LocalStorageKey);
    },

    "toggleItem" : function (id) {
        this.storage.toggleTodosLocalStorage(id);
        return this.storage.getLocalStorage(LocalStorageKey);
    },

    "deleteItem": function (id) {
        this.storage.deleteTodosLocalStorage(id);
        return this.storage.getLocalStorage(LocalStorageKey);
    },

    "deleteAllCompletedItems": function () {
        this.storage.deleteAllCompletedTodosLocalStorage();
        return this.storage.getLocalStorage(LocalStorageKey);
    }
};

module.exports = Model;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

var KEY = "VanillaJSTodos96";

module.exports = KEY;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var AddTodos = __webpack_require__(12);
var TodosList = __webpack_require__(13);
var TodosBar = __webpack_require__(15);

function TodosContainerConstructor() {}

var TodosContainerConstructorPrototype = TodosContainerConstructor.prototype;

TodosContainerConstructorPrototype.render = function (currentModel) {
    console.log(currentModel);
    AddTodos.setVisibility(currentModel.todosArray.length);
    TodosList.render(currentModel);
    TodosBar.render(currentModel.todosArray, currentModel.currentFilter);
};

module.exports = new TodosContainerConstructor();

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var EventBus = __webpack_require__(1);

function MainPresenterConstructor() {
    var instance = this,
        prototype = MainPresenterConstructor.prototype;

    MainPresenterConstructor = function () {
        return instance;
    };

    MainPresenterConstructor.prototype = prototype;
    MainPresenterConstructor.constructor = MainPresenterConstructor;
    instance.constructor = MainPresenterConstructor;
    return instance;
}

MainPresenterConstructorPrototype = MainPresenterConstructor.prototype;

MainPresenterConstructorPrototype.bus = EventBus;

MainPresenterConstructorPrototype.registrateNewPresenter =
    function (BasePresenter, eventType) {
        MainPresenterConstructorPrototype.bus.on(eventType, BasePresenter);
};

module.exports = MainPresenterConstructor;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(9);

var TodosContainer = __webpack_require__(6);
var model = __webpack_require__(4);
var FilterTypes = __webpack_require__(3);
var Presenter = __webpack_require__(7);

function init() {
    if (model.isEmpty()) {
        model.addTodos({
            "todosFilter": FilterTypes.FILTER_ALL
        })
    }

    TodosContainer.render(model.getModel());

    new Presenter();
}

document.addEventListener('DOMContentLoaded', init);



/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var AddTodosPresenter = __webpack_require__(10);
var MakeAllCompletedTodosPresenter =
    __webpack_require__(19);
var ToggleTodosPresenter = __webpack_require__(20);
var DeleteTodosPresenter = __webpack_require__(21);
var DeleteAllCompletedTodosPresenter =
    __webpack_require__(22);
var SetTodosFilterPresenter =
    __webpack_require__(23);

var MainPresenter = __webpack_require__(7);
var EventsTypes = __webpack_require__(2);

new MainPresenter().registrateNewPresenter(
    new DeleteAllCompletedTodosPresenter().updateModel,
    EventsTypes.DELETE_ALL_COMPLETED_TODOS
);

new MainPresenter().registrateNewPresenter(
    new AddTodosPresenter().updateModel,
    EventsTypes.ADD_TODOS
);

new MainPresenter().registrateNewPresenter(
    new DeleteTodosPresenter().updateModel,
    EventsTypes.DELETE_TODOS
);

new MainPresenter().registrateNewPresenter(
    new MakeAllCompletedTodosPresenter().updateModel,
    EventsTypes.MAKE_ALL_COMPLETED_TODOS
);

new MainPresenter().registrateNewPresenter(
    new SetTodosFilterPresenter().updateModel,
    EventsTypes.SET_VISIBILITY_FILTER
);

new MainPresenter().registrateNewPresenter(
    new ToggleTodosPresenter().updateModel,
    EventsTypes.TOGGLE_TODOS
);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var BasePresenter = __webpack_require__(0);

function AddTodosPresenter() {}

AddTodosPresenterPrototype = AddTodosPresenter.prototype;

AddTodosPresenterPrototype.__proto__ = BasePresenter.prototype;

AddTodosPresenterPrototype.updateModel = function (data) {
    var currentModel = AddTodosPresenterPrototype.model.addTodos({
        "todosItem": {
            "id": data.id,
            "text": data.text,
            "completed": false
        }
    });

    AddTodosPresenterPrototype.changeView(currentModel);
};

module.exports = AddTodosPresenter;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var LocalStorageKey = __webpack_require__(5);

function DataStorageConstructor() {}

var dataStorageConstructorPrototype = DataStorageConstructor.prototype;

dataStorageConstructorPrototype.getLocalStorage = function (key) {
    return JSON.parse(localStorage.getItem(key));
};

dataStorageConstructorPrototype.setLocalStorage = function (value) {
    var todosStructure;

    if (dataStorageConstructorPrototype.isLocalStorageEmpty()) {
        if (value.todosItem === undefined) {
            todosStructure = {
                "todosArray": [],
                "currentFilter": value.todosFilter
            }
        } else {
            todosStructure = {
                "todosArray": [value.todosItem],
                "currentFilter": value.todosFilter
            }
        }
    } else {
        todosStructure = this.getLocalStorage(LocalStorageKey);
        if (value.todosItem !== undefined) {
            todosStructure.todosArray.push(value.todosItem);
        }

        if (value.todosFilter !== undefined) {
            todosStructure.currentFilter = value.todosFilter;
        }
    }

    try {
        localStorage.setItem(LocalStorageKey, JSON.stringify(todosStructure));
    } catch (e) {
        if (e == QUOTA_EXCEEDED_ERR) {
            alert('Sorry')
        }
    }

    todosStructure = null;
};

dataStorageConstructorPrototype.isLocalStorageEmpty = function () {
    var structure = this.getLocalStorage(LocalStorageKey);

    return (structure === null);

};

dataStorageConstructorPrototype.makeAllCompletedLocalStorage = function () {
    var structure = this.getLocalStorage(LocalStorageKey);

    structure.todosArray = structure.todosArray.map(function (todosItem) {
        return {
            "id": todosItem.id,
            "text": todosItem.text,
            "completed": true
        }
    });

    try {
        localStorage.setItem(LocalStorageKey, JSON.stringify(structure));
    } catch (e) {
        if (e == QUOTA_EXCEEDED_ERR) {
            alert('Sorry')
        }
    }

    structure = null;
};

dataStorageConstructorPrototype.toggleTodosLocalStorage = function(id) {
    var structure = this.getLocalStorage(LocalStorageKey);

    structure.todosArray = structure.todosArray.map(function (todosItem) {
        if (todosItem.id == id) {
            return {
                "id": todosItem.id,
                "text": todosItem.text,
                "completed": !todosItem.completed
            }
        }

        return todosItem
    });

    try {
        localStorage.setItem(LocalStorageKey, JSON.stringify(structure));
    } catch (e) {
        if (e == QUOTA_EXCEEDED_ERR) {
            alert('Sorry')
        }
    }

    structure = null;
};

dataStorageConstructorPrototype.deleteTodosLocalStorage = function(id) {
    var structure = this.getLocalStorage(LocalStorageKey);

    structure.todosArray = structure.todosArray.filter(function (todosItem) {
        if (todosItem.id == id) {
            return false
        }

        return true
    });

    try {
        localStorage.setItem(LocalStorageKey, JSON.stringify(structure));
    } catch (e) {
        if (e == QUOTA_EXCEEDED_ERR) {
            alert('Sorry')
        }
    }

    structure = null;
};

dataStorageConstructorPrototype.deleteAllCompletedTodosLocalStorage
    = function() {

    var structure = this.getLocalStorage(LocalStorageKey);

    structure.todosArray = structure.todosArray.filter(function (todosItem) {
        if (todosItem.completed) {
            return false
        }

        return true
    });

    try {
        localStorage.setItem(LocalStorageKey, JSON.stringify(structure));
    } catch (e) {
        if (e == QUOTA_EXCEEDED_ERR) {
            alert('Sorry')
        }
    }

    structure = null;
};

module.exports = DataStorageConstructor;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var EventBus = __webpack_require__(1);
var EventsTypes = __webpack_require__(2);

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

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var TodosItem = __webpack_require__(14);
var EventBus = __webpack_require__(1);
var EventsTypes = __webpack_require__(2);

var TODOS_LIST = ".todos-list";

var TODOS_DELETE_BUTTON_CLASS_NAME = "todos-item_delete";
var TODOS_CHECKBOX_CLASS_NAME =
    ["todos-item_done-mark", "todos-item_undone-mark"];


function TodosListConstructor() {
    this.todosList.addEventListener('click', this.handlerClick);
}

function deleteDeletedNodes(parent, ids) {
    var childrens = parent.children;
    var removeChildren = [];
    var i, j, flag;

    for (i = 0; i < childrens.length; i++) {
        flag = true;
        for (j = 0; j < ids.length; j++) {
            if (childrens[i].id == ids[j]) {
                flag = false;
                break;
            }
        }

        if (flag) {
            removeChildren.push(childrens[i])
        }

        flag = true
    }
    
    for (i = 0; i < removeChildren.length; i++) {
        parent.removeChild(removeChildren[i])
    }
    i = null;
}

var todosListConstructorPrototype = TodosListConstructor.prototype;

todosListConstructorPrototype.todosList = document.querySelector(TODOS_LIST);

todosListConstructorPrototype.bus = EventBus;

todosListConstructorPrototype.handlerClick = function (event) {
    switch (event.target.className) {
        case TODOS_CHECKBOX_CLASS_NAME[0]:
        case TODOS_CHECKBOX_CLASS_NAME[1]: {
            todosListConstructorPrototype.bus.emit(EventsTypes.TOGGLE_TODOS, {
                "id": event.target.parentNode.parentNode.id
            })
        } break;

        case TODOS_DELETE_BUTTON_CLASS_NAME: {
            todosListConstructorPrototype.bus.emit(EventsTypes.DELETE_TODOS, {
                "id": event.target.parentNode.parentNode.id
            })
        } break;
    }
};

todosListConstructorPrototype.render = function (currentModel) {
    currentModel.todosArray.forEach(function (currentItemProps, i, array) {
        var TodosItemNode = document.getElementById(currentItemProps.id);

        if (TodosItemNode === null) {

            var newTodosItem = TodosItem.render(currentItemProps,
                currentModel.currentFilter);

            todosListConstructorPrototype.todosList.appendChild(newTodosItem)

            newTodosItem = null;


        } else {

            TodosItem.update(currentItemProps, currentModel.currentFilter,
                TodosItemNode);

        }
    });

    var curIds = currentModel.todosArray.map(function (item) {
        return item.id;
    });

    deleteDeletedNodes(todosListConstructorPrototype.todosList, curIds);

    curIds = null;
};


module.exports = new TodosListConstructor();

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var FilterTypes = __webpack_require__(3)

function TodosItemConstructor() {}

function setVisibility(currentFilter, completed) {
    switch (currentFilter) {
        case FilterTypes.FILTER_ALL: {
            return "block"
        } break;

        case FilterTypes.FILTER_ACTIVE: {
            return (completed) ?
                  "none" : "block"
        } break;

        case FilterTypes.FILTER_COMPLETED : {
            return (!completed) ?
                "none" : "block"
        } break;

        default: {
            return {
                display: "block"
            };
        }
    }
}

var todosItemConstructorPrototype = TodosItemConstructor.prototype;

todosItemConstructorPrototype.update = function (props, currentFilter, TodosItemNode) {
    TodosItemNode.className = (!props.completed)
        ? "todos-item":
        "todos-item __done";

    TodosItemNode.style.display = setVisibility(currentFilter, props.completed);

    TodosItemNode.childNodes[0].className = (!props.completed)
        ? "todos-item_undone-mark-w todos-item_belonging-checkbox":
        "todos-item_done-mark-w todos-item_belonging-checkbox";

    TodosItemNode.childNodes[0].childNodes[0].className = (!props.completed)
        ? "todos-item_undone-mark-icon":
        "todos-item_done-mark-icon";

    TodosItemNode.childNodes[0].childNodes[1].className = (!props.completed)
        ? "todos-item_undone-mark":
        "todos-item_done-mark";

    if (!props.completed) {
        TodosItemNode.childNodes[0].childNodes[1].removeAttribute("checked");
        TodosItemNode.childNodes[0].childNodes[1].setAttribute("aria-label", "mark undone");
    } else {
        TodosItemNode.childNodes[0].childNodes[1].setAttribute("checked", "checked");
        TodosItemNode.childNodes[0].childNodes[1].setAttribute("aria-label", "mark done");
    }

};

todosItemConstructorPrototype.render = function(props, currentFilter) {
    var newListEl = document.createElement("div");

    newListEl.className = (!props.completed)
        ? "todos-item":
        "todos-item __done";

    newListEl.setAttribute("id", props.id);

    newListEl.style.display = setVisibility(currentFilter, props.completed);

    /**
     * first child
     */
    var newListElChild = document.createElement("div");
    newListElChild.className = (!props.completed)
        ? "todos-item_undone-mark-w todos-item_belonging-checkbox":
        "todos-item_done-mark-w todos-item_belonging-checkbox";

    //1 child of first child
    var newListElChildChild = document.createElement("div");
    newListElChildChild.className = (!props.completed)
        ? "todos-item_undone-mark-icon":
        "todos-item_done-mark-icon";
    newListElChild.appendChild(newListElChildChild);

    //2 child of first child
    newListElChildChild = document.createElement("input");
    newListElChildChild.className = (!props.completed)
        ? "todos-item_undone-mark":
        "todos-item_done-mark";
    newListElChildChild.setAttribute("type", "checkbox");
    if (!props.completed) {
        newListElChildChild.removeAttribute("checked");
        newListElChildChild.setAttribute("aria-label", "mark undone");
    } else {
        newListElChildChild.setAttribute("checked", "checked");
        newListElChildChild.setAttribute("aria-label", "mark done");
    }

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
    newListElChildChild.value = props.text;
    newListElChild.appendChild(newListElChildChild);

    newListEl.appendChild(newListElChild);

    return newListEl;

};


module.exports = new TodosItemConstructor();

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var TodosFilters = __webpack_require__(16);
var TodosCounter = __webpack_require__(17);
var TodosDeleteAllCompltedButton = __webpack_require__(18);

var TODOS_BAR = ".todos-actions-bar";

function TodosBarConstructor() {
}

var todosBarConstructorPrototype = TodosBarConstructor.prototype;

todosBarConstructorPrototype.todoBar = document.querySelector(TODOS_BAR);

todosBarConstructorPrototype.setVisibility = function (num) {
    if (num == 0) {
        todosBarConstructorPrototype.todoBar.style.display = "none"
    } else {
        todosBarConstructorPrototype.todoBar.style.display = "flex"
    }
}

todosBarConstructorPrototype.render = function (todosArray, currentFilter) {
    todosBarConstructorPrototype.setVisibility(todosArray.length);
    TodosFilters.render(currentFilter);
    TodosCounter.render(todosArray);
};

module.exports = new TodosBarConstructor();

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var EventBus = __webpack_require__(1);
var EventsTypes = __webpack_require__(2);
var FilterTypes = __webpack_require__(3);

var TODOS_FILTERS_CLASS = ".todos-filters";

function TodosFiltersConstructor() {
    this.todosDelButton.addEventListener('click', this.handlerClick);
}

var todosFiltersConstructorPrototype = TodosFiltersConstructor.prototype;

todosFiltersConstructorPrototype.todosDelButton =
    document.querySelector(TODOS_FILTERS_CLASS);

todosFiltersConstructorPrototype.bus = EventBus;

todosFiltersConstructorPrototype.setFocus = function (
    currentFilter, choosenFilter, type) {

    switch (choosenFilter) {
        case FilterTypes.FILTER_ALL: {
            if (currentFilter.localeCompare(FilterTypes.FILTER_ALL) == 0) {
                if (type = "b") {
                    return '2px solid #efefef'
                } else {
                    return '2px'
                }
            } else {
                if (type = "b") {
                    return '2px solid #fff'
                } else {
                    return '2px'
                }
            }
        } break;

        case (FilterTypes.FILTER_ACTIVE): {

            if (currentFilter.localeCompare(FilterTypes.FILTER_ACTIVE) == 0) {
                if (type = "b") {
                    return '2px solid #efefef'
                } else {
                    return '2px'
                }
            } else {
                if (type = "b") {
                    return '2px solid #fff'
                } else {
                    return '2px'
                }
            }
        } break;

        case (FilterTypes.FILTER_COMPLETED): {
            if (currentFilter.localeCompare(
                FilterTypes.FILTER_COMPLETED) == 0) {
                if (type = "b") {
                    return '2px solid #efefef'
                } else {
                    return '2px'
                }
            } else {
                if (type = "b") {
                    return '2px solid #fff'
                } else {
                    return '2px'
                }
            }
        } break;
    }
};

todosFiltersConstructorPrototype.handlerClick = function (event) {
    if (event.target.className.localeCompare(
        FilterTypes.FILTER_COMPLETED) == 0 ||
        event.target.className.localeCompare(
            FilterTypes.FILTER_ACTIVE) == 0||
        event.target.className.localeCompare(
            FilterTypes.FILTER_ALL) == 0) {

        todosFiltersConstructorPrototype.bus.emit(
            EventsTypes.SET_VISIBILITY_FILTER,
            {
                "filter": event.target.className
            }
        );

    }
};

todosFiltersConstructorPrototype.render = function (currentFilter) {
    document.getElementsByClassName(FilterTypes.FILTER_ALL)[0].style.border =
            todosFiltersConstructorPrototype.setFocus(currentFilter,
                FilterTypes.FILTER_ALL, "b");
    document.getElementsByClassName(FilterTypes.FILTER_ACTIVE)[0].style.border =
        todosFiltersConstructorPrototype.setFocus(currentFilter,
            FilterTypes.FILTER_ACTIVE, "b");
    document.getElementsByClassName(FilterTypes.FILTER_COMPLETED)[0]
        .style.border =
        todosFiltersConstructorPrototype.setFocus(currentFilter,
            FilterTypes.FILTER_COMPLETED, "b");
    document.getElementsByClassName(FilterTypes.FILTER_ALL)[0]
        .style.borderRadius =
        todosFiltersConstructorPrototype.setFocus(currentFilter,
            FilterTypes.FILTER_ALL, "br");
    document.getElementsByClassName(FilterTypes.FILTER_ACTIVE)[0]
        .style.borderRadius =
        todosFiltersConstructorPrototype.setFocus(currentFilter,
            FilterTypes.FILTER_ACTIVE, "br");
    document.getElementsByClassName(FilterTypes.FILTER_COMPLETED)[0]
        .style.borderRadius =
        todosFiltersConstructorPrototype.setFocus(currentFilter,
            FilterTypes.FILTER_COMPLETED, "br");

};

module.exports = new TodosFiltersConstructor();

/***/ }),
/* 17 */
/***/ (function(module, exports) {

function TodosCounterConstructor() {
}

TodosCounterConstructor.prototype.getNumOfActiveItems = function(todosArray) {
    var num = 0, i;

    for (i = 0; i < todosArray.length; i++) {
        if (!todosArray[i].completed) {
            num++;
        }
    }

    return num + " items left";
};

TodosCounterConstructor.prototype.render = function (todosArray) {
    document.querySelector(".todos-actions-bar_counter-undone").innerHTML =
        this.getNumOfActiveItems(todosArray)
};

module.exports = new TodosCounterConstructor();

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var EventBus = __webpack_require__(1);
var EventsTypes = __webpack_require__(2);
var TODOS_DELETE_ALL_COMPLETED_BUTTON = "todos-actions-bar_delete-done";

function TodosDeleteAllCompletedConstructor() {
    this.todosDelButton.addEventListener('click', this.handlerClick);
}

var todosDeleteAllCompletedConstructorPrototype =
    TodosDeleteAllCompletedConstructor.prototype;

todosDeleteAllCompletedConstructorPrototype.todosDelButton =
    document.getElementsByClassName(TODOS_DELETE_ALL_COMPLETED_BUTTON)[0];

todosDeleteAllCompletedConstructorPrototype.bus = EventBus;

todosDeleteAllCompletedConstructorPrototype.handlerClick = function (event) {
    if (event.target.className.
        localeCompare(TODOS_DELETE_ALL_COMPLETED_BUTTON) === 0) {
        todosDeleteAllCompletedConstructorPrototype.bus.emit(
            EventsTypes.DELETE_ALL_COMPLETED_TODOS,
            null
        );
    }
};

module.exports = new TodosDeleteAllCompletedConstructor();

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var BasePresenter = __webpack_require__(0);

function MakeAllCompletedTodosPresenter() {}

MakeAllCompletedTodosPresenterPrototype =
    MakeAllCompletedTodosPresenter.prototype;

MakeAllCompletedTodosPresenterPrototype.__proto__ = BasePresenter.prototype;

MakeAllCompletedTodosPresenterPrototype.updateModel = function (data) {
    var currentModel =
        MakeAllCompletedTodosPresenterPrototype.model.makeAllCompleted();

    MakeAllCompletedTodosPresenterPrototype.changeView(currentModel);
};

module.exports = MakeAllCompletedTodosPresenter;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var BasePresenter = __webpack_require__(0);

function ToggleTodosPresenter() {}

ToggleTodosPresenterPrototype = ToggleTodosPresenter.prototype;

ToggleTodosPresenterPrototype.__proto__ = BasePresenter.prototype;

ToggleTodosPresenterPrototype.updateModel = function (data) {
    var currentModel = ToggleTodosPresenterPrototype
        .model.toggleItem(data.id);

    ToggleTodosPresenterPrototype.changeView(currentModel);
};

module.exports = ToggleTodosPresenter;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var BasePresenter = __webpack_require__(0);

function DeleteTodosPresenter() {}

DeleteTodosPresenterPrototype = DeleteTodosPresenter.prototype;

DeleteTodosPresenterPrototype.__proto__ = BasePresenter.prototype;

DeleteTodosPresenterPrototype.updateModel = function (data) {
    var currentModel = DeleteTodosPresenterPrototype
        .model.deleteItem(data.id);

    DeleteTodosPresenterPrototype.changeView(currentModel);
};

module.exports = DeleteTodosPresenter;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var BasePresenter = __webpack_require__(0);

function DeleteAllCompletedTodosPresenter() {}

DeleteAllCompletedTodosPresenterPrototype =
    DeleteAllCompletedTodosPresenter.prototype;

DeleteAllCompletedTodosPresenterPrototype.__proto__ = BasePresenter.prototype;

DeleteAllCompletedTodosPresenterPrototype.updateModel = function (data) {
    var currentModel =
        DeleteAllCompletedTodosPresenterPrototype
            .model.deleteAllCompletedItems();

    DeleteAllCompletedTodosPresenterPrototype.changeView(currentModel);
};

module.exports = DeleteAllCompletedTodosPresenter;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var BasePresenter = __webpack_require__(0);

function SetTodosFilterPresenter() {}

SetTodosFilterPresenterPrototype = SetTodosFilterPresenter.prototype;

SetTodosFilterPresenterPrototype.__proto__ = BasePresenter.prototype;

SetTodosFilterPresenterPrototype.updateModel = function (data) {
    var currentModel = SetTodosFilterPresenterPrototype
        .model.addTodos({
            "todosFilter": data.filter
        });

    SetTodosFilterPresenterPrototype.changeView(currentModel);
};

module.exports = SetTodosFilterPresenter;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map