define(['../../src/index', './model/Model', './ui/desktop/desktopUI'], function (tt, Model, desktopUI) {

    var model = new Model();
    document.getElementById('rootContainer').appendChild(tt.createTtNode({
        type: 'div',
        children: [desktopUI.createTtNode(model)]
    }).getDomNode());
    model.load();

});
