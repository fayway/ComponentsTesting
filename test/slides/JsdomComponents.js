var expect = require('chai').expect;
var jsdom = require('jsdom');
var sinon = require('sinon');

describe('Testing State/Behavior inside jsdom', function () {

    var window, document, fixture, Ractive;

    before(function (done) {
        jsdom.env({
            html: '',
            scripts: [
                __dirname + "/../../node_modules/ractive/ractive.min.js"
            ],
            done: function (err, w) {
                window = w;
                document = w.document;
                Ractive = w.Ractive;
                fixture = document.createElement('div');
                document.body.appendChild(fixture);
                done();
            }
        });
    });

    after(function () {
        window.close();
    });

    beforeEach(function () {
    });

    afterEach(function () {
        while (fixture.firstChild) {
            fixture.removeChild(fixture.firstChild);
        }
    });

    it('Doit proposer de renseigner l\'email si il est manquant', function (done) {

        var SUT = Ractive.extend({
            el: fixture,
            template: `
                <div>
                    <h1>Bonjour {{simpson.nom}}</h1>
                    {{#if !simpson.email }}<div class="alert">Vous devez renseigner votre email</div>{{/if}}
                </div>
            `
        });

        var component = new SUT();

        component.set('simpson', {nom: 'Homer'});
        var alerts = document.getElementsByClassName('alert');
        expect(alerts.length).to.equal(1);

        component.set('simpson', {
            nom: 'Marge',
            email: 'marge@simpson.com'
        });
        alerts = document.getElementsByClassName('alert');
        expect(alerts.length).to.equal(0);

        done();
    });

    it('Doit réagir au click', function (done) {

        var SUT = Ractive.extend({
            el: fixture,
            template: `
                <div>
                    <h1>Bonjour {{simpson.nom}}</h1>
                    <button id="tele" on-click="regarderTele()">Regarder Télé</button>
                </div>
            `,
            regarderTele: function () {
                this.fire('tele');
            }
        });

        var component = new SUT();

        component.on('tele', function () {
            done();
        });

        var teleBtn = document.getElementById('tele');
        teleBtn.click();

    });

    it('Mock indirect output', function (done) {

        var TeleService = {
            allumerTele: function () {
                //
            },
            changerChaine: function () {
                //
            }
        };

        sinon.spy(TeleService, 'allumerTele');

        var SUT = Ractive.extend({
            el: fixture,
            template: `
                <div>
                    <h1>Bonjour {{simpson.nom}}</h1>
                    <button id="telecommande" on-click="regarderTele()">Regarder Télé</button>
                </div>
            `,
            regarderTele: function () {
                TeleService.allumerTele();
            }
        });

        var component = new SUT();
        var telecommande = document.getElementById('telecommande');

        telecommande.addEventListener("click", function () {
            expect(TeleService.allumerTele.calledOnce).to.be.true;
            done();
        });


        telecommande.click();
    });

});