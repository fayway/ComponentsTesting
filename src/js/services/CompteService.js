'use strict';

define(['models/Compte', 'utils/ObjectUtils', 'promise', 'jquery'], function (Compte, ObjectUtils, Promise, $) {
    return {
        getComptes: function () {
            return new Promise(function (fulfill, reject) {
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