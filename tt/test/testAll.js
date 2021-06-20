import { Tester } from './runner/tester';
import { tests as eventTests } from './testevents';
import { tests as listFilterTests } from './testlistfilter';
import { tests as mappedListTests } from './testmappellist';
import { tests as calculatedPropertyTests } from './testcalculatedproperty';
import { tests as filteredListTests } from './testfilteredlist';
import { tests as reducedListPropertyTests } from './testreducedlistproperty';
import { tests as domTests } from './testdom';
import { tests as devTests } from './devtest';

var tester = new Tester();
tester.run(eventTests);
tester.run(listFilterTests);
tester.run(filteredListTests);
tester.run(mappedListTests);
tester.run(calculatedPropertyTests);
tester.run(reducedListPropertyTests);
tester.run(domTests);
tester.run(devTests);
tester.result();



