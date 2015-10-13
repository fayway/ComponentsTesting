'use strict';

define([], function () {
    var Personne = function (id, civilite, firstname, lastname, photo) {
        this.id = id;
        this.civilite = civilite;
        this.firstname = firstname;
        this.lastname = lastname;
        this.photo = photo;
    };

    Personne.prototype.toString = function () {
        return JSON.stringify(this);
    }

    Personne.prototype.getFullName = function () {
        return this.firstname + ' ' + this.lastname;
    }

    return Personne;
});