'use strict';

define([
    'ractive',
    'text!./breadcrumb.html'
], function (Ractive, Template) {

    return Ractive.extend({
        template: Template
    });

});