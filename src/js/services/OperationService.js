'use strict';

define(['models/Operation'], function (Operation) {

    var operations = [
        new Operation(123, 'Pending'),
        new Operation(234, 'Pending'),
        new Operation(999, 'Pending'),
        new Operation(788, 'Active')
    ];
    return {
        getOperations: function () {
            return operations;
        },
        getPendingOperations: function () {
            return operations.filter(function (operation) {
                return 'Pending' === operation.statut;
            });
        }
    }
})