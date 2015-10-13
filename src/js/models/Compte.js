'use strict';

define(['models/Personne'], function (Personne) {
    var Compte = function (id, civilite, firstname, lastname, photo, login, role, isDefault) {
        Personne.call(this, id, civilite, firstname, lastname, photo);
        this.login = login;
        this.role = role;
        this.isDefault = isDefault;
    }
    Compte.prototype = Object.create(Personne.prototype);
    Compte.prototype.constructor = Compte;

    return Compte;
});