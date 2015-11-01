exports.stripSpaces = function (html) {
    return html.trim().replace(/\s+/g, ' ').replace(/(\r\n|\n|\r)/g, '').replace(/> </g, '><');
}