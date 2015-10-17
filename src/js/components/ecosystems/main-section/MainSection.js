'use strict';

define([
    'components/organisms/salarie-card/SalarieCard',
    'ractive',
    '_',
    'text!./main-section.html'
], function (SalarieCard, Ractive, _, Template) {

    return Ractive.extend({
        template: Template,
        components: {
            'salarie-card': SalarieCard
        },
        oninit: function () {
            //
            this.observe('keyword salaries', function () {
                var salaries = this.get('salaries') || [];
                var keyword = this.get('keyword');
                var filteredSalaries = this.filterSalaries(salaries, keyword);
                this.set('filteredSalaries', filteredSalaries);
            }.bind(this));
            //
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