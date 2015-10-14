'use strict';

define(['models/Compte', 'utils/ObjectUtils', 'ractive', 'jquery'], function (Compte, ObjectUtils, Ractive, $) {
    return {
        getComptes: function () {
            return new Ractive.Promise(function (fulfill, reject) {
                $.ajax('/server/comptes.json', {
                    method: 'GET'
                }).then(function (json) {
                    var comptes = ObjectUtils.mapJsonToObjects(json, Compte);
                    fulfill(comptes);
                }, reject);
            });
        }
    }
});