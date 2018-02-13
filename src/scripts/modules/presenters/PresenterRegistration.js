var AddTodosPresenter = require('./base-presenters/AddTodosPresenter');
var MakeAllCompletedTodosPresenter =
    require('./base-presenters/MakeAllCompletedTodosPresenter');
var ToggleTodosPresenter = require('./base-presenters/ToggleTodosPresenter');
var DeleteTodosPresenter = require('./base-presenters/DeleteTodosPresenter');
var DeleteAllCompletedTodosPresenter =
    require('./base-presenters/DeleteAllCompletedTodosPresenter');
var SetTodosFilterPresenter =
    require('./base-presenters/SetTodosFilterPresenter');

var MainPresenter = require('./MainPresenter');
var EventsTypes = require('../../constants/EventsTypes');

new MainPresenter().registrateNewPresenter(
    new DeleteAllCompletedTodosPresenter().updateModel,
    EventsTypes.DELETE_ALL_COMPLETED_TODOS
);

new MainPresenter().registrateNewPresenter(
    new AddTodosPresenter().updateModel,
    EventsTypes.ADD_TODOS
);

new MainPresenter().registrateNewPresenter(
    new DeleteTodosPresenter().updateModel,
    EventsTypes.DELETE_TODOS
);

new MainPresenter().registrateNewPresenter(
    new MakeAllCompletedTodosPresenter().updateModel,
    EventsTypes.MAKE_ALL_COMPLETED_TODOS
);

new MainPresenter().registrateNewPresenter(
    new SetTodosFilterPresenter().updateModel,
    EventsTypes.SET_VISIBILITY_FILTER
);

new MainPresenter().registrateNewPresenter(
    new ToggleTodosPresenter().updateModel,
    EventsTypes.TOGGLE_TODOS
);