'use strict';

define(['models/Personne'], function (Personne) {
    var Salarie = function (id, civilite, firstname, lastname, photo, balance, iban) {
        Personne.call(this, id, civilite, firstname, lastname, photo);
        this.balance = balance;
        this.iban = iban;
    }
    Salarie.prototype = Object.create(Personne.prototype);
    Salarie.prototype.constructor = Salarie;

    return Salarie;
});