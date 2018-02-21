var TodosContainer = require('./componets/TodosContainer');
var TodosListModel = require('./modules/model/TodosListModel');
var Presenter =require('./modules/presenters/Presenter');
var c = require('./utils/createDomElement');
var t = require('./templates/todosItem.ejs');

function init() {
    new Presenter(new TodosContainer(), new TodosListModel());
}

document.addEventListener('DOMContentLoaded', init);

