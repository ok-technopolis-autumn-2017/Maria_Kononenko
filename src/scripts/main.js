require('./modules/presenters/PresenterRegistration');

var TodosContainer = require('./componets/TodosContainer');
var model = require('./modules/model/Model');
var FilterTypes = require('./constants/FilterTypes');
var Presenter = require('./modules/presenters/MainPresenter');

function init() {
    if (model.isEmpty()) {
        model.addTodos({
            "todosFilter": FilterTypes.FILTER_ALL
        })
    }

    TodosContainer.render(model.getModel());

    new Presenter();
}

document.addEventListener('DOMContentLoaded', init);

