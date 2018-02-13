var Model = require('../../model/Model');
var TodosContainer = require('../../../componets/TodosContainer');

function BasePresenter() {}

BasePresenterPrototype = BasePresenter.prototype;

BasePresenterPrototype.model = Model;

BasePresenterPrototype.TodosContainer = TodosContainer;

BasePresenterPrototype.changeView = function (currentModel) {
    BasePresenterPrototype.TodosContainer.render(currentModel);
};

BasePresenterPrototype.updateModel = function (data) {
    throw new Error("must be override")
};

module.exports = BasePresenter;