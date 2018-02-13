var BasePresenter = require('./BasePresenter');

function SetTodosFilterPresenter() {}

SetTodosFilterPresenterPrototype = SetTodosFilterPresenter.prototype;

SetTodosFilterPresenterPrototype.__proto__ = BasePresenter.prototype;

SetTodosFilterPresenterPrototype.updateModel = function (data) {
    var currentModel = SetTodosFilterPresenterPrototype
        .model.addTodos({
            "todosFilter": data.filter
        });

    SetTodosFilterPresenterPrototype.changeView(currentModel);
};

module.exports = SetTodosFilterPresenter;