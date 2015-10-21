var expect = require('chai').expect;
var jsdom = require('jsdom');

describe('Ractive Inside jsdom', function () {

    it('Doit rendre du HTML fait par la Ractive générique dans un fake DOM confectionné par jsdom', function (done) {

        jsdom.env({
            html: '<div id="container"></div>',
            scripts: [
                __dirname + "/../../node_modules/ractive/ractive.min.js"
            ],
            done: function (err, window) {
                var Ractive = window.Ractive;
                var document = window.document;
                var container = document.getElementById('container');

                new Ractive({
                    el: container,
                    template: '<div><h1>Hello {{name}}</h1></div>',
                    data: {name: 'World'},
                    oncomplete: function () {
                        expect(container.innerHTML).to.equal('<div><h1>Hello World</h1></div>');
                        done();
                    }
                });
            }
        });
    });

    it('Doit rendre du HTML par un de nos composants dans un fake DOM confectionné par du jsdom', function (done) {

        jsdom.env({
            html: '<div id="container"></div>',
            scripts: [
                __dirname + "/../../node_modules/requirejs/require.js",
                __dirname + "/../fakes/material.js",
                __dirname + "/../../dist/mainForTests.js",
                __dirname + "/../../node_modules/jquery/dist/jquery.min.js",
            ],
            done: function (err, window) {
                var document = window.document;
                var container = document.getElementById('container');

                var requirejs = window.require;
                requirejs(['components/atoms/iban/Iban'], function (Iban) {

                    new Iban({
                        el: container,
                        data: {
                            iban: 'FR7618206002106577244700112'
                        },
                        oncomplete: function () {
                            try {
                                var $ = window.$;
                                var $html = $(container.innerHTML);

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

                            } catch (err) {
                                done(err);
                            }
                        }
                    });

                });
            }
        });
    });

    it('Doit simuler un fake click event sur un de nos composants dans un fake DOM confectionné par du jsdom', function (done) {

        jsdom.env({
            html: '<div id="container"></div>',
            scripts: [
                __dirname + "/../../node_modules/requirejs/require.js",
                __dirname + "/../fakes/material.js",
                __dirname + "/../../dist/mainForTests.js",
                __dirname + "/../../node_modules/jquery/dist/jquery.min.js"
            ],
            done: function (err, window) {
                var document = window.document;
                var $ = window.$;
                var container = document.getElementById('container');

                var requirejs = window.require;
                requirejs(['components/organisms/compte-switcher/CompteSwitcher', 'models/Compte'], function (CompteSwitcher, Compte) {

                    var simpsons = [
                        new Compte(1, 'M', 'Homer', 'Simpson', '/images/homer.png', 'homer', 'father', true),
                        new Compte(2, 'Mme', 'Marge', 'Simpson', '/images/marge.png', 'marge', 'mother')
                    ]

                    new CompteSwitcher({
                        el: container,
                        data: {
                            comptes: simpsons
                        },
                        oncomplete: function () {
                            try {
                                var $marge =  $('li[data-login=marge]');
                                expect($marge.text()).to.equal('Marge Simpson');

                                //Before Click
                                expect($('[role=active-account-name]').text()).to.equal('Homer Simpson');
                                expect($('[role=active-account-photo]').attr('src')).to.contain('homer.png');

                                //Click
                                $marge.click();

                                //After Click
                                expect($('[role=active-account-name]').text()).to.equal('Marge Simpson');
                                expect($('[role=active-account-photo]').attr('src')).to.contain('marge.png');

                                done();

                            } catch (err) {
                                done(err);
                            }
                        }
                    });

                });
            }
        });
    });

    xit('jsdom doit savoir quand le module RequireJS à été chargé', function (done) {

        jsdom.env({
            html: `
                <script>
                    require.config({
                        baseUrl: '../../src/js',
                        paths: {
                            'templates': '../../templates',
                            'ractive': '../../../node_modules/ractive/ractive',
                            'promise': '../../../node_modules/native-promise-only/npo',
                            'text': '../../../node_modules/requirejs-text/text',
                            '_': '../../../node_modules/lodash/index',
                            'jquery': '../../../node_modules/jquery/dist/jquery'
                        }
                    });
                </script>
                <div id="container"></div>
            `,
            scripts: [
                __dirname + "/../../node_modules/requirejs/require.js"
            ],
            created(err, window) {
                window.onModulesLoaded = function () {
                    console.log("ready to roll!");
                    done();
                };
            },
            done: function (err, window) {
                var document = window.document;
                //var container = document.getElementById('container');
                window.onModulesLoaded = function () {
                    console.log("ready to roll!");
                    done();
                };

                var requirejs = window.require;
                //console.log('RequireJS', requirejs);

                requirejs(['utils/TestJsDom'], function (TestJsDom) {
                    TestJsDom.sayHello(done);
                });

            }
        });
    });
});