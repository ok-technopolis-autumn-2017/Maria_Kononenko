function createDomElement(html) {
    var el = document.createElement('div');
    el.innerHTML = html;
    return el.firstChild;
}

module.exports = createDomElement;