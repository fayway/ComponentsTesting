'use strict';
define(['ractive', 'controllers/HomeController'], function (Ractive, HomeController) {
    return {
        bootstrap: function () {
            console.log('App Bootstrap');
            Ractive.defaults.el = 'body';

            HomeController.execute();
        }
    }
});