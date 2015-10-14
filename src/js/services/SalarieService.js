'use strict';

define(['models/Salarie', 'utils/ObjectUtils', 'ractive', 'jquery'], function (Salarie, ObjectUtils, Ractive, $) {
    return {
        getSalaries: function () {
            return new Ractive.Promise(function (fulfill, reject) {
                $.ajax('/server/salaries.json', {
                    method: 'GET'
                }).then(function (json) {
                    var salaries = ObjectUtils.mapJsonToObjects(json, Salarie);
                    fulfill(salaries);
                }, reject);
            });
        }
    }
});