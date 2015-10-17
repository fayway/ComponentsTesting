'use strict';

define(['models/Operation', 'utils/ObjectUtils', 'promise', 'jquery'], function (Operation, ObjectUtils, Promise, $) {

    return {
        getOperations: function () {
            return new Promise(function (fulfill, reject) {
                $.ajax('/server/operations.json', {
                    method: 'GET'
                }).then(function (json) {
                    var operations = ObjectUtils.mapJsonToObjects(json, Operation);
                    fulfill(operations);
                }, reject);
            });
        },
        getPendingOperations: function () {
            return new Promise(function (fulfill, reject) {
                this.getOperations().then(function (operations) {
                    var pending = operations.filter(function (operation) {
                        return 'Pending' === operation.statut;
                    });
                    fulfill(pending);
                }, reject);
            }.bind(this));
        }
    }
})