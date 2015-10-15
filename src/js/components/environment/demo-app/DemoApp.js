'use strict';

define([
    'ractive',
    'components/ecosystems/header/Header',
    'components/ecosystems/navigation-drawer/NavigationDrawer',
    'components/ecosystems/main-section/MainSection',
    'text!./demo-app.html'
], function (Ractive, Header, NavigationDrawer, MainSection, Template) {

    return Ractive.extend({
        template: Template,
        isolated: false,
        components: {
            'AppHeader': Header,
            'AppDrawer': NavigationDrawer,
            'AppMain': MainSection
        },
        oninit: function () {
            this.observe('salaries', function () {
                console.log(arguments);
                console.log('salaries changed catched in DemoApp');
            })
            //
            this.observe('salaries', function (salaries) {
                this.filterSalaries(salaries);
            }.bind(this))
            //
            this.on('AppHeader.keywordchange', function (keyword) {
                var salaries = this.get('salaries');
                this.filterSalaries(salaries, keyword);
            }.bind(this));
        },
        filterSalaries: function (salaries, keyword) {
            var filteredSalaries;
            if (!keyword) {
                filteredSalaries = salaries;
            } else {
                filteredSalaries = salaries.filter(function (salarie) {
                    var isFilterSatisfied = salarie.firstname.toLowerCase().includes(keyword)
                        || salarie.lastname.toLowerCase().includes(keyword)
                        || salarie.iban.toLowerCase().includes(keyword);
                    return isFilterSatisfied;
                });
            }
            this.set('filteredSalaries', filteredSalaries);
        }
    });

});