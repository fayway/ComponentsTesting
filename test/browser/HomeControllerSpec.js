'use strict';

describe('HomeController', function () {

    it('Doit être invocable sans erreur', function (done) {

        require(['controllers/HomeController'], function (HomeController) {

            expect(HomeController).to.not.null;
            expect(HomeController.execute).to.exist;

            done();
        });

    });

    it('Doit permettre de réaliser un virement', function (done) {

        require([
            'sinon',
            'promise',
            'services/CompteService',
            'services/OperationService',
            'services/SalarieService',
            'services/VirementService',
            'models/Salarie',
            'models/Compte',
            'controllers/HomeController'
        ], function (Sinon, Promise, CompteService, OperationService, SalarieService, VirementService, Salarie, Compte, HomeController) {

            Sinon.stub(CompteService, 'getComptes').returns(new Promise(function (fulfill) {
                fulfill([new Compte(99, 'M', 'Homer', 'Simpson', null, null, null, true)]);
            }));
            Sinon.stub(OperationService, 'getPendingOperations').returns(new Promise(function (fulfill) {
                fulfill([]);
            }));
            Sinon.stub(SalarieService, 'getSalaries').returns(new Promise(function (fulfill) {
                fulfill([new Salarie(1, 'M', 'John', 'Doe', '/images/male.png', 1000, 'FR7618206002106577244700112')]);
            }));

            //Sinon.spy(VirementService, 'postVirement');
            Sinon.stub(VirementService, 'postVirement').returns(new Promise(function (fulfill) {
                fulfill();
            }));

            var $container = $('#container');
            var ractive = HomeController.execute({container: $container});

            var cardSelector = '.app-virement-boxes .app-card-virement:first';

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

            ractive.on('virementposted', function () {
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