'use strict';

define([
    'ractive',
    'text!./vertical-menu.html'
], function (Ractive, Template) {

    return Ractive.extend({
        template: Template
    });

});