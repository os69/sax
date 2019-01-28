define(['./core/core', './fioriModel/Page', './testEngine/states'], function (core, Page, states) {


    /*var odb = new Odb();
    var page = new Page();
    var clone = odb.clone(page);
    clone.searchInputField.setSearchTerm('sally');
    var g = graph.createTreeGraph(2, 3);
    new graph.VizGraphViewer(g, document.body);
    console.log('ready');*/

    states.createStateGraph(new Page());

});