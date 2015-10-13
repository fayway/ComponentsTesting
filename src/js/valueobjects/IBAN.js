'use strict';

define([], function () {
    var IBAN = function (pays, controle, banque, guichet, compte, cle) {
        this.pays = pays;
        this.controle = controle;
        this.banque = banque;
        this.guichet = guichet;
        this.compte = compte;
        this.cle = cle;
    };
    IBAN.prototype.toString = function () {
        return JSON.stringify(this);
    }
    return IBAN;
});