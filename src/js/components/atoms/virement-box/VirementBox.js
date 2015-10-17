'use strict';

define([
    'ractive',
    'text!./virement-box.html'
], function (Ractive, Template) {

    return Ractive.extend({
        template: Template,
        data: {
            montantVirement: undefined,
            isValidVirementMontant: false,
            isVirementConfirmed: false,
            waitingVirement: false
        },
        oninit: function () {
            this.observe('montantVirement', function (newMontant) {
                var isValidVirementMontant = false;
                //
                if (newMontant && newMontant.match(/^[0-9]+$/) && parseInt(newMontant) <= this.get('balance')) {
                    isValidVirementMontant = true;
                }
                this.set('isValidVirementMontant', isValidVirementMontant);
                //
                if (newMontant && !isValidVirementMontant) {
                    var checkbox = this.el.querySelector('.app-confirm-virement');
                    if (checkbox && checkbox.MaterialCheckbox) {
                        checkbox.MaterialCheckbox.uncheck();
                        this.set('isVirementConfirmed', false);
                    }
                }
            }.bind(this));
        },
        toggleVirementConfirmed: function (event) {
            this.set('isVirementConfirmed', event.node.checked);
        },
        fireVirement: function () {
            this.fire('virementOrder', this.get('salarieId'), parseFloat(this.get('montantVirement')), this.showProgress.bind(this), this.clear.bind(this));
        },
        showProgress: function () {
            this.set('waitingVirement', true);
        },
        clear: function () {
            this.set('montantVirement', undefined);
            this.set('isVirementConfirmed', false);
            var checkbox = this.el.querySelector('.app-confirm-virement');
            if (checkbox && checkbox.MaterialCheckbox) {
                checkbox.MaterialCheckbox.uncheck();
            }
            this.set('waitingVirement', false);
        }
    });

})