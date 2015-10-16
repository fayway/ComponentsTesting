'use strict';

define(['ractive', 'text!./header.html'], function (Ractive, Template) {

    return Ractive.extend({
        template: Template,
        isolated: false,
        fireKeywordChange: function (event) {
            var keyword = event.node.value.toLowerCase();
            this.fire('keywordchange', keyword);
            this.fire('bob', keyword);
        },
        oninit: function () {
            console.log('Header oninit');
        }
    });

});