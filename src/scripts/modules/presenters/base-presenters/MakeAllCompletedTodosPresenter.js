var BasePresenter = require('./BasePresenter');

function MakeAllCompletedTodosPresenter() {}

MakeAllCompletedTodosPresenterPrototype =
    MakeAllCompletedTodosPresenter.prototype;

MakeAllCompletedTodosPresenterPrototype.__proto__ = BasePresenter.prototype;

MakeAllCompletedTodosPresenterPrototype.updateModel = function (data) {
    var currentModel =
        MakeAllCompletedTodosPresenterPrototype.model.makeAllCompleted();

    MakeAllCompletedTodosPresenterPrototype.changeView(currentModel);
};

module.exports = MakeAllCompletedTodosPresenter;
