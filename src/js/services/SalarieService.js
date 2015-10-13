'use strict';

define(['models/Salarie'], function (Salarie) {
    return {
        getSalaries: function () {
            return [
                new Salarie(23, 'M', 'Monsieur', 'Dupont', '/images/malecostume.png', 15200, 'FR7618206002106577244700112'),
                new Salarie(24, 'Mme', 'Madame', 'Dupont', '/images/female.png', 25000, 'FR7618606002105487233800845'),
                new Salarie(25, 'Mme', 'Mami', 'Dupont', '/images/oldwoman.png', 13000, 'FR7618606002105487244300344'),
                new Salarie(26, 'M', 'Papi', 'Dupont', '/images/oldman.png', 50000, 'FR7619906002106587222600315')
            ];
        }
    }
});