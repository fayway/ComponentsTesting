'use strict';

define([
    'ractive',
    'text!./bar-menu.html'
], function (Ractive, Template) {

    return Ractive.extend({
        template: Template
    });

})