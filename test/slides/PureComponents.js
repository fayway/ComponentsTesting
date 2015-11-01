var expect = require('chai').expect;
var Ractive = require('ractive');
var stripSpaces = require('../config/utils').stripSpaces;
Ractive.DEBUG = false;

describe('Testing State', function() {

    var SUT = Ractive.extend({
        template: `
            <div>
                <h1>Bonjour {{simpson.nom}}</h1>
                {{#if !simpson.email }}<div class="alert">Vous devez renseigner votre email</div>{{/if}}
            </div>
        `
    });

    var component;

    beforeEach(function () {
        component = new SUT();

    });

    afterEach(function () {
        component = null;

    });

    it('Doit proposer de renseigner l\'email si il est manquant', function (done) {

        component.set('simpson', {
            nom: 'Homer'
        });
        var expectedHTML = `
            <div>
                <h1>Bonjour Homer</h1>
                <div class="alert">Vous devez renseigner votre email</div>
            </div>
        `;
        expect(stripSpaces(component.toHTML())).to.equal(stripSpaces(expectedHTML));
        done();

    });

    it('Ne doit pas proposer de renseigner l\'email si il n\'est pas manquant', function (done) {

        component.set('simpson', {
            nom: 'Marge',
            email: 'marge@simpson.com'
        });
        var expectedHTML = `
            <div>
                <h1>Bonjour Marge</h1>
            </div>
        `;
        expect(stripSpaces(component.toHTML())).to.equal(stripSpaces(expectedHTML));
        done();

    });

});

describe('Testing Behavior', function() {

    var SUT = Ractive.extend({
        oninit: function () {
            this.observe('toy' , function (toy) {
                if (!toy) {
                    return;
                }
                if (toy.isRadioactive) {
                    this.fire('danger', 'Toy Radioactive');
                } else {
                    //Play with toy
                }
            })
        }
    });

    it('Doit déclancher un evenement', function (done) {

        var ractive = new Ractive({
            template: '<alarm toy="{{toy}}" />',
            components: {
                alarm: SUT
            }
        });

        ractive.on('alarm.danger', function (message) {
            expect(message).to.equal('Toy Radioactive');
            done();
        })

        ractive.set('toy', {
            isRadioactive: true
        })

    });

});