'use strict';

describe('DemoApp', function () {

    it('Doit être invocable sans erreur', function (done) {

        require(['components/environment/demo-app/DemoApp'], function (DemoApp) {

            expect(DemoApp).to.not.null;
            expect(DemoApp.bootstrap).to.exist;

            done();
        });

    });

    it('Doit embarquer les composants ecosystems', function (done) {

        require([
            'ractive',
            'components/environment/demo-app/DemoApp'
        ], function (Ractive, DemoApp) {

            var $container = $('#container');

            DemoApp.bootstrap({container: $container});

            var nodeInfo = Ractive.getNodeInfo($('#container').find('.app').get(0));
            expect(nodeInfo.ractive).to.exists;
            expect(nodeInfo.ractive instanceof Ractive).to.be.true;

            var ractive = nodeInfo.ractive;

            expect(ractive.findComponent('demo-header')).to.exists;
            expect(ractive.findComponent('demo-drawer')).to.exists;
            expect(ractive.findComponent('demo-main')).to.exists;

            done();
        });
    });

});