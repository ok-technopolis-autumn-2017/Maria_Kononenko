Function.prototype.subscribe = function(observable, context) {
    var ctx = context || this; //если контекст вызова не задан, то контекстом считается this «по-умолчанию», то есть текущая функция
    var observer = { //теперь наблюдатель будет сообщать, в каком контексте нужно вызвать функцию
        context: ctx,
        func: this
    };
    observable.observers.push(observer);
    return this;
};

module.exports = Function.prototype.subscribe;
