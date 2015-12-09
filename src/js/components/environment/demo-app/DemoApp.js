'use strict';

define([
    'ractive',
    'components/ecosystems/header/Header',
    'components/ecosystems/navigation-drawer/NavigationDrawer',
    'components/ecosystems/main-section/MainSection',
    'text!./demo-app.html'
], function (Ractive, Header, NavigationDrawer, MainSection, Template) {
    return {
        bootstrap: function (options) {
            new Ractive({
                el: options.container ? options.container : 'body',
                template: Template,
                components: {
                    'demo-header': Header,
                    'demo-drawer': NavigationDrawer,
                    'demo-main': MainSection
                },
                oninit: function () {
                    this.on('search-filter.keywordchange', function (keyword) {
                        this.set('keyword', keyword);
                    }.bind(this));
                }
            });
        }
    };
});