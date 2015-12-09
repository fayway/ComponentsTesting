'use strict';

requirejs([
    'ractive',
    'decorators/mdlDecorator',
    'components/environment/demo-app/DemoApp'
], function(Ractive, mdlDecorator) {
    //Ractive Defaults Settings
    Ractive.decorators.mdl = mdlDecorator;
});