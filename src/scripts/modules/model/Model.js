var DataStorage = require("../../dataStorage/DataStorage");
var LocalStorageKey = require('../../constants/LocalStorageKey');

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
}

module.exports = Model;