'use strict';

define(['ractive', 'text!./header.html'], function (Ractive, Template) {

    return Ractive.extend({
        template: Template,
        isolated: false,
        filterSalaries: function (event) {
            var keyword = event.node.value.toLowerCase();
            this.set('keyword', keyword);
        }
    });

});