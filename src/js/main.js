'use strict';

requirejs([
    'ractive',
    'decorators/mdlDecorator',
    'components/environment/demo-app/DemoApp'
], function(Ractive, mdlDecorator, App) {
    //Ractive Defaults Settings
    Ractive.decorators.mdl = mdlDecorator;

    App.bootstrap({container: 'body'});
});