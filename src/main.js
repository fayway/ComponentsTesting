'use strict';

require.config({
    baseUrl: 'src/js',
    paths: {
        'templates': '../templates',
        'ractive': '../../node_modules/ractive/ractive',
        'text': '../../node_modules/requirejs-text/text',
        '_': '../../node_modules/l'
    }
});

requirejs(['app'], function(App) {
    App.bootstrap();
});