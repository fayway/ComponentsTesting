'use strict';

define([], function () {
    return function (node) {
        componentHandler.upgradeElement(node);
        return {
            teardown: function () {
                componentHandler.downgradeElements(node);
            }
        };
    };
});
