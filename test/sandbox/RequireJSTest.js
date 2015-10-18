var expect = require('chai').expect;
var requirejs = require('../config/requireJSForTests').requirejs;

describe('RequireJS', function() {

    it('Doit charger les modules dans Node comme c\'est le cas pour le browser', function (done) {

        requirejs(['services/CompteService'], function(CompteService) {
            expect(CompteService).to.exist;
            expect(CompteService).to.have.property('getComptes');
            done();
        });

    });
});