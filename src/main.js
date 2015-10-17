'use strict';

require.config({
    baseUrl: 'src/js',
    paths: {
        'templates': '../templates',
        'ractive': '../../node_modules/ractive/ractive',
        'promise': '../../node_modules/native-promise-only/npo',
        'text': '../../node_modules/requirejs-text/text',
        '_': '../../node_modules/lodash/index',
        'jquery': '../../node_modules/jquery/dist/jquery'
    }
});

requirejs(['app'], function(App) {
    App.bootstrap();
});