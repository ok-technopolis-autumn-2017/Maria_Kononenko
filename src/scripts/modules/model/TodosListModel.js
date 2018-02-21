var FilterTypes = require('../../constants/FilterTypes');
var TodoModel = require('./TodoModel');
var EventsTypes = require('../../constants/EventsTypes');
var EventBus = require('../../utils/EventBus');

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