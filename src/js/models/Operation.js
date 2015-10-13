'use strict';

define([], function () {
    var Operation = function (id, statut) {
        this.id = id;
        this.statut = statut;
    }

    Operation.prototype.toString = function () {
        return JSON.stringify(this);
    }

    return Operation;
})