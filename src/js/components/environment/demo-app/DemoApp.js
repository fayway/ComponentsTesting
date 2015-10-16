'use strict';

define([
    'ractive',
    'components/ecosystems/header/Header',
    'components/ecosystems/navigation-drawer/NavigationDrawer',
    'components/ecosystems/main-section/MainSection',
    'text!./demo-app.html'
], function (Ractive, Header, NavigationDrawer, MainSection, Template) {

    return Ractive.extend({
        template: Template,
        components: {
            'demo-header': Header,
            'demo-drawer': NavigationDrawer,
            'demo-main': MainSection
        },
        oninit: function () {
            console.log('DemoApp oninit');

            this.on('demo-header.keywordchange', function (keyword) {
                this.set('keyword', keyword);
            }.bind(this));

        }
    });

});