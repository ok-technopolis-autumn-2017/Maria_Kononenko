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
        input: '<div class=\'<%=(todoModel.completed) ?  "todos-item __done" : "todos-item" %>\'\n        style=\'display:<%\n            switch (currentFilter) {\n                case \'todos-filter __all\': {%>\n                    <%="block"%>\n                    <%} break;%>\n\n                <%case \'todos-filter __completed\':{%>\n                    <%=(todoModel.completed) ?\n                        "block" : "none"%>\n                    <%} break;%>\n\n                <%case \'todos-filter __active\':{%>\n                    <%=(todoModel.completed) ?\n                        "none" : "block"%>\n                    <%} break;}%>\'\n        id=<%=todoModel.id%>>\n\n    <div class="todos-item_checkbox todos-item_belonging-checkbox">\n\n        <input class="todos-item_checkbox-ready-mark"\n               aria-label=\'<%=(todoModel.completed) ?\n                       "mark done" :\n                       "mark undone"%>\'\n               <%=(todoModel.completed) ? checked="checked" : ""%>\n               type="checkbox"\n        />\n        <div class="todos-item_checkbox-ready-mark-w">\n            <div class="todos-item_checkbox-ready-mark-icon">\n            </div>\n        </div>\n\n    </div>\n\n    <div class="todos-item_delete-w">\n\n        <div class="todos-item_delete_icon"></div>\n\n        <button class="todos-item_delete" aria-label="delete item">\n        </button>\n\n    </div>\n\n    <div class="todos-item_name-w">\n        <textarea class="todos-item_name"><%=todoModel.text%></textarea>\n\n    </div>\n\n</div>\n',
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
                buf.push("'\n        id=", escape((__stack.lineno = 17, todoModel.id)), '>\n\n    <div class="todos-item_checkbox todos-item_belonging-checkbox">\n\n        <input class="todos-item_checkbox-ready-mark"\n               aria-label=\'', escape((__stack.lineno = 22, todoModel.completed ? "mark done" : "mark undone")), "'\n               ", escape((__stack.lineno = 25, todoModel.completed ? checked = "checked" : "")), '\n               type="checkbox"\n        />\n        <div class="todos-item_checkbox-ready-mark-w">\n            <div class="todos-item_checkbox-ready-mark-icon">\n            </div>\n        </div>\n\n    </div>\n\n    <div class="todos-item_delete-w">\n\n        <div class="todos-item_delete_icon"></div>\n\n        <button class="todos-item_delete" aria-label="delete item">\n        </button>\n\n    </div>\n\n    <div class="todos-item_name-w">\n        <textarea class="todos-item_name">', escape((__stack.lineno = 45, todoModel.text)), "</textarea>\n\n    </div>\n\n</div>\n");
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
var template = __webpack_require__(3);
var add = __webpack_require__(4);

function init() {
    /*document.querySelector('.todos-list').appendChild(add(template({
        "todoModel": {
            "id": 1,
            "text": "maha",
            "completed": true
        },
        "currentFilter": 'todos-filter __all'
    })))*/
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


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var TodosItem = __webpack_require__(10);
var EventBus = __webpack_require__(0);
var EventsTypes = __webpack_require__(1);

var TODOS_LIST = ".todos-list";

var TODOS_DELETE_BUTTON_CLASS_NAME = "todos-item_delete";
var TODOS_CHECKBOX_CLASS_NAME ="todos-item_checkbox-ready-mark";


function TodosListConstructor() {
    this.bus = EventBus;
    this.todosList = document.querySelector(TODOS_LIST);

    this.todosList.addEventListener(
        'click',
        this.handlerClick.bind(this)
    );
    this.todosList.addEventListener(
        'change',
        this.handlerChange.bind(this)
    );
}

var todosListConstructorPrototype = TodosListConstructor.prototype;

todosListConstructorPrototype.handlerClick = function (event) {
    if (event.target.className === TODOS_DELETE_BUTTON_CLASS_NAME) {
        this.bus.emit(
            EventsTypes.DELETE_TODOS,
            event.target.parentNode.parentNode.id
        )
    }
};

todosListConstructorPrototype.handlerChange = function (event) {
    if (event.target.className === TODOS_CHECKBOX_CLASS_NAME) {
        this.bus.emit(
            EventsTypes.TOGGLE_TODOS,
            event.target.parentNode.parentNode.id
        )
    }
};

todosListConstructorPrototype.render = function (currentModel) {
    this.todosList.innerHTML = "";

    currentModel.todosArray.forEach((function (todoModel) {
        this.todosList.appendChild(
            TodosItem.render(todoModel, currentModel.currentFilter))
    }).bind(this))
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
    this.todoBar = document.querySelector(TODOS_BAR);
}

var todosBarConstructorPrototype = TodosBarConstructor.prototype;

todosBarConstructorPrototype.setVisibility = function (num) {
    if (num == 0) {
        this.todoBar.style.display = "none"
    } else {
        this.todoBar.style.display = "flex"
    }
};

todosBarConstructorPrototype.render = function (currentModel) {
    this.setVisibility(currentModel.todosArray.length);
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
    this.bus = EventBus;
    this.todosFilters =
        document.querySelector(TODOS_FILTERS_CLASS);

    this.todosFilters.addEventListener('click', this.handlerClick.bind(this));
}

var todosFiltersConstructorPrototype = TodosFiltersConstructor.prototype;

todosFiltersConstructorPrototype.handlerClick = function (event) {
    if (~event.target.className.indexOf(
            FilterTypes.FILTER_COMPLETED)) {

                this.bus.emit(
                    EventsTypes.SET_VISIBILITY_FILTER,
                    FilterTypes.FILTER_COMPLETED
                )
    } else {
        if (~event.target.className.indexOf(
                FilterTypes.FILTER_ACTIVE)) {

                    this.bus.emit(
                        EventsTypes.SET_VISIBILITY_FILTER,
                        FilterTypes.FILTER_ACTIVE
                    )
        } else {
            if (~event.target.className.indexOf(
                    FilterTypes.FILTER_ALL)) {

                        this.bus.emit(
                            EventsTypes.SET_VISIBILITY_FILTER,
                            FilterTypes.FILTER_ALL
                        )
            }
        }
    }
};

todosFiltersConstructorPrototype.render = function (currentFilter) {
    var filters = this.todosFilters.children;
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

TodosCounterConstructor.prototype.setActiveItemsCount = function(todosArray) {
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
        this.setActiveItemsCount(todosArray)
};

module.exports = new TodosCounterConstructor();


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var EventBus = __webpack_require__(0);
var EventsTypes = __webpack_require__(1);
var TODOS_DELETE_ALL_COMPLETED_BUTTON = "todos-actions-bar_delete-done";

function TodosDeleteAllCompletedConstructor() {
    this.bus = EventBus;
    this.todosDelButton =
        document.getElementsByClassName(TODOS_DELETE_ALL_COMPLETED_BUTTON)[0];

    this.todosDelButton.addEventListener('click', this.handlerClick.bind(this));
}

var todosDeleteAllCompletedConstructorPrototype =
    TodosDeleteAllCompletedConstructor.prototype;

todosDeleteAllCompletedConstructorPrototype.handlerClick = function (event) {
    if (event.target.className.
        localeCompare(TODOS_DELETE_ALL_COMPLETED_BUTTON) === 0) {
        this.bus.emit(
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
    this.bus = EventBus;
    this.storage = {
        "todosArray": [],
        "currentFilter": FilterTypes.FILTER_ALL
    };
}

var todosListModelPrototype = TodosListModel.prototype;

todosListModelPrototype.getModel = function () {
    return this.storage
};

todosListModelPrototype.addTodos = function (todoModel) {
    this.storage.todosArray.push(todoModel);

    this.bus.emit(
        EventsTypes.UPDATE_VIEW,
        this.getModel()
    )
};

todosListModelPrototype.isEmpty = function () {
    return this.storage.todosArray.length == 0
};

todosListModelPrototype.makeAllCompleted = function () {
    this.storage.todosArray = this
        .storage.todosArray.map(function (currentTodoModel) {
            return new TodoModel(
                currentTodoModel.id,
                currentTodoModel.text,
                true
            )
        });

    this.bus.emit(
        EventsTypes.UPDATE_VIEW,
        this.getModel()
    )
};

todosListModelPrototype.toggleItem = function (id) {
    this.storage.todosArray = this.storage.todosArray
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

    this.bus.emit(
        EventsTypes.UPDATE_VIEW,
        this.getModel()
    )
};

todosListModelPrototype.deleteItem = function (id) {
    this.storage.todosArray = this.storage.todosArray
        .filter(function (currentTodoModel) {
            if (currentTodoModel.id == id) {
                return false
            }

            return true
        });

    this.bus.emit(
        EventsTypes.UPDATE_VIEW,
        this.getModel()
    )
};

todosListModelPrototype.deleteAllCompletedItems = function () {
    this.storage.todosArray = this.storage.todosArray
            .filter(function (currentTodoModel) {
                if (currentTodoModel.completed) {
                    return false
                }

                return true
            });

    this.bus.emit(
        EventsTypes.UPDATE_VIEW,
        this.getModel()
    )
};

todosListModelPrototype.changeCurrentFilter = function (filter) {
    this.storage.currentFilter = filter;
    this.bus.emit(
        EventsTypes.UPDATE_VIEW,
        this.getModel()
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

    this.bus.on(EventsTypes.ADD_TODOS, model.addTodos.bind(model));
    this.bus.on(
        EventsTypes.MAKE_ALL_COMPLETED_TODOS,
        model.makeAllCompleted.bind(model));
    this.bus.on(EventsTypes.UPDATE_VIEW, this.updateView.bind(model));
    this.bus.on(EventsTypes.TOGGLE_TODOS, model.toggleItem.bind(model));
    this.bus.on(EventsTypes.DELETE_TODOS, model.deleteItem.bind(model));
    this.bus.on(
        EventsTypes.SET_VISIBILITY_FILTER,
        model.changeCurrentFilter.bind(model));
    this.bus.on(
        EventsTypes.DELETE_ALL_COMPLETED_TODOS,
        model.deleteAllCompletedItems.bind(model)
    )
}

PresenterConstructor.prototype.updateView = function (currentModel) {
    PresenterConstructor.prototype.view.render(currentModel)
};

module.exports = PresenterConstructor;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map