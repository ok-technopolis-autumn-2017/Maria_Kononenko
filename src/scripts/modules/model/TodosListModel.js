var FilterTypes = require('../../constants/FilterTypes');
var TodoModel = require('./TodoModel');
var EventsTypes = require('../../constants/EventsTypes');
var EventBus = require('../../utils/EventBus');

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
