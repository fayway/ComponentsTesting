'use strict';

define([
    'components/organisms/compte-switcher/CompteSwitcher',
    'components/organisms/vertical-menu/VerticalMenu',
    'ractive',
    'text!./navigation-drawer.html'
], function (CompteSwitcher, VerticalMenu, Ractive, Template) {

    return Ractive.extend({
        template: Template,
        components: {
            'compte-switcher': CompteSwitcher,
            'vertical-menu': VerticalMenu
        }
    });

});