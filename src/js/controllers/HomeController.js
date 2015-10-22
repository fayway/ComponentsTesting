'use strict';

define([
    'services/CompteService',
    'services/SalarieService',
    'services/OperationService',
    'services/VirementService',
    'components/environment/demo-app/DemoApp',
    'ractive',
    'text!templates/main-layout.html'
], function (CompteService, SalarieService, OperationService, VirementService, DemoApp, Ractive, LayoutTemplate) {
    return {
        execute: function (options) {
            options = options || {};
            console.log('HomeController.execute()', options);

            var ractive = new Ractive({
                el: options.container ? options.container : 'body',
                template: LayoutTemplate,
                isolated: false,
                components: {
                    'demo-app': DemoApp
                },
                oninit: function () {
                    this.initComptes();
                    this.initOperations();
                    this.initSalaries();
                },
                initComptes: function () {
                    CompteService.getComptes().then(function (comptes){
                        this.set('comptes', comptes);
                    }.bind(this));
                },
                initSalaries: function () {
                    SalarieService.getSalaries().then(function(salaries) {
                        salaries = salaries.map(function (salarie) {
                            salarie.fullname = salarie.getFullName();
                            return salarie;
                        }.bind(this));
                        this.set('salaries', salaries);
                    }.bind(this));
                },
                initOperations: function () {
                    OperationService.getPendingOperations().then(function (operations) {
                        this.set('operationPendingCount', operations.length);
                    }.bind(this));
                }
            });

            ractive.on('virement-box.virementOrder', function (salarieId, montantVirement, showProgress, callback) {
                var salaries = this.get('salaries');
                var salarie = salaries.find(function (salarie) {
                    return salarie.id === salarieId;
                });
                var salarieIndex = salaries.indexOf(salarie);
                //
                showProgress();

                VirementService.postVirement(salarieId, montantVirement).then( function() {
                    this.subtract('salaries.' + salarieIndex + '.balance', montantVirement);
                    if (callback) {
                        callback();
                    }
                    this.fire('virementposted');
                }.bind(this));
            });

            return ractive;
        }
    }
});