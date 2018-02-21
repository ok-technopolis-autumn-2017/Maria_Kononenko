var EventsTypes = require('../../constants/EventsTypes');
var EventBus = require('../../utils/EventBus');

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