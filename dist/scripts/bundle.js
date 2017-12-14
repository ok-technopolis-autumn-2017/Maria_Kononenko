/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

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
	                } else {
	                    alert("ENTER NODE NAME");
	                }
	            }
	        } break;

	        case "todos-item_delete": {
	            deleteEl.deleteTodos(event);
	            leftItems.countLeftItems();
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
	            clearCompleted.clearCompletedTodos()
	        } break;

	        default: {
	            checkbox.changeCheckbox(event, true);
	            leftItems.countLeftItems();
	        }
	    }

	}

	function addEvent(elem) {
	    switch (elem.className){
	        case "todos-add_new-item": {
	            elem.addEventListener("keypress", handler);
	        } break;

	        case "todos-item_undone-mark"||"todos-item_undone-mark": {
	            elem.addEventListener("change", handler);
	        } break;

	        default: {
	            elem.addEventListener("click", handler);
	        }
	    }
	}

	viewAll.getViewAll(true);
	leftItems.countLeftItems();

	putListeners();


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	var storage = __webpack_require__(2);

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

	function getLocalStorage(key) {
	    return JSON.parse(localStorage.getItem(key))
	}

	exports.getLocalStorage = getLocalStorage;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	var model = __webpack_require__(5);

	function getViewAll(flag) {
	    function searchPlace() {
	        return document.getElementsByClassName("todos-list");
	    }

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

	    /*function removeOldPositions(list) {
	        var listElements = list.children;
	        alert(listElements.length.toString());
	        for (var i = 0; i < listElements.length; i++) {
	            list.removeChild(listElement[i]);
	        }
	    }*/

	    if (flag) {
	        var structure = model.getModel();
	        if (structure === null) {
	            return;
	        }

	        var list = searchPlace()[0];
	        //removeOldPositions(list);
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
	function getModel() {
	    return storage.getLocalStorage("todosElements");
	}

	exports.getModel = getModel;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	var model = __webpack_require__(5);

	function getView() {
	    function searchPlace() {
	        return document.getElementsByClassName("todos-list");
	    }

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

	    /*function removeOldPositions(list) {
	        var listElements = list.children;
	        alert(listElements.length.toString());
	        for (var i = 0; i < listElements.length; i++) {
	            list.removeChild(listElement[i]);
	        }
	    }*/

	    var structure = model.getModel();
	    if (structure === null) {
	        return;
	    }

	    var list = searchPlace()[0];
	    //removeOldPositions(list);
	    addNewPosition(list, structure[structure.length - 1]);
	    structure = null;
	    list = null;
	}

	exports.getView = getView;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	var storage = __webpack_require__(8)
	function deleteTodos(event) {
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

	    //alert(event.target.parentNode)
	}


	exports.deleteTodos = deleteTodos;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	var getValue = __webpack_require__(3);

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

	function changeCheckbox(event, flag) {
	    var parent = (flag) ? event.target.parentNode : event.parentNode;
	    var childs = parent.childNodes;
	    var mark = "done";

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

	    function findIndex() {
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
	        return
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

	function getViewActive() {
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

/***/ })
/******/ ]);