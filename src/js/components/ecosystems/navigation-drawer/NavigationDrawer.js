'use strict';

define([
    'services/OperationService',
    'services/CompteService',
    'components/organisms/compte-switcher/CompteSwitcher',
    'components/organisms/vertical-menu/VerticalMenu',
    'ractive',
    'text!./navigation-drawer.html'
], function (OperationService, CompteService, CompteSwitcher, VerticalMenu, Ractive, Template) {

    return Ractive.extend({
        template: Template,
        components: {
            'compte-switcher': CompteSwitcher,
            'vertical-menu': VerticalMenu
        },
        oninit: function () {
            OperationService.getPendingOperations().then( (operations) => {
                this.set('operationPendingCount', operations.length);
            });
            CompteService.getComptes().then((comptes) => {
                this.set('comptes', comptes);
            });
        }
    });

});