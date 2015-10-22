'use strict';

describe('SalarieCard Component', function () {

    it('Doit être invocable sans erreur', function (done) {

        require(['ractive', 'components/organisms/salarie-card/SalarieCard'], function (Ractive, SalarieCard) {

            var component = new SalarieCard();

            expect(component).to.not.null;
            expect(component instanceof Ractive).to.be.true;
            expect(component.toHTML()).to.exist;

            done();
        });

    });

    it('Doit rendre les bonnes informations du salarié', function (done) {

        require(['ractive', 'components/organisms/salarie-card/SalarieCard'], function (Ractive, SalarieCard) {

            $(document).ready(function () {

                var $container = $('#container');

                var ractive = new Ractive({
                    el: $container,
                    template: '<salarie-card />',
                    components: {
                        'salarie-card': SalarieCard
                    },
                    data: {
                        id: 1,
                        civilite: 'M',
                        fullname: 'John Doe',
                        photo: '/images/male.png',
                        iban: 'FR7618206002106577244700112',
                        balance: 1000
                    }
                });

                expect($container.find('.app-salarie-name').text()).to.equal('John Doe');
                expect($container.find('.balance').text()).to.equal('1000');
                expect($container.find('img').attr('src')).to.equal('/images/male.png');

                var ibanText = $container.find('.app-virement-iban').text();
                expect(ibanText).to.contain('FR');
                expect(ibanText).to.contain('76');
                expect(ibanText).to.contain('18206');
                expect(ibanText).to.contain('00210');
                expect(ibanText).to.contain('65772447001');
                expect(ibanText).to.contain('12');

                done();
            });

        });
    });

});