'use strict';

define(['ractive', 'text!./main-section.html'], function (Ractive, Template) {

    return Ractive.extend({
        template: Template,
        isolated: false,
        computed: {
            //filteredSalaries: function () {
            //    var keyword = this.get('keyword');
            //    var salaries = this.get('salaries');
            //    if (!keyword) {
            //        return salaries;
            //    } else {
            //        return salaries.filter(function (salarie) {
            //            var isFilterSatisfied = salarie.firstname.toLowerCase().includes(keyword)
            //                || salarie.lastname.toLowerCase().includes(keyword)
            //                || salarie.iban.toLowerCase().includes(keyword);
            //            return isFilterSatisfied;
            //        });
            //    }
            //}
        },
        oninit: function () {

            this.observe('salaries', function () {
                console.log(arguments);
                console.log('salaries changed catched in MainSection');
            })


            this.observe('filteredSalaries.*.montantVirement', function (newValue, oldValue, keypath, idx) {
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
                    if (checkbox && checkbox.MaterialCheckbox) {
                        checkbox.MaterialCheckbox.uncheck();
                        ractive.set(salariePath + '.isVirementConfirmed', false);
                    }
                }
            });
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