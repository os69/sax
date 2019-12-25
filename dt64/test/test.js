define(['../src/index', './Tester', './testEvents', './testCalculatedProperty', './testMappedList', './testListFilter', './testFilteredList', './testReducedListProperty', './testDom'], function (tt, Tester, eventsTestCases, calculatedPropertiesTestCases, mappedListTestCases, listFilterTestCases, filteredListTestCases, reducedListPropertyTestCases, domTestCases) {

    var handlerCheck = {
        start: function () {
            this.numberHandlers = tt.event.getNumberHandlers();
        },
        stop: function () {
            tester.assertEquals(tt.event.getNumberHandlers(), this.numberHandlers, 'check number event handlers');
        }
    };

    var tester = new Tester({
        preTestTasks: [handlerCheck.start.bind(handlerCheck)],
        postTestTasks: [handlerCheck.stop.bind(handlerCheck)]
    });

    tester.runTestCases(eventsTestCases);
    tester.runTestCases(calculatedPropertiesTestCases);
    tester.runTestCases(mappedListTestCases);
    //tester.runTestCases(listFilterTestCases);
    tester.runTestCases(filteredListTestCases);
    tester.runTestCases(reducedListPropertyTestCases);
    tester.runTestCases(domTestCases);

    tester.result();

});





