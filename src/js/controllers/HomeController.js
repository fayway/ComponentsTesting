'use strict';

define([
    'services/CompteService',
    'services/SalarieService',
    'services/OperationService',
    'valueobjects/IBAN',
    'components/environment/demo-app/DemoApp',
    'ractive',
    'text!templates/main-layout.html'
], function (CompteService, SalarieService, OperationService, IBAN, DemoApp, Ractive, LayoutTemplate) {
    return {
        execute: function () {
            console.log('HomeController.execute()');

            var ractive = new Ractive({
                el: 'body',
                template: LayoutTemplate,
                isolated: false,
                components: {
                    'demo-app': DemoApp
                },
                oninit: function () {
                    this.initComptes();
                    this.initSalaries();
                    this.initOperations();
                },
                initComptes: function () {
                    CompteService.getComptes().then(function (comptes){
                        this.set('comptes', comptes);
                        var compteCourant = comptes.find(function (compte) {
                            return compte.isDefault === true;
                        });
                        this.set('compteCourant', compteCourant);
                    }.bind(this));
                },
                initSalaries: function () {
                    SalarieService.getSalaries().then(function(salaries) {
                        salaries = salaries.map(function (salarie) {
                            salarie.fullname = salarie.getFullName();
                            var ibanArray = this.ibanSplitter(salarie.iban);
                            if (ibanArray instanceof Array && ibanArray.length > 6) {
                                salarie.ibanVO = new IBAN(ibanArray[1], ibanArray[2], ibanArray[3], ibanArray[4], ibanArray[5], ibanArray[6]);
                            }
                            return salarie;
                        }.bind(this));
                        this.set('salaries', salaries);
                    }.bind(this));
                },
                initOperations: function () {
                    OperationService.getPendingOperations().then(function (operations) {
                        this.set('operationPendingCount', operations.length);
                    }.bind(this));
                },
                /**
                 *
                 * @param iban
                 * @return {Array|{index: number, input: string}}
                 */
                ibanSplitter: function (iban) {
                    var ibanRegex = /^([A-Z]{2})(\d{2})(\d{5})(\d{5})(\d{11})(\d{2})$/;
                    return iban.match(ibanRegex);
                }
            });

        }
    }
});