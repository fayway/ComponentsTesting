'use strict';

define(['jquery'], function ($) {

    return {
        mapJsonToObjects: function (json, object) {
            return json.map(function(element) {
                return $.extend(new object(), element);
            })
        }
    }
})