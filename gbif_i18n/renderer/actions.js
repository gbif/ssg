// Generate HTML for actions
module.exports = getActions;

function getActions(data) {
    if (typeof data.actions !== 'undefined') {
        var strActions = data.actions.reduce(function (previousValue, currentValue, index, array) {
            return previousValue + generateAction(currentValue);
        }, '');
        return '<div class="action-items">' + strActions + '</div>';
    }
    return '';
}

function generateAction(action) {
    var str =  '<div class="action-item"><a href="' + action.url + '">';

    if (action.type == 'pdf') {
        str += '<span class="action-pdf icon-file-pdf"></span>';
    }

    str += '<h2>' + action.title + '</h2>';

    if (typeof action.comment !== 'undefined') {
        str += '<span class="action-comment">' + action.comment + '</span>';
    }

    str += '</a></div>';
    return str;
}