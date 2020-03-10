
var wait = function (delay) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
        }, delay);
    });
}

var createText = async function () {
    await wait(2000);
    var div = document.createElement('div');
    document.body.appendChild(div);
    div.appendChild(document.createTextNode('Hallo'));;
    div.setAttribute('id', 'hallo');
}

var main = async function () {
    await wait(2000);
    var button = document.createElement('button');
    document.body.appendChild(button);
    button.setAttribute('id', 'button');
    button.appendChild(document.createTextNode('Click'));
    button.addEventListener('click', createText);
}


main();