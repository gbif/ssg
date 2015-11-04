/*
Accessibility on skip link
Not all browsers move focus when using anchors. 
This means that tabbing again will take you back to the initial skip link and not move on from your new position in the DOM
See: https://www.bignerdranch.com/blog/web-accessibility-skip-navigation-links/
*/
// bind a click event to 'skip' links
$("a.skip").click(function (event) {

    // strip the leading hash and declare
    // the content we're skipping to
    var skipTo = "#" + this.href.split('#')[1];

    // Setting 'tabindex' to -1 takes an element out of normal
    // tab flow but allows it to be focused via javascript
    $(skipTo).attr('tabindex', -1).on('blur focusout', function () {
        // when focus leaves this element,
        // remove the tabindex attribute
        $(this).removeAttr('tabindex');
    }).focus(); // focus on the content container
});