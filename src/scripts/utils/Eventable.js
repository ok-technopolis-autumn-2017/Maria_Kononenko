/**
 * generates custom events
 */
function EventableConstructor() {
}

var evetableConstructorPrototype = EventableConstructor.prototype;

/**
 * creates event
 * registrates event
 * @param eventName - String
 * @param details - Object
 */
evetableConstructorPrototype.on = function (eventName, details) {
    var currentEvent = new CustomEvent(eventName, {
        'detail' : details
    })
    document.dispatchEvent(currentEvent);
}

/**
 * deletes event
 * @param event - CusstomEvent
 */
evetableConstructorPrototype.off = function (event) {
    event.preventDefault();
}

module.exports = EventableConstructor;