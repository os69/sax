import { core } from '../core/core';
import { event } from '../core/event';
import { ajax } from '../core/ajax';
import { Odb } from '../core/odb';
import { propertyindex } from './property/propertyindex';
import { listindex } from './list/listindex';
import { objectindex } from './object/objectindex';

export var tt = {
    core: core,
    event: event,
    ajax: ajax,
    Odb: Odb
}

core.extend(tt, propertyindex);
core.extend(tt, listindex);
core.extend(tt, objectindex);

