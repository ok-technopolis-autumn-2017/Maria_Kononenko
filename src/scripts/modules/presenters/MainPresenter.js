var EventBus = require('../../utils/EventBus');

function MainPresenterConstructor() {
    var instance = this,
        prototype = MainPresenterConstructor.prototype;

    MainPresenterConstructor = function () {
        return instance;
    };

    MainPresenterConstructor.prototype = prototype;
    MainPresenterConstructor.constructor = MainPresenterConstructor;
    instance.constructor = MainPresenterConstructor;
    return instance;
}

MainPresenterConstructorPrototype = MainPresenterConstructor.prototype;

MainPresenterConstructorPrototype.bus = EventBus;

MainPresenterConstructorPrototype.registrateNewPresenter =
    function (BasePresenter, eventType) {
        MainPresenterConstructorPrototype.bus.on(eventType, BasePresenter);
};

module.exports = MainPresenterConstructor;