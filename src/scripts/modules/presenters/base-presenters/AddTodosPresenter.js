var BasePresenter = require('./BasePresenter');

function AddTodosPresenter() {}

AddTodosPresenterPrototype = AddTodosPresenter.prototype;

AddTodosPresenterPrototype.__proto__ = BasePresenter.prototype;

AddTodosPresenterPrototype.updateModel = function (data) {
    var currentModel = AddTodosPresenterPrototype.model.addTodos({
        "todosItem": {
            "id": data.id,
            "text": data.text,
            "completed": false
        }
    });

    AddTodosPresenterPrototype.changeView(currentModel);
};

module.exports = AddTodosPresenter;
