'use strict';

define(['models/Salarie', 'utils/ObjectUtils', 'promise', 'jquery'], function (Salarie, ObjectUtils, Promise, $) {
    return {
        getSalaries: function () {
            return new Promise(function (fulfill, reject) {
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