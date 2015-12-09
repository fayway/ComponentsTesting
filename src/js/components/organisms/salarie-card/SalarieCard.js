'use strict';

define([
    'components/atoms/iban/Iban',
    '../virement-box/VirementBox',
    'ractive',
    'text!./salarie-card.html'
], function (Iban, VirementBox, Ractive, Template) {

    return Ractive.extend({
        template: Template,
        components: {
            'iban': Iban,
            'virement-box': VirementBox
        }
    });

})