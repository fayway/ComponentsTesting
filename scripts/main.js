require.config({
    baseUrl: 'scripts/src',
    paths: {
        'ractive': '../../node_modules/ractive/ractive'
    }
});

requirejs(['app'], function(App) {
    App.bootstrap();
});