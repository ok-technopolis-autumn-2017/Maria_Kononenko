var DataStorage = require("../../dataStorage/DataStorage")
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