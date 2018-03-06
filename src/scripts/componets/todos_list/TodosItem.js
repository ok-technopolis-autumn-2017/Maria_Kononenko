var todosItemTemplate = require('../../templates/todosItem.ejs');
var createDomElement = require('../../utils/createDomElement');

function TodosItemConstructor() {}

var todosItemConstructorPrototype = TodosItemConstructor.prototype;

todosItemConstructorPrototype.render = function(todoModel, currentFilter) {
    return createDomElement(
        todosItemTemplate({
            "todoModel": todoModel,
            "currentFilter": currentFilter
        })
    )
};


module.exports = new TodosItemConstructor();