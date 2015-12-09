'use strict';

describe('MainSection', function () {

    it('Doit être invocable sans erreur', function (done) {

        require(['ractive', 'components/ecosystems/main-section/MainSection'], function (Ractive, MainSection) {

            var component = new MainSection();

            expect(component).to.not.null;
            expect(component instanceof Ractive).to.be.true;
            expect(component.toHTML()).to.exist;
            done();
        });

    });

    it('Doit permettre de réaliser un virement', function (done) {

        require([
            'ractive',
            'sinon',
            'promise',
            'services/VirementService',
            'models/Salarie',
            'components/ecosystems/main-section/MainSection'
        ], function (Ractive, Sinon, Promise, VirementService, Salarie, MainSection) {

            //Sinon.spy(VirementService, 'postVirement');
            Sinon.stub(VirementService, 'postVirement').returns(new Promise(function (fulfill) {
                fulfill();
            }));

            var $container = $('#container');

            var ractive = new Ractive({
                el: $container,
                template: '<main-section salaries="{{salaries}}" />',
                components: {
                    'main-section': MainSection
                },
                data: {
                    salaries: [
                        new Salarie(1, 'M', 'John', 'Doe', '/images/male.png', 1000, 'FR7618206002106577244700112')
                    ]
                }
            });

            //
            var cardSelector = '.app-virement-boxes .app-card-virement:first';
            //
            var tester = function () {
                var $cardBox = $(this);
                var balance = $cardBox.find('.balance');
                var $montantField = $cardBox.find('.app-montant input');
                var $confirmerCheckbox = $cardBox.find('.app-confirm-virement');
                var $validerButton = $cardBox.find('.app-valider-virement');

                expect($validerButton.attr('disabled')).to.be.not.null;

                $montantField.val(200);
                $confirmerCheckbox.find('input').click();

                expect($validerButton.attr('disabled')).to.be.equal(undefined);

                $validerButton.click();
            };
            //
            ractive.on('main-section.virementposted', function () {
                try {
                    expect(VirementService.postVirement.withArgs(1, 200).calledOnce).to.be.true;
                    var balance = $(cardSelector).find('.balance');
                    expect(balance.text()).to.equal('800');
                    done();
                } catch (error) {
                    done(error);
                }
            });

            $(document).ready(function () {
                $(cardSelector).waitUntilExists(tester);
            });
        });
    });

});