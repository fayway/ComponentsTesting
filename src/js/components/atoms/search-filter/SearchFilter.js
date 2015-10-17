'use strict';

define([
    'ractive',
    'text!./search-filter.html'
], function (Ractive, Template) {

    return Ractive.extend({
        template: Template,
        fireKeywordChange: function (event) {
            var keyword = event.node.value.toLowerCase();
            this.fire('keywordchange', keyword);
        }
    });

});