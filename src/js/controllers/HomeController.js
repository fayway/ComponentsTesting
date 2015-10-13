'use strict';

define(['services/CompteService', 'ractive', 'text!templates/main.html'], function (CompteService, Ractive, Template) {
    return {
        execute: function () {
            console.log('HomeController.execute()');

            new Ractive({
                template: Template,
                /**
                 *
                 */
                oninit: function () {
                    this.initComptes();
                },
                /**
                 *
                 */
                initComptes: function () {
                    var comptes = CompteService.getComptes();
                    this.set('comptes', comptes);
                    var compteCourant = comptes.find(function (compte) {
                        return compte.isDefault === true;
                    });
                    this.set('compteCourant', compteCourant);
                }
            });
        }
    }
});