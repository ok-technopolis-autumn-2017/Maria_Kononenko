var TodosContainer = require('./componets/TodosContainer');
var TodosListModel = require('./modules/model/TodosListModel');
var Presenter =require('./modules/presenters/Presenter');
var template = require('./templates/todosItem.ejs');
var add = require('./utils/createDomElement');

function init() {
    new Presenter(new TodosContainer(), new TodosListModel());
}

document.addEventListener('DOMContentLoaded', init);

