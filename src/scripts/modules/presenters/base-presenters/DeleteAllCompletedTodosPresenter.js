var BasePresenter = require('./BasePresenter');

function DeleteAllCompletedTodosPresenter() {}

DeleteAllCompletedTodosPresenterPrototype =
    DeleteAllCompletedTodosPresenter.prototype;

DeleteAllCompletedTodosPresenterPrototype.__proto__ = BasePresenter.prototype;

DeleteAllCompletedTodosPresenterPrototype.updateModel = function (data) {
    var currentModel =
        DeleteAllCompletedTodosPresenterPrototype
            .model.deleteAllCompletedItems();

    DeleteAllCompletedTodosPresenterPrototype.changeView(currentModel);
};

module.exports = DeleteAllCompletedTodosPresenter;