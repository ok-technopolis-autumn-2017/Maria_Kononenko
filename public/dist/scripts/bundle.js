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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
/***/ (function(module, exports) {

var CONSTS = {
    "ADD_TODOS": 'ADD_TODOS',
    "TOGGLE_TODOS": 'TOGGLE_TODOS',
    "DELETE_TODOS": 'DELETE_TODOS',
    "MAKE_ALL_COMPLETED_TODOS": 'MAKE_ALL_COMPLETED_TODOS',
    "DELETE_ALL_COMPLETED_TODOS": 'DELETE_ALL_COMPLETED_TODOS',
    "SET_VISIBILITY_FILTER": 'SET_VISIBILITY_FILTER',
    "UPDATE_VIEW": 'UPDATE_VIEW'
};

module.exports = CONSTS;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

function TodoModel(id, text, completed) {
    return {
        "id": id,
        "text": text,
        "completed": completed
    }
}

module.exports = TodoModel;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function anonymous(locals, filters, escape, rethrow) {
    escape = escape || function(html) {
        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
    };
    var __stack = {
        lineno: 1,
        input: '<div class=\'<%=(todoModel.completed) ?  "todos-item __done" : "todos-item" %>\'\n        style=\'display:<%\n            switch (currentFilter) {\n                case \'todos-filter __all\': {%>\n                    <%="block"%>\n                    <%} break;%>\n\n                <%case \'todos-filter __completed\':{%>\n                    <%=(todoModel.completed) ?\n                        "block" : "none"%>\n                    <%} break;%>\n\n                <%case \'todos-filter __active\':{%>\n                    <%=(todoModel.completed) ?\n                        "none" : "block"%>\n                    <%} break;}%>\'\n        id=<%=todoModel.id%>>\n\n    <div class=\'<%= (todoModel.completed) ?\n            "todos-item_done-mark-w todos-item_belonging-checkbox" :\n            "todos-item_undone-mark-w todos-item_belonging-checkbox" %>\'>\n\n        <div class=\'<%= (todoModel.completed) ?\n                "todos-item_done-mark-icon" :\n                "todos-item_undone-mark-icon" %>\'>\n        </div>\n\n        <input class=\'<%= (todoModel.completed) ?\n                "todos-item_done-mark" :\n                "todos-item_undone-mark"%>\' aria-label=\'<%=(todoModel.completed) ?\n                "mark done" :\n                "mark undone"%>\'\n        />\n\n    </div>\n\n    <div class="todos-item_delete-w">\n\n        <div class="todos-item_delete_icon"></div>\n\n        <button class="todos-item_delete" aria-label="delete item">\n        </button>\n\n    </div>\n\n    <div class="todos-item_name-w">\n        <textarea class="todos-item_name"><%=todoModel.text%></textarea>\n\n    </div>\n\n</div>',
        filename: "."
    };
    function rethrow(err, str, filename, lineno) {
        var lines = str.split("\n"), start = Math.max(lineno - 3, 0), end = Math.min(lines.length, lineno + 3);
        var context = lines.slice(start, end).map(function(line, i) {
            var curr = i + start + 1;
            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
        }).join("\n");
        err.path = filename;
        err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
        throw err;
    }
    try {
        var buf = [];
        with (locals || {}) {
            (function() {
                buf.push("<div class='", escape((__stack.lineno = 1, todoModel.completed ? "todos-item __done" : "todos-item")), "'\n        style='display:");
                __stack.lineno = 2;
                switch (currentFilter) {
                  case "todos-filter __all":
                    {
                        buf.push("\n                    ", escape((__stack.lineno = 5, "block")), "\n                    ");
                        __stack.lineno = 6;
                    }
                    break;
                    buf.push("\n\n                ");
                    __stack.lineno = 8;
                  case "todos-filter __completed":
                    {
                        buf.push("\n                    ", escape((__stack.lineno = 9, todoModel.completed ? "block" : "none")), "\n                    ");
                        __stack.lineno = 11;
                    }
                    break;
                    buf.push("\n\n                ");
                    __stack.lineno = 13;
                  case "todos-filter __active":
                    {
                        buf.push("\n                    ", escape((__stack.lineno = 14, todoModel.completed ? "none" : "block")), "\n                    ");
                        __stack.lineno = 16;
                    }
                    break;
                }
                buf.push("'\n        id=", escape((__stack.lineno = 17, todoModel.id)), ">\n\n    <div class='", escape((__stack.lineno = 19, todoModel.completed ? "todos-item_done-mark-w todos-item_belonging-checkbox" : "todos-item_undone-mark-w todos-item_belonging-checkbox")), "'>\n\n        <div class='", escape((__stack.lineno = 23, todoModel.completed ? "todos-item_done-mark-icon" : "todos-item_undone-mark-icon")), "'>\n        </div>\n\n        <input class='", escape((__stack.lineno = 28, todoModel.completed ? "todos-item_done-mark" : "todos-item_undone-mark")), "' aria-label='", escape((__stack.lineno = 30, todoModel.completed ? "mark done" : "mark undone")), '\'\n        />\n\n    </div>\n\n    <div class="todos-item_delete-w">\n\n        <div class="todos-item_delete_icon"></div>\n\n        <button class="todos-item_delete" aria-label="delete item">\n        </button>\n\n    </div>\n\n    <div class="todos-item_name-w">\n        <textarea class="todos-item_name">', escape((__stack.lineno = 47, todoModel.text)), "</textarea>\n\n    </div>\n\n</div>");
            })();
        }
        return buf.join("");
    } catch (err) {
        rethrow(err, __stack.input, __stack.filename, __stack.lineno);
    }
}

/***/ }),
/* 4 */
/***/ (function(module, exports) {

function createDomElement(html) {
    var el = document.createElement('div');
    el.innerHTML = html;
    return el.firstChild;
}

module.exports = createDomElement;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

var CONSTS = {
    "FILTER_ALL": 'todos-filter __all',
    "FILTER_COMPLETED": 'todos-filter __completed',
    "FILTER_ACTIVE": 'todos-filter __active'
};

module.exports = CONSTS;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var TodosContainer = __webpack_require__(7);
var TodosListModel = __webpack_require__(15);
var Presenter =__webpack_require__(16);
var c = __webpack_require__(4);
var t = __webpack_require__(3);

function init() {
    new Presenter(new TodosContainer(), new TodosListModel());
}

document.addEventListener('DOMContentLoaded', init);



/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var AddTodos = __webpack_require__(8);
var TodosList = __webpack_require__(9);
var TodosBar = __webpack_require__(11);

function TodosContainerConstructor() {}

var TodosContainerConstructorPrototype = TodosContainerConstructor.prototype;

TodosContainerConstructorPrototype.render = function (currentModel) {
    console.log(currentModel);
    AddTodos.setVisibility(currentModel.todosArray.length);
    TodosList.render(currentModel);
    TodosBar.render(currentModel);
};

module.exports = TodosContainerConstructor;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var EventBus = __webpack_require__(0);
var EventsTypes = __webpack_require__(1);
var TodoModel = __webpack_require__(2);

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
        addTodosConstructorPrototype.bus.emit(
            EventsTypes.ADD_TODOS,
            new TodoModel(new Date().getTime(), this.value, false)
        );

        this.value = '';
    }
};

addTodosConstructorPrototype.handlerClick = function (event) {
    addTodosConstructorPrototype.bus.emit(
        EventsTypes.MAKE_ALL_COMPLETED_TODOS, null);
};

module.exports = new AddTodosConstructor();

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var TodosItem = __webpack_require__(10);
var EventBus = __webpack_require__(0);
var EventsTypes = __webpack_require__(1);

var TODOS_LIST = ".todos-list";

var TODOS_DELETE_BUTTON_CLASS_NAME = "todos-item_delete";
var TODOS_CHECKBOX_CLASS_NAME =
    ["todos-item_done-mark", "todos-item_undone-mark"];


function TodosListConstructor() {
    this.todosList.addEventListener('click', this.handlerClick);
}

var todosListConstructorPrototype = TodosListConstructor.prototype;

todosListConstructorPrototype.todosList = document.querySelector(TODOS_LIST);

todosListConstructorPrototype.bus = EventBus;

todosListConstructorPrototype.handlerClick = function (event) {
    switch (event.target.className) {
        case TODOS_CHECKBOX_CLASS_NAME[0]:
        case TODOS_CHECKBOX_CLASS_NAME[1]: {
            todosListConstructorPrototype.bus.emit(
                EventsTypes.TOGGLE_TODOS,
                event.target.parentNode.parentNode.id
            )
        } break;

        case TODOS_DELETE_BUTTON_CLASS_NAME: {
            todosListConstructorPrototype.bus.emit(
                EventsTypes.DELETE_TODOS,
                event.target.parentNode.parentNode.id
            )
        } break;
    }
};

todosListConstructorPrototype.render = function (currentModel) {
    todosListConstructorPrototype.todosList.innerHTML = "";

    currentModel.todosArray.forEach(function (todoModel) {
        todosListConstructorPrototype.todosList.appendChild(
            TodosItem.render(todoModel, currentModel.currentFilter))
    })
};


module.exports = new TodosListConstructor();

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var todosItemTemplate = __webpack_require__(3);
var createDomElement = __webpack_require__(4);

function TodosItemConstructor() {}

var todosItemConstructorPrototype = TodosItemConstructor.prototype;

todosItemConstructorPrototype.render = function(todoModel, currentFilter) {
    return createDomElement(
        todosItemTemplate({
            "todoModel": todoModel,
            "currentFilter": currentFilter
        })
    )
};


module.exports = new TodosItemConstructor();

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var TodosFilters = __webpack_require__(12);
var TodosCounter = __webpack_require__(13);
var TodosDeleteAllCompletedButton = __webpack_require__(14);

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
};

todosBarConstructorPrototype.render = function (currentModel) {
    todosBarConstructorPrototype.setVisibility(currentModel.todosArray.length);
    TodosCounter.render(currentModel.todosArray);
    TodosFilters.render(currentModel.currentFilter);
};

module.exports = new TodosBarConstructor();

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var EventBus = __webpack_require__(0);
var EventsTypes = __webpack_require__(1);
var FilterTypes = __webpack_require__(5);

var TODOS_FILTERS_CLASS = ".todos-filters";

function TodosFiltersConstructor() {
    this.todosFilters.addEventListener('click', this.handlerClick);
}

var todosFiltersConstructorPrototype = TodosFiltersConstructor.prototype;

todosFiltersConstructorPrototype.todosFilters =
    document.querySelector(TODOS_FILTERS_CLASS);

todosFiltersConstructorPrototype.bus = EventBus;

todosFiltersConstructorPrototype.handlerClick = function (event) {
    if (~event.target.className.indexOf(
            FilterTypes.FILTER_COMPLETED)) {

                todosFiltersConstructorPrototype.bus.emit(
                    EventsTypes.SET_VISIBILITY_FILTER,
                    FilterTypes.FILTER_COMPLETED
                )
    } else {
        if (~event.target.className.indexOf(
                FilterTypes.FILTER_ACTIVE)) {

                    todosFiltersConstructorPrototype.bus.emit(
                        EventsTypes.SET_VISIBILITY_FILTER,
                        FilterTypes.FILTER_ACTIVE
                    )
        } else {
            if (~event.target.className.indexOf(
                    FilterTypes.FILTER_ALL)) {

                        todosFiltersConstructorPrototype.bus.emit(
                            EventsTypes.SET_VISIBILITY_FILTER,
                            FilterTypes.FILTER_ALL
                        )
            }
        }
    }
};

todosFiltersConstructorPrototype.render = function (currentFilter) {
    var filters = todosFiltersConstructorPrototype.todosFilters.children;
    var filterClasses, i;

    for (i = 0; i < filters.length; i++) {
        if (~filters[i].className.indexOf(currentFilter)) {
            filterClasses = filters[i].className.split(' ');
            filterClasses[filterClasses.length - 1] = "__choosen";
            filters[i].className = filterClasses.join(' ');
        } else {
            filterClasses = filters[i].className.split(' ');
            filterClasses[filterClasses.length - 1] = "__unchoosen";
            filters[i].className = filterClasses.join(' ');
        }
    }

    filters = null;
    i = null;
    filterClasses = null;
};

module.exports = new TodosFiltersConstructor();

/***/ }),
/* 13 */
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var EventBus = __webpack_require__(0);
var EventsTypes = __webpack_require__(1);
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var FilterTypes = __webpack_require__(5);
var TodoModel = __webpack_require__(2);
var EventsTypes = __webpack_require__(1);
var EventBus = __webpack_require__(0);

function TodosListModel() {
}

TodosListModelPrototype = TodosListModel.prototype;

TodosListModelPrototype.bus = EventBus;

TodosListModelPrototype.storage = {
    "todosArray": [],
    "currentFilter": FilterTypes.FILTER_ALL
};

TodosListModelPrototype.getModel = function () {
    return TodosListModelPrototype.storage
};

TodosListModelPrototype.addTodos = function (todoModel) {
    TodosListModelPrototype.storage.todosArray.push(todoModel);

    TodosListModelPrototype.bus.emit(
        EventsTypes.UPDATE_VIEW,
        TodosListModelPrototype.getModel()
    )
};

TodosListModelPrototype.isEmpty = function () {
    return TodosListModelPrototype.storage.todosArray.length == 0
};

TodosListModelPrototype.makeAllCompleted = function () {
    TodosListModelPrototype.storage.todosArray = TodosListModelPrototype
        .storage.todosArray.map(function (currentTodoModel) {
            return new TodoModel(
                currentTodoModel.id,
                currentTodoModel.text,
                true
            )
        });

    TodosListModelPrototype.bus.emit(
        EventsTypes.UPDATE_VIEW,
        TodosListModelPrototype.getModel()
    )
};

TodosListModelPrototype.toggleItem = function (id) {
    TodosListModelPrototype.storage.todosArray = TodosListModelPrototype
        .storage.todosArray
            .map(function (currentTodoModel) {
                if (currentTodoModel.id == id) {
                    return new TodoModel(
                        currentTodoModel.id,
                        currentTodoModel.text,
                        !currentTodoModel.completed
                    )
                }

                return currentTodoModel
            });

    TodosListModelPrototype.bus.emit(
        EventsTypes.UPDATE_VIEW,
        TodosListModelPrototype.getModel()
    )
};

TodosListModelPrototype.deleteItem = function (id) {
    TodosListModelPrototype.storage.todosArray = TodosListModelPrototype
        .storage.todosArray
            .filter(function (currentTodoModel) {
                if (currentTodoModel.id == id) {
                    return false
                }

                return true
            });

    TodosListModelPrototype.bus.emit(
        EventsTypes.UPDATE_VIEW,
        TodosListModelPrototype.getModel()
    )
};

TodosListModelPrototype.deleteAllCompletedItems = function () {
    TodosListModelPrototype.storage.todosArray = TodosListModelPrototype
        .storage.todosArray
            .filter(function (currentTodoModel) {
                if (currentTodoModel.completed) {
                    return false
                }

                return true
            });

    TodosListModelPrototype.bus.emit(
        EventsTypes.UPDATE_VIEW,
        TodosListModelPrototype.getModel()
    )
};

TodosListModelPrototype.changeCurrentFilter = function (filter) {
    TodosListModelPrototype.storage.currentFilter = filter;
    TodosListModelPrototype.bus.emit(
        EventsTypes.UPDATE_VIEW,
        TodosListModelPrototype.getModel()
    );
};


module.exports = TodosListModel;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var EventsTypes = __webpack_require__(1);
var EventBus = __webpack_require__(0);

function PresenterConstructor(view, model) {
    PresenterConstructor.prototype.view = view;

    view.render(model.getModel());

    this.bus = EventBus;

    this.bus.on(EventsTypes.ADD_TODOS, model.addTodos);
    this.bus.on(EventsTypes.MAKE_ALL_COMPLETED_TODOS, model.makeAllCompleted);
    this.bus.on(EventsTypes.UPDATE_VIEW, this.updateView);
    this.bus.on(EventsTypes.TOGGLE_TODOS, model.toggleItem);
    this.bus.on(EventsTypes.DELETE_TODOS, model.deleteItem);
    this.bus.on(EventsTypes.SET_VISIBILITY_FILTER, model.changeCurrentFilter);
    this.bus.on(
        EventsTypes.DELETE_ALL_COMPLETED_TODOS,
        model.deleteAllCompletedItems
    )
}

PresenterConstructor.prototype.updateView = function (currentModel) {
    PresenterConstructor.prototype.view.render(currentModel)
};

module.exports = PresenterConstructor;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map