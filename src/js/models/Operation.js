'use strict';

define([], function () {
    var Operation = function (id, status) {
        this.id = id;
        this.status = status;
    }

    Operation.prototype.toString = function () {
        return JSON.stringify(this);
    }

    return Operation;
})