'use strict';

require.config({
    baseUrl: 'src/js',
    paths: {
        'templates': '../templates',
        'ractive': '../../node_modules/ractive/ractive',
        'text': '../../node_modules/requirejs-text/text',
        'mdl': '../../node_modules/material-design-lite/material'
    }
});

requirejs(['app'], function(App) {
    App.bootstrap();
});