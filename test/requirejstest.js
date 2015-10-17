var requirejs = require('requirejs');

var baseUrl = __dirname + '/../src/js';

requirejs.config({
    nodeRequire: require,
    baseUrl: baseUrl,
    paths: {
        'templates': '../templates',
        'ractive': '../../node_modules/ractive/ractive',
        'promise': '../../node_modules/native-promise-only/npo',
        'text': '../../node_modules/requirejs-text/text',
        '_': '../../node_modules/lodash/index',
        '$': '../../node_modules/jquery/src/jquery'
    }
});

exports.requireJSForTests = requirejs;
