/* global window, console */
(function () {

    var core = window.odb.core;
    var odb = window.odb.odb;

    var A = core.defineClass({
        init: function (p1) {
            this.p1 = p1;
        },
        log: function () {
            console.log(this.p1);
        }
    });


    var a = new A(1);
    a.log();

})();