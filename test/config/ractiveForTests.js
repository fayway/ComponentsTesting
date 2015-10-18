var requirejs = require('./requireJSForTests').requirejs;

var Ractive = requirejs('ractive');
var mdlDecorator = requirejs('decorators/mdlDecorator');

Ractive.DEBUG = false;
Ractive.decorators.mdl = mdlDecorator;

exports.ractive = Ractive;



