var BasePresenter = require('./BasePresenter');

function ToggleTodosPresenter() {}

ToggleTodosPresenterPrototype = ToggleTodosPresenter.prototype;

ToggleTodosPresenterPrototype.__proto__ = BasePresenter.prototype;

ToggleTodosPresenterPrototype.updateModel = function (data) {
    var currentModel = ToggleTodosPresenterPrototype
        .model.toggleItem(data.id);

    ToggleTodosPresenterPrototype.changeView(currentModel);
};

module.exports = ToggleTodosPresenter;