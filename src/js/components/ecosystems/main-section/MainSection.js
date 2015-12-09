'use strict';

define([
    'services/SalarieService',
    'services/VirementService',
    'components/organisms/salarie-card/SalarieCard',
    'ractive',
    '_',
    'text!./main-section.html'
], function (SalarieService, VirementService, SalarieCard, Ractive, _, Template) {

    return Ractive.extend({
        template: Template,
        components: {
            'salarie-card': SalarieCard
        },
        oninit: function () {
            SalarieService.getSalaries().then((salaries) => {
                salaries = salaries.map((salarie) => {
                    salarie.fullname = salarie.getFullName();
                    return salarie;
                });
                this.set('salaries', salaries);
            });
            //
            this.observe('keyword salaries', function () {
                var salaries = this.get('salaries') || [];
                var keyword = this.get('keyword');
                var filteredSalaries = this.filterSalaries(salaries, keyword);
                this.set('filteredSalaries', filteredSalaries);
            }.bind(this));
            //
            this.on('virement-box.virementOrder', function (salarieId, montantVirement, showProgress, callback) {
                var salaries = this.get('salaries');
                var salarie = salaries.find(function (salarie) {
                    return salarie.id === salarieId;
                });
                var salarieIndex = salaries.indexOf(salarie);
                //
                showProgress();

                VirementService.postVirement(salarieId, montantVirement).then( () => {
                    this.subtract('salaries.' + salarieIndex + '.balance', montantVirement);
                    if (callback) {
                        callback();
                    }
                    this.fire('virementposted');
                });
            });
        },
        filterSalaries: function (salaries, keyword) {
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
    });

});