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
        isolated: false,
        components: {
            'demo-app-header': Header,
            'demo-app-drawer': NavigationDrawer,
            'demo-app-main': MainSection
        },
        oninit: function () {

        }
    });

});