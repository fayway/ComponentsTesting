'use strict';

describe('SearchFilter Component', function () {

    it('Doit être invocable sans erreur', function (done) {

        require(['ractive', 'components/atoms/search-filter/SearchFilter'], function (Ractive, SearchFilter) {

            var component = new SearchFilter();

            expect(component).to.not.null;
            expect(component instanceof Ractive).to.be.true;
            expect(component.toHTML()).to.exist;

            done();
        });

    });

    it('Doit déclancher un evenement Ractive', function (done) {

        require(['ractive', 'components/atoms/search-filter/SearchFilter'], function (Ractive, SearchFilter) {

            $(document).ready(function () {
                var $container = $('#container');

                var ractive = new Ractive({
                    el: $container,
                    template: '<search-filter />',
                    components: {
                        'search-filter': SearchFilter
                    }
                })

                ractive.on('search-filter.keywordchange', function (keyword) {
                    expect(keyword).to.equal('test');
                    done();
                });

                var $searchTextField = $container.find('#search');
                $searchTextField.val('Test');
                $searchTextField.click();
            });

        });
    });

});