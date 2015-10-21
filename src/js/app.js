'use strict';

define(['controllers/HomeController'], function (HomeController) {
    return {
        bootstrap: function () {
            console.log('App Bootstrap');
            //
            HomeController.execute();
        }
    }
});