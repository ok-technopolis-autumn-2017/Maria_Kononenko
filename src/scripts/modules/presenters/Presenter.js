var EventsTypes = require('../../constants/EventsTypes');
var EventBus = require('../../utils/EventBus');

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
