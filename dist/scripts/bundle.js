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

	var add = __webpack_require__(1);
	var viewAll = __webpack_require__(4);
	var view = __webpack_require__(6);
	var buttonElements;
	var inputElements;
	var deleteEl = __webpack_require__(7);
	var checkbox = __webpack_require__(9);
	var leftItems = __webpack_require__(11);
	var viewActive = __webpack_require__(12);
	var viewCompleted = __webpack_require__(13);
	var clearCompleted = __webpack_require__(14);
	var domElements = __webpack_require__(16);
	/**
	 * Gets all elements from DOM with the tag "button" and "input".
	 * @see addEvent
	 */
	function putListeners() {
	    buttonElements = document.getElementsByTagName("button");
	    inputElements = document.getElementsByTagName("input");
	    for (var i = 0; i < buttonElements.length; i++) {
	        addEvent(buttonElements[i]);
	    }
	    for (var i = 0; i < inputElements.length; i++) {
	        addEvent(inputElements[i]);
	    }
	}
	
	/**
	 * Hands events.
	 * @param event that comes
	 * @see addTodos
	 * @see putListeners
	 * @see countLeftItems
	 * @see getView
	 * @see deleteTodos
	 * @see changeCheckbox
	 * @see getViewActive
	 * @see getViewAll
	 * @see getViewCompleted
	 * @see clearCompletedTodos
	 * @see hideDomElements
	 */
	function handler(event) {
	
	    switch (event.target.className){
	        case "todos-add_new-item": {
	            if (event.keyCode == 13) {
	                if (this.value.localeCompare("") !==0) {
	                    add.addTodos(event, this.value);
	                    this.value = "";
	
	                    view.getView();
	
	                    putListeners();
	
	                    leftItems.countLeftItems();
	                    domElements.hideDomElements();
	                } else {
	                    alert("ENTER NOTE NAME");
	                }
	            }
	        } break;
	
	        case "todos-item_delete": {
	            deleteEl.deleteTodos(event);
	            leftItems.countLeftItems();
	            domElements.hideDomElements();
	        } break;
	
	        case "todos-add_select-all": {
	            for (var i = 0; i < inputElements.length; i++) {
	                if (inputElements[i].className.localeCompare("todos-add_new-item") !== 0) {
	                    checkbox.changeCheckbox(inputElements[i], false);
	                }
	            }
	
	            leftItems.countLeftItems();
	        } break;
	
	        case "todos-filter __all": {
	            viewAll.getViewAll(false);
	        } break;
	
	        case "todos-filter __active": {
	            viewActive.getViewActive()
	        } break;
	
	        case "todos-filter __completed": {
	            viewCompleted.getViewCompleted()
	        } break;
	
	        case "todos-actions-bar_delete-done": {
	            clearCompleted.clearCompletedTodos();
	            leftItems.countLeftItems();
	            domElements.hideDomElements();
	        } break;
	
	        case "todos-item_undone-mark": {
	            checkbox.changeCheckbox(event, true);
	            leftItems.countLeftItems();
	            domElements.hideDomElements();
	        }break;
	
	        case "todos-item_done-mark": {
	            checkbox.changeCheckbox(event, true);
	            leftItems.countLeftItems();
	            domElements.hideDomElements();
	        }break;
	
	        default: {
	
	        }
	    }
	
	}
	
	/**
	 * Adds EventListener on particular action
	 * @param element of DOM
	 * @see handler
	 */
	function addEvent(elem) {
	    switch (elem.className){
	        case "todos-add_new-item": {
	            elem.addEventListener("keypress", handler);
	        } break;
	
	        case "todos-item_undone-mark": {
	            elem.addEventListener("change", handler);
	        } break;
	
	        case "todos-item_done-mark": {
	            elem.addEventListener("change", handler);
	        } break;
	
	        default: {
	            elem.addEventListener("click", handler);
	        }
	    }
	}
	
	
	viewAll.getViewAll(true);
	
	leftItems.countLeftItems();
	
	domElements.hideDomElements();
	
	putListeners();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	var storage = __webpack_require__(2);
	
	/**
	 * creates new obj  with fields "state" - done and "name".
	 * sends to LocalStorage.
	 * @param event - generated event
	 * @param value - String name of todos element
	 * @see setLocalStorage
	 */
	function addTodos(event, value) {
	    var curElement = {
	        name: value,
	        state: "undone"
	    }
	
	    storage.setLocalStorage(curElement);
	
	    curElement = null;
	}
	
	exports.addTodos = addTodos;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	var getValue = __webpack_require__(3);
	
	/**
	 * Adds new element to LocalStorage
	 * @param obj with fields "state" - done/undone mark and "name"
	 * @throws QUOTA_EXCEEDED_ERR if memory is full (5 MB)
	 * @see getLocalStorage
	 */
	function setLocalStorage(value) {
	    var todosStructure;
	
	    if (localStorage.length === 0) {
	        todosStructure = [value];
	    } else {
	        todosStructure = getValue.getLocalStorage("todosElements");
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
	
	exports.setLocalStorage = setLocalStorage;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	/**
	 * Gets data that is in LocalStorage
	 * @param key - String that is in LocalStorage
	 * @return array of obj with fields "state" - done/undone mark and "name"
	 */
	function getLocalStorage(key) {
	    return JSON.parse(localStorage.getItem(key))
	}
	
	exports.getLocalStorage = getLocalStorage;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	var model = __webpack_require__(5);
	
	/**
	 * Shows all elements that are in LocalStorage.
	 * @param  flag true - clear html after insertPosisin
	 * false - display all elements in ParentNode
	 * @see getModel
	 */
	function getViewAll(flag) {
	    /**
	     * Finds particular Node by ClassName.
	     * @return Nodes of particular Class ("todos-list")
	     *
	     */
	    function searchPlace() {
	        return document.getElementsByClassName("todos-list");
	    }
	
	    /**
	     * Inserts new element in DOM
	     * @param list - Parent Node in DOM
	     * @param elementStructure - obj with fields "state" - done/undone mark and "name".
	     */
	    function addNewPosition(list, elementStructure) {
	       var newListEl = document.createElement("div");
	       newListEl.className = "todos-item";
	       /*
	       *first child
	        */
	       var newListElChild = document.createElement("div");
	       newListElChild.className = (elementStructure.state === "undone")
	                                        ? "todos-item_undone-mark-w":
	                                            "todos-item_done-mark-w";
	
	       //1 child of first child
	       var newListElChildChild = document.createElement("div");
	        newListElChildChild.className = (elementStructure.state === "undone")
	                                        ? "todos-item_undone-mark-icon":
	                                        "todos-item_done-mark-icon";
	        newListElChild.appendChild(newListElChildChild);
	
	        //2 child of first child
	        newListElChildChild = document.createElement("input");
	        newListElChildChild.className = (elementStructure.state === "undone")
	                                        ? "todos-item_undone-mark":
	                                        "todos-item_done-mark";
	        newListElChildChild.setAttribute("type", "checkbox");
	        if (elementStructure.state !== "undone") {
	            newListElChildChild.setAttribute("checked", "checked");
	        }
	        newListElChildChild.setAttribute("aria-label", "mark undone");
	        newListElChild.appendChild(newListElChildChild);
	
	        newListEl.appendChild(newListElChild);
	
	        /*
	         *Second child
	         */
	        newListElChild = document.createElement("button");
	        newListElChild.className = "todos-item_delete";
	        newListElChild.setAttribute("aria-label", "delete item");
	
	        //1 of second child
	        newListElChildChild = document.createElement("div");
	        newListElChildChild.className = "todos-item_delete_icon";
	        newListElChild.appendChild(newListElChildChild);
	
	        newListEl.appendChild(newListElChild);
	
	        /*
	         *Third child
	         */
	        newListElChild = document.createElement("div");
	        newListElChild.className = "todos-item_name-w";
	
	        //1 of third child
	        newListElChildChild = document.createElement("textarea");
	        newListElChildChild.className = "todos-item_name";
	        newListElChildChild.value = elementStructure.name;
	        newListElChild.appendChild(newListElChildChild);
	
	        newListEl.appendChild(newListElChild);
	
	        list.appendChild(newListEl);
	
	        newListEl = null;
	        newListElChild = null;
	        newListElChildChild = null;
	
	    }
	
	    if (flag) {
	        var structure = model.getModel();
	
	        if (structure === null) {
	            return;
	        }
	
	        var list = searchPlace()[0];
	        list.innerHTML = "";
	
	        for (var i = 0; i < structure.length; i++) {
	            addNewPosition(list, structure[i]);
	        }
	
	        structure = null;
	        list = null;
	    } else {
	        var listItems = searchPlace()[0].childNodes;
	
	        for (var i = 0; i < listItems.length; i++) {
	            listItems[i].style.display = "block";
	        }
	
	        listItems = null;
	
	    }
	
	}
	
	exports.getViewAll = getViewAll;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	var storage = __webpack_require__(3)
	
	/**
	 * Get array.
	 * @return array of todos elements from LocalStorage
	 * @see getLocalStorage
	 */
	function getModel() {
	    return storage.getLocalStorage("todosElements");
	}
	
	exports.getModel = getModel;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	var model = __webpack_require__(5);
	
	/**
	 * Shows new add element.
	 * @see getModel
	 */
	function getView() {
	    /**
	     * Finds particular Node by ClassName.
	     * @return Nodes of particular Class ("todos-list")
	     *
	     */
	    function searchPlace() {
	        return document.getElementsByClassName("todos-list");
	    }
	
	    /**
	     * Inserts new element in DOM
	     * @param list - Parent Node in DOM
	     * @param elementStructure - obj with fields "state" - done/undone mark and "name".
	     */
	    function addNewPosition(list, elementStructure) {
	        var newListEl = document.createElement("div");
	        newListEl.className = "todos-item";
	        /*
	        *first child
	         */
	        var newListElChild = document.createElement("div");
	        newListElChild.className = (elementStructure.state === "undone")
	            ? "todos-item_undone-mark-w":
	            "todos-item_done-mark-w";
	
	        //1 child of first child
	        var newListElChildChild = document.createElement("div");
	        newListElChildChild.className = (elementStructure.state === "undone")
	            ? "todos-item_undone-mark-icon":
	            "todos-item_done-mark-icon";
	        newListElChild.appendChild(newListElChildChild);
	
	        //2 child of first child
	        newListElChildChild = document.createElement("input");
	        newListElChildChild.className = (elementStructure.state === "undone")
	            ? "todos-item_undone-mark":
	            "todos-item_done-mark";
	        newListElChildChild.setAttribute("type", "checkbox");
	        if (elementStructure.state !== "undone") {
	            newListElChildChild.setAttribute("checked", "checked");
	        }
	        newListElChildChild.setAttribute("aria-label", "mark undone");
	        newListElChild.appendChild(newListElChildChild);
	
	        newListEl.appendChild(newListElChild);
	
	        /*
	         *Second child
	         */
	        newListElChild = document.createElement("button");
	        newListElChild.className = "todos-item_delete";
	        newListElChild.setAttribute("aria-label", "delete item");
	
	        //1 of second child
	        newListElChildChild = document.createElement("div");
	        newListElChildChild.className = "todos-item_delete_icon";
	        newListElChild.appendChild(newListElChildChild);
	
	        newListEl.appendChild(newListElChild);
	
	        /*
	         *Third child
	         */
	        newListElChild = document.createElement("div");
	        newListElChild.className = "todos-item_name-w";
	
	        //1 of third child
	        newListElChildChild = document.createElement("textarea");
	        newListElChildChild.className = "todos-item_name";
	        newListElChildChild.value = elementStructure.name;
	        newListElChild.appendChild(newListElChildChild);
	
	        newListEl.appendChild(newListElChild);
	
	        list.appendChild(newListEl);
	
	        newListEl = null;
	        newListElChild = null;
	        newListElChildChild = null;
	    }
	
	    var structure = model.getModel();
	
	    if (structure === null) {
	        return;
	    }
	
	    var list = searchPlace()[0];
	
	    addNewPosition(list, structure[structure.length - 1]);
	
	    structure = null;
	    list = null;
	}
	
	exports.getView = getView;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	var storage = __webpack_require__(8);
	
	/**
	 * Deletes particular Node in DOM.
	 * Sends index of deleted Node to LocalStorage.
	 * @param event - generated event
	 * @see deleteFromLocalStorage
	 */
	function deleteTodos(event) {
	    /**
	     * Finds particular Node by ClassName.
	     * @return Nodes of particular Class ("todos-list")
	     *
	     */
	    function searchPlace() {
	        return document.getElementsByClassName("todos-list");
	    }
	
	    var list = searchPlace()[0];
	    var childrens = list.childNodes;
	
	    for (var i = 0; i < childrens.length; i++) {
	        if (childrens[i] === event.target.parentNode) {
	            list.removeChild(childrens[i]);
	            storage.deleteFromLocalStorage(i);
	            break;
	        }
	    }
	}
	
	
	exports.deleteTodos = deleteTodos;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	var getValue = __webpack_require__(3);
	
	/**
	 * Deletes element of particular position in array(key - "todosElements").
	 * @param particular position -1 < index < array.size() int
	 * @throws QUOTA_EXCEEDED_ERR if memory is full (5 MB)
	 * @see getLocalStorage
	 */
	function deleteFromLocalStorage(index) {
	    var structure = getValue.getLocalStorage("todosElements");
	
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
	
	exports.deleteFromLocalStorage = deleteFromLocalStorage;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	var storage = __webpack_require__(10);
	
	/**
	 * Changes checkBox state
	 * @param event - generated event
	 * @param flag true - sends data about changed Nodes to LocalStorage
	 * false - just changes state in DOM
	 * @see changeStateLocalStorage
	 */
	function changeCheckbox(event, flag) {
	    var parent = (flag) ? event.target.parentNode : event.parentNode;
	    var childs = parent.childNodes;
	    var mark = "done";
	
	    /**
	     * Changes Nodes ClassName in Dom
	     */
	    function switcher() {
	        if (parent.className.localeCompare("todos-item_undone-mark-w") === 0) {
	            childs[0].className = "todos-item_done-mark-icon";
	            childs[1].className = "todos-item_done-mark";
	            childs[1].setAttribute("checked", "checked");
	            childs[1].setAttribute("aria-label", "mark done");
	            parent.className = "todos-item_done-mark-w";
	            mark = "done";
	        } else {
	            childs[0].className = "todos-item_undone-mark-icon";
	            childs[1].className = "todos-item_undone-mark";
	            childs[1].removeAttribute("checked");
	            childs[1].setAttribute("aria-label", "mark undone");
	            parent.className = "todos-item_undone-mark-w";
	            mark = "undone";
	        }
	    }
	
	
	    /**
	     * @return the position of changed Node in DOM
	     */
	    function findIndex() {
	        /**
	         * Finds particular Node by ClassName.
	         * @return Nodes of particular Class ("todos-list")
	         *
	         */
	        function searchPlace() {
	            return document.getElementsByClassName("todos-list");
	        }
	
	        var list = searchPlace()[0];
	        var childrens = list.childNodes;
	
	        for (var i = 0; i < childrens.length; i++) {
	            if (childrens[i] === parent.parentNode) {
	                return i;
	            }
	        }
	    }
	
	    if (flag) {
	        switcher();
	        storage.changeStateLocalStorage(findIndex(), mark);
	        parent = null;
	        childs = null;
	
	        return;
	    }
	
	    if (parent.className.localeCompare("todos-item_undone-mark-w") === 0) {
	        switcher();
	        storage.changeStateLocalStorage(findIndex(), mark);
	
	    }
	
	    parent = null;
	    childs = null;
	}
	
	exports.changeCheckbox = changeCheckbox;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	var getValue = __webpack_require__(3);
	
	/**
	 * Changes field("state") of particular object from current state to mark(@param2).
	 * @param particular position -1 < index < array.size() int
	 * @param String "done"/"undone"
	 * @throws QUOTA_EXCEEDED_ERR if memory is full (5 MB)
	 * @see getLocalStorage
	 */
	function changeStateLocalStorage(index, mark) {
	    var structure = getValue.getLocalStorage("todosElements");
	
	    if (index > -1) {
	        structure[index].state = mark;
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
	
	exports.changeStateLocalStorage = changeStateLocalStorage;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	var storage = __webpack_require__(3);
	
	/**
	 * Counts undone Todos elements.
	 * Shows the number.
	 */
	function countLeftItems() {
	    function count() {
	        var structure = storage.getLocalStorage("todosElements");
	        var num = 0;
	
	        for (var i = 0; i < structure.length; i++) {
	            if (structure[i].state.localeCompare("undone") === 0) {
	                num++;
	            }
	        }
	
	        return num;
	    }
	
	    /**
	     * Finds particular Node by ClassName.
	     * @return Nodes of particular Class ("todos-actions-bar_counter-undone")
	     *
	     */
	    function searchPlace() {
	        return document.getElementsByClassName("todos-actions-bar_counter-undone");
	    }
	
	    var element = searchPlace()[0];
	
	    element.innerHTML = count().toString() + " items left";
	}
	
	exports.countLeftItems = countLeftItems;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	/**
	 * shows nodes with className = "todos-item_undone-mark-w"
	 * hides nodes with className = "todos-item_done-mark-w"
	 */
	function getViewActive() {
	    /**
	     * Finds particular Node by ClassName.
	     * @param par - ClassName - string
	     * @return Nodes of particular Class
	     *
	     */
	    function searchPlace(par) {
	        return document.getElementsByClassName(par);
	    }
	
	    var listTodos = searchPlace("todos-item_undone-mark-w");
	
	    for (var i = 0; i < listTodos.length; i++) {
	        listTodos[i].parentNode.style.display = "block";
	    }
	
	    listTodos = searchPlace("todos-item_done-mark-w");
	
	    for (var i = 0; i < listTodos.length; i++) {
	        listTodos[i].parentNode.style.display = "none";
	    }
	
	    listTodos=null;
	
	}
	
	exports.getViewActive = getViewActive;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	/**
	 * shows nodes with className = "todos-item_done-mark-w"
	 * hides nodes with className = "todos-item_undone-mark-w"
	 */
	function getViewCompleted() {
	    function searchPlace(par) {
	        return document.getElementsByClassName(par);
	    }
	
	    var listTodos = searchPlace("todos-item_done-mark-w");
	
	    for (var i = 0; i < listTodos.length; i++) {
	        listTodos[i].parentNode.style.display = "block";
	    }
	
	    listTodos = searchPlace("todos-item_undone-mark-w");
	
	    for (var i = 0; i < listTodos.length; i++) {
	        listTodos[i].parentNode.style.display = "none";
	    }
	
	    listTodos=null;
	
	}
	
	exports.getViewCompleted = getViewCompleted;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	var storage = __webpack_require__(15);
	
	/**
	 * Deletes Node with ClassName = "todos-item_done-mark-w" from DOM
	 * @see clearComFromLocalStorage
	 */
	function clearCompletedTodos() {
	    function searchPlace(par) {
	        return document.getElementsByClassName(par);
	    }
	
	    var listTodos = searchPlace("todos-item_done-mark-w");
	    var list = searchPlace("todos-list")[0];
	    var el;
	    var size = listTodos.length;
	
	    while (size != 0){
	        el = listTodos[size - 1].parentNode;
	        list.removeChild(el);
	        size--;
	    }
	
	    list = null;
	    listTodos = null;
	
	    storage.clearComFromLocalStorage();
	}
	
	exports.clearCompletedTodos = clearCompletedTodos;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	var getValue = __webpack_require__(3);
	
	/**
	 * Deletes elements with state: done in array(key - "todosElements").
	 * @throws QUOTA_EXCEEDED_ERR if memory is full (5 MB)
	 * @see getLocalStorage
	 */
	function clearComFromLocalStorage() {
	    var structure = getValue.getLocalStorage("todosElements");
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
	
	exports.clearComFromLocalStorage = clearComFromLocalStorage;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	var storage = __webpack_require__(17);
	
	/**
	 * Hides Nodes with ClassNames "todos-add_select-all" and "todos-actions-bar"
	 * if LocalStorage is empty
	 * if not displays them
	 * @see isLocalStorageEmpty
	 */
	function hideDomElements() {
	    /**
	     * Finds particular Node by ClassName.
	     * @param par - ClassName - string
	     * @return Nodes of particular Class
	     *
	     */
	    function searchPlace(par) {
	        return document.getElementsByClassName(par);
	    }
	    var button = searchPlace("todos-add_select-all")[0];
	    var actionsBar = searchPlace("todos-actions-bar")[0];
	
	    if (storage.isLocalStorageEmpty()) {
	        button.style.visibility = "hidden";
	        actionsBar.style.display = "none";
	    } else {
	        button.style.visibility = "visible";
	        actionsBar.style.display = "flex";
	    }
	
	    button = null;
	    actionsBar = null;
	}
	
	exports.hideDomElements = hideDomElements;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	var getValue = __webpack_require__(3);
	
	/**
	 * Checks for elements in LocalStorage
	 * @return there are something ? true : false
	 * @see getLocalStorage
	 */
	function isLocalStorageEmpty() {
	    var structure = getValue.getLocalStorage("todosElements");
	
	    return (structure.length === 0);
	}
	
	
	exports.isLocalStorageEmpty = isLocalStorageEmpty;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map