var expect = require('chai').expect;
var jsdom = require("jsdom");
var requirejs = require('../config/requireJSForTests').requirejs;
var iban = requirejs('components/atoms/iban/Iban');

describe('Ractive Inside jsdom', function () {

    it ('Doit rendre du HTML fait par la Ractive générique dans un fake DOM à la jsdom', function (done) {
        jsdom.env({
            html: '<div id="container"></div>',
            scripts: [
                __dirname + "/../../node_modules/ractive/ractive.min.js",
                "http://code.jquery.com/jquery.js"
            ],
            done: function (err, window) {
                var Ractive = window.Ractive;
                //console.log('Ractive', window.Ractive);

                var document = window.document;
                //window.holder = fixture = document.createElement('div');
                //document.body.appendChild(window.holder);
                var container = document.getElementById('container');

                var ractive = new Ractive({
                    el: container,
                    template: '<div><h1>Hello {{name}}</h1></div>',
                    data: {name: 'World'},
                    oninit: function () {
                        //console.log('oninit');
                    },
                    onrender: function () {
                        //console.log('onrender');
                    },
                    oncomplete: function () {
                        //console.log('oncomplete');
                        //console.log(container.innerHTML);
                        expect(container.innerHTML).to.equal('<div><h1>Hello World</h1></div>');
                        done();
                    }
                });
            }
        });

    });

    xit('Doit rendre du HTML par nos composants dans un fake DOM à la jsdom', function (done) {

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
            done: function (err, window) {
                //var Ractive = window.Ractive;
                //console.log('Ractive', window.Ractive);

                var document = window.document;
                var container = document.getElementById('container');

                var requirejs = window.require;

                //console.log(requirejs);
                requirejs(['utils/ObjectUtils'], function (ObjectUtils) {
                    window.onModulesLoaded();
                    console.log(ObjectUtils);
                    done();
                });

                window.onModulesLoaded = function () {
                    console.log("ready to roll!");
                    done();
                };

            }
        });

    });

});