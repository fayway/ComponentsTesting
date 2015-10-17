'use strict';

define([
    'components/atoms/iban/Iban',
    'components/atoms/virement-box/VirementBox',
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