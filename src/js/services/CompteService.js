'use strict';

define(['models/Compte'], function (Compte) {
    return {
        getComptes: function () {
            return [
                new Compte(80, 'M', 'John', 'Doe', '/images/male.png', 'jdoe', 'Admin', true),
                new Compte(81, 'M', 'Monsieur', 'Dupont', '/images/malecostume.png', 'mdupont', 'Salarie'),
                new Compte(82, 'M', 'Super', 'Admin', '/images/matureman.png', 'superadmin', 'SuperAdmin')
            ];
        }
    }
});