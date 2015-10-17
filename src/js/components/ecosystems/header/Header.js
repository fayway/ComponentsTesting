'use strict';

define([
    'components/atoms/breadcrumb/Breadcrumb',
    'components/atoms/search-filter/SearchFilter',
    'components/organisms/bar-menu/BarMenu',
    'ractive',
    'text!./header.html'], function (Breadcrumb, SearchFilter, BarMenu, Ractive, Template) {

    return Ractive.extend({
        template: Template,
        components: {
            'breadcrumb': Breadcrumb,
            'search-filter': SearchFilter,
            'bar-menu': BarMenu
        }
    });

});