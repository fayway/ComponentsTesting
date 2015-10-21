var requirejs = require('../config/requireJSForTests').requirejs;
var expect = require('chai').expect;
var cheerio = require('cheerio');
var Simpsons = require('../fakes/Simpsons');

describe('CompteSwitcher Component', function () {

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
                component.set('comptes', [Simpsons.Marge, Simpsons.Bart, Simpsons.Lisa]);
            }
            expect(setComptes).to.throw(Error);

            done();
        });

    });

    it('Doit rendre correctement le sélecteur des comptes', function (done) {

        requirejs(['components/organisms/compte-switcher/CompteSwitcher'], function (CompteSwitcher) {

            var component = new CompteSwitcher({
                data: {
                    comptes: Simpsons.Family
                }
            });

            var $html = cheerio(component.toHTML());
            //
            ////Test Active Account
            var activeName = $html.find('[role="active-account-name"]').text();
            var activePhoto = $html.find('[role="active-account-photo"]').attr('src');

            expect(activeName).to.equal(Simpsons.Homer.getFullName());
            expect(activePhoto).to.equal(Simpsons.Homer.photo);

            ////Test other Accounts
            var $accounts = $html.find('li[role=account]');
            expect($accounts.length).to.equal(Simpsons.Family.length);

            expect($accounts.eq(0).text()).to.contain(Simpsons.Homer.firstname);
            expect($accounts.eq(1).text()).to.contain(Simpsons.Marge.firstname);
            expect($accounts.eq(2).text()).to.contain(Simpsons.Bart.firstname);
            expect($accounts.eq(3).text()).to.contain(Simpsons.Lisa.firstname);

            done();

        });
    });
});