var EventBus = require('../../utils/EventBus');
var EventsTypes = require('../../constants/EventsTypes');
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
