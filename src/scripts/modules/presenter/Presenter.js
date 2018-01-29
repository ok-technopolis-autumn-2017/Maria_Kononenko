var Eventable = require('../../utils/Eventable');
var View = require('../../modules/views/View');

/**
 * catchs evens from view
 * sends data to model
 * updates view with data getting from model
 * @constructor
 */
function PresenterConstructor(){
    this.init();
}

var PresenterConstructorPrototype = PresenterConstructor.prototype;

PresenterConstructorPrototype.model = require('../model/Model');

PresenterConstructorPrototype.view = new View();

/**
 * catchs Customevent
 * sends data to model
 * updates view
 * @param event - CustomEvent
 * @see Model
 * @see View
 */
PresenterConstructorPrototype.catchEvent = function (event) {
    var currentEvent = new Eventable();

    currentEvent.off(event);

    switch (event.detail.name) {
        case "selectAll": {
            let currentModel = PresenterConstructorPrototype.model.markAllDone();

            PresenterConstructorPrototype.view.update(currentModel);
        } break;

        case "addTodos": {
            let currentModel = PresenterConstructorPrototype.model.addTodos({
                name: event.detail.value,
                state: "undone"
            });

            PresenterConstructorPrototype.view.update(currentModel);
        } break;

        case "deleteItem": {
            let currentModel = PresenterConstructorPrototype.model.deleteItem(
                event.detail.indexOfItem
            );

            PresenterConstructorPrototype.view.update(currentModel);
        } break;

        case "changeItemState": {
            let currentModel = PresenterConstructorPrototype.model.changeItemState(
                event.detail.indexOfItem
            );

            PresenterConstructorPrototype.view.update(currentModel);
        } break;

        case "deleteAllDoneItems": {
            let currentModel = PresenterConstructorPrototype.model.deleteAllDoneItems();

            PresenterConstructorPrototype.view.update(currentModel);
        } break;
    }

}

PresenterConstructorPrototype.init = function () {
    document.addEventListener("addTodos", this.catchEvent);
    document.addEventListener("selectAll", this.catchEvent);
    document.addEventListener("deleteItem", this.catchEvent);
    document.addEventListener("changeItemState", this.catchEvent);
    document.addEventListener("deleteAllDoneItems", this.catchEvent);

    let currentModel = this.model.getModel();

    this.view.update(currentModel);
}

module.exports = PresenterConstructor;