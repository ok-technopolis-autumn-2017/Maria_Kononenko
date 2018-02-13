var BasePresenter = require('./BasePresenter');

function DeleteTodosPresenter() {}

DeleteTodosPresenterPrototype = DeleteTodosPresenter.prototype;

DeleteTodosPresenterPrototype.__proto__ = BasePresenter.prototype;

DeleteTodosPresenterPrototype.updateModel = function (data) {
    var currentModel = DeleteTodosPresenterPrototype
        .model.deleteItem(data.id);

    DeleteTodosPresenterPrototype.changeView(currentModel);
};

module.exports = DeleteTodosPresenter;