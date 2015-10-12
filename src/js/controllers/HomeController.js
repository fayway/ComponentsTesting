'use strict';

define(['ractive', 'text!templates/main.html'], function (Ractive, Template) {
    return {
        execute: function () {
            new Ractive({
                template: Template
            });
        }
    }
});