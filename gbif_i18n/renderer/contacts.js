// Generate HTML for contacts
module.exports = getContacts;

function getContacts(data) {
    if (typeof data.contacts !== 'undefined') {
        var strContacts = data.contacts.reduce(function (previousValue, currentValue, index, array) {
            return previousValue + generateContact(currentValue);
        }, '');
        return '<div class="contacts">' + strContacts + '</div>';
    }
    return '';
}

function generateContact(contact) {
    return '<div class="contact">' +
        '<div style="background-image: url(' + contact.image + ')"></div>' +
        '<address>' +
        '<span>' + contact.name + '</span>' +
        '<span>' + contact.info + '</span>' +
        '<span><a href="mailto:' + contact.mail + '">' + contact.mail + '</a></span>' +
        '<span><a href="tel:' + contact.tel + '">' + contact.tel + '</a></span>' +
        '</address>' +
        '</div>';
}