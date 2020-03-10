define(['../../src/index', './model/Model', './ui/mobile/mobileUI'], function (tt, Model, mobileUI) {

    var model = new Model();
    document.getElementById('rootContainer').appendChild(mobileUI.createTtNode({ model: model }).getDomNode());
    model.load();

});
