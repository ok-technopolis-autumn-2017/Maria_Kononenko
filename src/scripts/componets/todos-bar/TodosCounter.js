function TodosCounterConstructor() {
}

TodosCounterConstructor.prototype.getNumOfActiveItems = function(todosArray) {
    var num = 0, i;

    for (i = 0; i < todosArray.length; i++) {
        if (!todosArray[i].completed) {
            num++;
        }
    }

    return num + " items left";
};

TodosCounterConstructor.prototype.render = function (todosArray) {
    document.querySelector(".todos-actions-bar_counter-undone").innerHTML =
        this.getNumOfActiveItems(todosArray)
};

module.exports = new TodosCounterConstructor();