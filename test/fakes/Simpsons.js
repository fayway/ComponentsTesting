var requirejs = require('../config/requireJSForTests').requirejs;

var Compte = requirejs('models/Compte');

var Homer = new Compte(1, 'M', 'Homer', 'Simpson', 'homer.png', 'hsmipson', 'father', true );
var Marge = new Compte(2, 'Mme', 'Marge', 'Simpson', 'marge.png', 'msmipson', 'mother' );
var Bart = new Compte(3, 'M', 'Bart', 'Simpson', 'bart.png', 'bsimpson', 'son' );
var Lisa = new Compte(4, 'M', 'Lisa', 'Simpson', 'lisa.png', 'lsimpson', 'daughter' );

var Simpsons = [Homer , Marge, Bart, Lisa];

exports.Family = Simpsons;
exports.Homer = Homer;
exports.Marge = Marge;
exports.Bart = Bart;
exports.Lisa = Lisa;
