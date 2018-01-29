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