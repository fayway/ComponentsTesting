//Bootstrap init config
require('../config/requireJSForTests');
require('../config/ractiveForTests');
//
var requirejs = require('../config/requireJSForTests').requirejs;
var expect = require('chai').expect;
var jsdom = require('jsdom');
var cheerio = require('cheerio');

describe('Iban Component', function() {

    it('Doit être invocable sans erreur', function (done) {

        requirejs(['ractive', 'components/atoms/iban/Iban'], function(Ractive, Iban) {
            
            var component = new Iban();

            expect(component).to.not.null;
            expect(component instanceof Ractive).to.be.true;
            expect(component.toHTML()).to.exist;
            
            done();
        });

    });

    it('Doit savoir parser un iban', function (done) {

        requirejs(['ractive', 'components/atoms/iban/Iban'], function(Ractive, Iban) {

            var component = new Iban();

            var ibanArray = component.ibanSplitter('FR7618206002106577244700112');

            expect(ibanArray).to.have.length(7);
            expect(ibanArray[1]).to.equal('FR');
            expect(ibanArray[2]).to.equal('76');
            expect(ibanArray[3]).to.equal('18206');
            expect(ibanArray[4]).to.equal('00210');
            expect(ibanArray[5]).to.equal('65772447001');
            expect(ibanArray[6]).to.equal('12');

            done();
        });

    });


    it('Doit formatter correctement un iban sous forme d\'un tableau', function (done) {

        requirejs(['components/atoms/iban/Iban'], function(Iban) {

            var component = new Iban({
                data: {
                    iban: 'FR7618206002106577244700112'
                }
            });

            var expectedHtml = `<table class="app-virement-iban mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                                    <thead>
                                    <tr>
                                        <th class="mdl-data-table__cell--non-numeric">Pays</th>
                                        <th>Contrôle</th>
                                        <th>Banque</th>
                                        <th>Guichet</th>
                                        <th>Compte</th>
                                        <th>Clé RIB</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td class="mdl-data-table__cell--non-numeric" role="pays">FR</td>
                                        <td role="controle">76</td>
                                        <td role="banque">18206</td>
                                        <td role="guichet">00210</td>
                                        <td role="compte">65772447001</td>
                                        <td role="cle">12</td>
                                    </tr>
                                    </tbody>
                                </table>`;

            String.prototype.stripSpaces = function () {
                return this.replace(/(\r\n|\n|\r|\s+)/g, '');
            };

            expect(component.toHTML().stripSpaces()).to.equal(expectedHtml.stripSpaces());

            done();
        });

    });

    it('Doit afficher correctement chaque partie du l\'iban [jsdom]', function (done) {

        requirejs(['components/atoms/iban/Iban'], function(Iban) {

            var component = new Iban({
                data: {
                    iban: 'FR7618206002106577244700112'
                }
            });

            var document = jsdom.jsdom(component.toHTML());

            var pays = document.querySelector('[role=pays]').innerHTML;
            var controle = document.querySelector('[role=controle]').innerHTML;
            var banque = document.querySelector('[role=banque]').innerHTML;
            var guichet = document.querySelector('[role=guichet]').innerHTML;
            var compte = document.querySelector('[role=compte]').innerHTML;
            var cle = document.querySelector('[role=cle]').innerHTML;

            expect(pays).to.equal('FR');
            expect(controle).to.equal('76');
            expect(banque).to.equal('18206');
            expect(guichet).to.equal('00210');
            expect(compte).to.equal('65772447001');
            expect(cle).to.equal('12');

            done();
        });

    });

    it('Doit afficher correctement chaque partie du l\'iban [cheerio]', function (done) {

        requirejs(['components/atoms/iban/Iban'], function(Iban) {

            var component = new Iban({
                data: {
                    iban: 'FR7618206002106577244700112'
                }
            });

            var $html = cheerio(component.toHTML());

            var pays = $html.find('[role=pays]').text();
            var controle = $html.find('[role=controle]').text();
            var banque = $html.find('[role=banque]').text();
            var guichet = $html.find('[role=guichet]').text();
            var compte = $html.find('[role=compte]').text();
            var cle = $html.find('[role=cle]').text();

            expect(pays).to.equal('FR');
            expect(controle).to.equal('76');
            expect(banque).to.equal('18206');
            expect(guichet).to.equal('00210');
            expect(compte).to.equal('65772447001');
            expect(cle).to.equal('12');

            done();
        });

    });

});