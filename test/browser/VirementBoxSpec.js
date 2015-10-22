'use strict';

describe('VirementBox Component', function () {

    it('Doit être invocable sans erreur', function (done) {

        require(['ractive', 'components/atoms/virement-box/VirementBox'], function (Ractive, VirementBox) {

            var component = new VirementBox();

            expect(component).to.not.null;
            expect(component instanceof Ractive).to.be.true;
            expect(component.toHTML()).to.exist;

            done();
        });

    });

    it('Doit déclancher un evenement Ractive', function (done) {

        require(['ractive', 'components/atoms/virement-box/VirementBox'], function (Ractive, VirementBox) {

            $(document).ready(function () {

                var $container = $('#container');

                var ractive = new Ractive({
                    el: $container,
                    template: '<virement-box />',
                    components: {
                        'virement-box': VirementBox
                    },
                    data: {
                        salarieId: 125
                    }
                })

                ractive.on('virement-box.virementOrder', function (salarieId, montantVirement) {
                    expect(salarieId).to.equal(125);
                    expect(montantVirement).to.equal(1500);
                    done();
                });

                var $montantField = $container.find('.app-montant input');
                var $confirmerCheckbox = $container.find('.app-confirm-virement ');
                var $validerButton = $container.find('.app-valider-virement');

                expect($validerButton.attr('disabled')).to.be.not.null;

                $montantField.val(1500);
                $confirmerCheckbox.find('input').click();

                expect($validerButton.attr('disabled')).to.be.equal(undefined);

                $validerButton.click();

            });

        });
    });

});