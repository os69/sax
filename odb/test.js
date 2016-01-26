/* global window, console */
(function() {

    var core = window.odb.core;
    var odb = window.odb.odb;



    var check = function(condition, text) {
        if (!condition) {
            console.log(text);
            throw 'check error';
        }
    };

    var test1 = function() {

        var db = new odb.DB();

        db.put('a', 1);
        check(db.get('a') === 1);
        db.debugReload();
        check(db.get('a') === 1);

    };

    // id and type better
    // pointer better
    // update db
    // clone
    // check constrctor pointer
    // hooks for get id, type, object creation
    // update reload

    //    test1();
    //  console.log('finished');






})();