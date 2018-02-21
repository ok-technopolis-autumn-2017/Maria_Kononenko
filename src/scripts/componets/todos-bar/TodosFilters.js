var EventBus = require('../../utils/EventBus');
var EventsTypes = require('../../constants/EventsTypes');
var FilterTypes = require('../../constants/FilterTypes');

var TODOS_FILTERS_CLASS = ".todos-filters";

function TodosFiltersConstructor() {
    this.todosFilters.addEventListener('click', this.handlerClick);
}

var todosFiltersConstructorPrototype = TodosFiltersConstructor.prototype;

todosFiltersConstructorPrototype.todosFilters =
    document.querySelector(TODOS_FILTERS_CLASS);

todosFiltersConstructorPrototype.bus = EventBus;

todosFiltersConstructorPrototype.handlerClick = function (event) {
    if (~event.target.className.indexOf(
            FilterTypes.FILTER_COMPLETED)) {

                todosFiltersConstructorPrototype.bus.emit(
                    EventsTypes.SET_VISIBILITY_FILTER,
                    FilterTypes.FILTER_COMPLETED
                )
    } else {
        if (~event.target.className.indexOf(
                FilterTypes.FILTER_ACTIVE)) {

                    todosFiltersConstructorPrototype.bus.emit(
                        EventsTypes.SET_VISIBILITY_FILTER,
                        FilterTypes.FILTER_ACTIVE
                    )
        } else {
            if (~event.target.className.indexOf(
                    FilterTypes.FILTER_ALL)) {

                        todosFiltersConstructorPrototype.bus.emit(
                            EventsTypes.SET_VISIBILITY_FILTER,
                            FilterTypes.FILTER_ALL
                        )
            }
        }
    }
};

todosFiltersConstructorPrototype.render = function (currentFilter) {
    var filters = todosFiltersConstructorPrototype.todosFilters.children;
    var filterClasses, i;

    for (i = 0; i < filters.length; i++) {
        if (~filters[i].className.indexOf(currentFilter)) {
            filterClasses = filters[i].className.split(' ');
            filterClasses[filterClasses.length - 1] = "__choosen";
            filters[i].className = filterClasses.join(' ');
        } else {
            filterClasses = filters[i].className.split(' ');
            filterClasses[filterClasses.length - 1] = "__unchoosen";
            filters[i].className = filterClasses.join(' ');
        }
    }

    filters = null;
    i = null;
    filterClasses = null;
};

module.exports = new TodosFiltersConstructor();