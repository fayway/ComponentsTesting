'use strict';

define([
    'valueobjects/IBAN',
    'ractive',
    'text!./iban.html'
], function (IBAN, Ractive, Template) {

    return Ractive.extend({
        template: Template,
        computed: {
            ibanVO: function () {
                var iban = this.get('iban');
                if (iban) {
                    var ibanArray = this.ibanSplitter(iban);
                    if (ibanArray instanceof Array && ibanArray.length > 6) {
                        return new IBAN(ibanArray[1], ibanArray[2], ibanArray[3], ibanArray[4], ibanArray[5], ibanArray[6]);
                    }
                }
            }
        },
        ibanSplitter: function (iban) {
            var ibanRegex = /^([A-Z]{2})(\d{2})(\d{5})(\d{5})(\d{11})(\d{2})$/;
            return iban.match(ibanRegex);
        }
    });

})