var expect = require('chai').expect;
var Ractive = require('ractive');

Ractive.DEBUG = false;

describe('Ractive', function() {

    it('Doit être opérationnelle dans Node', function () {

        var ractive = new Ractive({
            template: 'Hello from {{who}}'
        });
        ractive.set('who', 'Node');

        expect(ractive.toHTML()).to.equal('Hello from Node');
    });

});