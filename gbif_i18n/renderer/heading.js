var blockwrap = '</div></section><section class="block"><div class="block-content">';

module.exports = function (text, level) {
    var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
    var heading = '<h' + level + '>'+text+'<a name="' +
        escapedText +
        '" class="anchor icon-link" href="#' +
        escapedText +
        '"></a></h' + level + '>';
    if (level === 1) {
        return heading + blockwrap;
    }
    return heading;
};