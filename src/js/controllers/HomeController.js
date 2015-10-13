'use strict';

define([
    'services/CompteService',
    'services/SalarieService',
    'services/OperationService',
    'valueobjects/IBAN',
    'ractive',
    'text!templates/main.html'
], function (CompteService, SalarieService, OperationService, IBAN, Ractive, Template) {
    return {
        execute: function () {
            console.log('HomeController.execute()');

            var ractive = new Ractive({
                template: Template,
                computed: {
                    filteredSalaries: function () {
                        var keyword = this.get('keyword');
                        var salaries = this.get('salaries');
                        if (!keyword) {
                            return salaries;
                        } else {
                            return salaries.filter(function (salarie) {
                                var isFilterSatisfied = salarie.firstname.toLowerCase().includes(keyword)
                                    || salarie.lastname.toLowerCase().includes(keyword)
                                    || salarie.iban.toLowerCase().includes(keyword);
                                return isFilterSatisfied;
                            });
                        }
                    }
                },
                oninit: function () {
                    this.initComptes();
                    this.initSalaries();
                    this.initOperations();
                },
                initComptes: function () {
                    var comptes = CompteService.getComptes();
                    this.set('comptes', comptes);
                    var compteCourant = comptes.find(function (compte) {
                        return compte.isDefault === true;
                    });
                    this.set('compteCourant', compteCourant);
                },
                initSalaries: function () {
                    var salaries = SalarieService.getSalaries();
                    salaries = salaries.map(function (salarie) {
                        salarie.fullname = salarie.getFullName();
                        var ibanArray = this.ibanSplitter(salarie.iban);
                        if (ibanArray instanceof Array && ibanArray.length > 6) {
                            salarie.ibanVO = new IBAN(ibanArray[1], ibanArray[2], ibanArray[3], ibanArray[4], ibanArray[5], ibanArray[6]);
                        }
                        return salarie;
                    }.bind(this));
                    this.set('salaries', salaries);
                },
                initOperations: function () {
                    this.set('operationPendingCount', OperationService.getPendingOperations().length);
                },
                switchCompte: function (event) {
                    this.set('compteCourant', event.context);
                },
                filterSalaries: function (event) {
                    var keyword = event.node.value.toLowerCase();
                    this.set('keyword', keyword);
                },
                toggleVirementConfirmed: function (event) {
                    this.set(event.keypath + '.isVirementConfirmed', event.node.checked);
                },
                executeVirement: function (event) {
                    event.node.MaterialButton.disable();
                    var salarie = event.context;
                    var kaypath = event.keypath.replace('filteredSalaries', 'salaries');
                    this.set(kaypath + '.waitingVirement', true);
                    setTimeout(function () {
                        var montantVirement = parseFloat(salarie.montantVirement);
                        this.subtract(kaypath + '.balance', montantVirement);
                        this.set(kaypath + '.montantVirement', null);
                        this.set(kaypath + '.waitingVirement', false);
                        //
                        var checkbox = document.querySelector('#confirm-virement-' + salarie.id);
                        if (checkbox.MaterialCheckbox) {
                            checkbox.MaterialCheckbox.uncheck();
                        }
                    }.bind(this), 1500);
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

            ractive.observe('filteredSalaries.*.montantVirement', function (newValue, oldValue, keypath, idx) {
                var salariePath = 'filteredSalaries.' + idx;
                var salarie = ractive.get(salariePath);
                var isValidVirementMontant = false;
                if (newValue && newValue.match(/^[0-9]+$/) && parseInt(newValue) <= salarie.balance) {
                    isValidVirementMontant = true;
                }
                ractive.set(salariePath + '.isValidVirementMontant', isValidVirementMontant);
                //
                if (!isValidVirementMontant) {
                    var checkbox = document.querySelector('#confirm-virement-' + salarie.id);
                    if (checkbox.MaterialCheckbox) {
                        checkbox.MaterialCheckbox.uncheck();
                        ractive.set(salariePath + '.isVirementConfirmed', false);
                    }
                }
            });
        }
    }
});