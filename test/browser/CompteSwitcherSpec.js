'use strict';

describe('CompteSwitcher Component', function () {

    it('Doit être invocable sans erreur', function (done) {

        require(['ractive', 'components/organisms/compte-switcher/CompteSwitcher'], function (Ractive, CompteSwitcher) {

            var component = new CompteSwitcher();

            expect(component).to.not.null;
            expect(component instanceof Ractive).to.be.true;
            expect(component.toHTML()).to.exist;

            done();
        });

    });

    it('Doit rendre correctement le sélecteur des comptes', function (done) {

        require(['components/organisms/compte-switcher/CompteSwitcher', 'models/Compte'], function (CompteSwitcher, Compte) {

            var homer = new Compte(1, 'M', 'Homer', 'Simpson', '/images/homer.png', 'hsmipson', 'father', true );
            var marge = new Compte(2, 'Mme', 'Marge', 'Simpson', '/images/marge.png', 'msmipson', 'mother' );
            var bart = new Compte(3, 'M', 'Bart', 'Simpson', '/images/bart.png', 'bsimpson', 'son' );
            var lisa = new Compte(4, 'M', 'Lisa', 'Simpson', '/images/lisa.png', 'lsimpson', 'daughter' );
            var simpsons = [homer , marge, bart, lisa];

            var component = new CompteSwitcher({
                data: {
                    comptes: simpsons
                }
            });

            var $html = $(component.toHTML());
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


    it('Doit switcher le compte apres click', function (done) {

        require(['ractive', 'components/organisms/compte-switcher/CompteSwitcher', 'models/Compte'], function (Ractive, CompteSwitcher, Compte) {

            var homer = new Compte(1, 'M', 'Homer', 'Simpson', '/images/homer.png', 'homer', 'father', true );
            var marge = new Compte(2, 'Mme', 'Marge', 'Simpson', '/images/marge.png', 'marge', 'mother' );
            var bart = new Compte(3, 'M', 'Bart', 'Simpson', '/images/bart.png', 'bart', 'son' );
            var lisa = new Compte(4, 'M', 'Lisa', 'Simpson', '/images/lisa.png', 'lisa', 'daughter' );

            var simpsons = [homer , marge, bart, lisa];

            var ractive = new Ractive({
                el: document.getElementById('container'),
                template: '<compte-switcher />',
                data: {
                    comptes: simpsons
                },
                components: {
                    'compte-switcher': CompteSwitcher
                }
            });

            $('[data-login=marge]').click();
            expect($('[role=default-name]').text()).to.contain(marge.firstname);
            expect($('[role=default-photo]').attr('src')).to.contain(marge.photo);

            $('[data-login=bart]').click();
            expect($('[role=default-name]').text()).to.contain(bart.firstname);
            expect($('[role=default-photo]').attr('src')).to.contain(bart.photo);
            done();
        });
    });

});