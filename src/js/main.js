'use strict';

requirejs(['ractive', 'decorators/mdlDecorator', 'app'], function(Ractive, mdlDecorator, App) {
    //Ractive Defaults Settings
    Ractive.decorators.mdl = mdlDecorator;

    App.bootstrap();
});