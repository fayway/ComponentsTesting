'use strict';
define(['ractive'], function (Ractive) {
    return {
        execute: function () {
            new Ractive({
                template: '<h1>Components Testing</h1>'
            });
        }
    }
});