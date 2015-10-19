var requirejs = require('../config/requireJSForTests').requirejs;
var expect = require('chai').expect;
var cheerio = require('cheerio');
var Compte = requirejs('models/Compte');

describe('CompteSwitcher Component', function () {

    var homer = new Compte(1, 'M', 'Homer', 'Simpson', '/images/homer.png', 'hsmipson', 'father', true );
    var marge = new Compte(2, 'Mme', 'Marge', 'Simpson', '/images/marge.png', 'msmipson', 'mother' );
    var bart = new Compte(3, 'M', 'Bart', 'Simpson', '/images/bart.png', 'bsimpson', 'son' );
    var lisa = new Compte(4, 'M', 'Lisa', 'Simpson', '/images/lisa.png', 'lsimpson', 'daughter' );

    var simpsons = [homer , marge, bart, lisa];

    it('Doit être invocable sans erreur', function (done) {

        requirejs(['ractive', 'components/organisms/compte-switcher/CompteSwitcher'], function (Ractive, CompteSwitcher) {

            var component = new CompteSwitcher();

            expect(component).to.not.null;
            expect(component instanceof Ractive).to.be.true;
            expect(component.toHTML()).to.exist;

            done();
        });

    });

    it('Doit râler si on ne lui passe pas un compte par défaut', function (done) {

        requirejs(['components/organisms/compte-switcher/CompteSwitcher'], function (CompteSwitcher) {

            var component = new CompteSwitcher();

            var setComptes = function () {
                component.set('comptes', [marge, bart, lisa]);
            }
            expect(setComptes).to.throw(Error);

            done();
        });

    });

    it('Doit rendre correctement le sélecteur des comptes', function (done) {

        requirejs(['components/organisms/compte-switcher/CompteSwitcher'], function (CompteSwitcher) {

            var component = new CompteSwitcher({
                data: {
                    comptes: simpsons
                }
            });

            var $html = cheerio(component.toHTML());
            //
            ////Test Default Account
            var defaultName = $html.find('[role="default-name"]').text();
            var defaultPhoto = $html.find('[role="default-photo"]').attr('src');

            expect(defaultName).to.contain(homer.firstname);
            expect(defaultName).to.contain(homer.lastname);
            expect(defaultPhoto).to.equal(homer.photo);

            ////Test other Accounts
            var $accounts = $html.find('li[role=account]');
            expect($accounts.length).to.equal(simpsons.length);

            expect($accounts.eq(0).text()).to.contain(homer.firstname);
            expect($accounts.eq(1).text()).to.contain(marge.firstname);
            expect($accounts.eq(2).text()).to.contain(bart.firstname);
            expect($accounts.eq(3).text()).to.contain(lisa.firstname);

            done();

        });
    });
});