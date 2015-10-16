'use strict';

define(['ractive', 'text!./main-section.html'], function (Ractive, Template) {

    var filterSalaries = function (salaries, keyword) {
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

    return Ractive.extend({
        template: Template,
        oninit: function () {
            console.log('MainSection oninit');
            //
            this.observe('keyword salaries', function (newValue, oldValue, keypath) {
                var salaries = this.get('salaries') || [];
                var keyword = this.get('keyword');
                var filteredSalaries = filterSalaries(salaries, keyword);
                this.set('filteredSalaries', filteredSalaries);
            }.bind(this));
            //
            this.observe('filteredSalaries.*.montantVirement', function (newValue, oldValue, keypath, idx) {
                var salariePath = 'filteredSalaries.' + idx;
                var salarie = this.get(salariePath);
                var isValidVirementMontant = false;
                if (newValue && newValue.match(/^[0-9]+$/) && parseInt(newValue) <= salarie.balance) {
                    isValidVirementMontant = true;
                }
                this.set(salariePath + '.isValidVirementMontant', isValidVirementMontant);
                //
                if (!isValidVirementMontant) {
                    var checkbox = document.querySelector('#confirm-virement-' + salarie.id);
                    if (checkbox && checkbox.MaterialCheckbox) {
                        checkbox.MaterialCheckbox.uncheck();
                        this.set(salariePath + '.isVirementConfirmed', false);
                    }
                }
            }.bind(this));
        },
        toggleVirementConfirmed: function (event) {
            this.set(event.keypath + '.isVirementConfirmed', event.node.checked);
        },
        executeVirement: function (event) {
            event.node.MaterialButton.disable();
            var salarie = event.context;
            var filteredSalarieKeypath = event.keypath;
            var salarieKeypath = filteredSalarieKeypath.replace('filteredSalaries', 'salaries');
            this.set(salarieKeypath + '.waitingVirement', true);
            setTimeout(function () {
                var montantVirement = parseFloat(salarie.montantVirement);
                this.subtract(salarieKeypath + '.balance', montantVirement);
                this.set(salarieKeypath + '.montantVirement', null);
                this.set(filteredSalarieKeypath + '.montantVirement', null);
                this.set(salarieKeypath + '.waitingVirement', false);
                //
                var checkbox = document.querySelector('#confirm-virement-' + salarie.id);
                if (checkbox.MaterialCheckbox) {
                    checkbox.MaterialCheckbox.uncheck();
                }
            }.bind(this), 1500);
        }
    });

});