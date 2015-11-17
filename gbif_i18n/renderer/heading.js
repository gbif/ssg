var blockwrap = '</div></section><section class="block"><div class="block-content">';

module.exports = function (text, level) {
    var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
    var heading = '<h' + level + '><a name="' +
        escapedText +
        '" class="anchor" href="#' +
        escapedText +
        '"><span class="header-link"></span></a>' + text + '</h' + level + '>';
    if (level === 1) {
        return heading + blockwrap;
    }
    return heading;
};