var TodosContainer = require('./componets/TodosContainer');
var TodosListModel = require('./modules/model/TodosListModel');
var Presenter =require('./modules/presenters/Presenter');
var template = require('./templates/todosItem.ejs');
var add = require('./utils/createDomElement');

function init() {
    /*document.querySelector('.todos-list').appendChild(add(template({
        "todoModel": {
            "id": 1,
            "text": "maha",
            "completed": true
        },
        "currentFilter": 'todos-filter __all'
    })))*/
    new Presenter(new TodosContainer(), new TodosListModel());
}

document.addEventListener('DOMContentLoaded', init);

