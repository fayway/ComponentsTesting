'use strict';

define([
    'ractive',
    'text!./compte-switcher.html'
], function (Ractive, Template) {

    return Ractive.extend({
        template: Template,
        oninit: function () {
            this.observe('comptes', function (comptes) {
                if (comptes) {
                    var compteCourant = comptes.find(function (compte) {
                        return compte.isDefault === true;
                    });
                    this.set('compteCourant', compteCourant);
                }
            }.bind(this))
        },
        switchCompte: function (event) {
            this.set('compteCourant', event.context);
        },
    });

});