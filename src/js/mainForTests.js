'use strict';

requirejs(['ractive', 'decorators/mdlDecorator', 'app'], function(Ractive, mdlDecorator) {
    //Ractive Defaults Settings
    Ractive.decorators.mdl = mdlDecorator;
});