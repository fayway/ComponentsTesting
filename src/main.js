'use strict';

require.config({
    baseUrl: 'src/js',
    paths: {
        'templates': '../templates',
        'ractive': '../../node_modules/ractive/ractive',
        'text': '../../node_modules/requirejs-text/text',
        'jquery': '../../node_modules/jquery/dist/jquery'
    }
});

requirejs(['app'], function(App) {
    App.bootstrap();
});