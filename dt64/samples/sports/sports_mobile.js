define(['../../src/index', './model/Model', './ui/mobile/mobileUI'], function (tt, Model, mobileUI) {

    document.getElementById('rootContainer').appendChild(mobileUI.createTtNode({ model: new Model() }).getDomNode())

});
