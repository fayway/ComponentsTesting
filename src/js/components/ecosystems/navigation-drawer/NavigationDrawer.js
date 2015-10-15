'use strict';

define(['ractive', 'text!./navigation-drawer.html'], function (Ractive, Template) {

    return Ractive.extend({
        template: Template,
        isolated: false,
        switchCompte: function (event) {
            this.set('compteCourant', event.context);
        }
    });

});