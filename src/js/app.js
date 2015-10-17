'use strict';
define(['ractive', 'decorators/mdlDecorator', 'controllers/HomeController'], function (Ractive, mdlDecorator, HomeController) {
    return {
        bootstrap: function () {
            console.log('App Bootstrap');

            //Ractive Defaults Settings
            Ractive.decorators.mdl = mdlDecorator;

            //
            HomeController.execute();
        }
    }
});