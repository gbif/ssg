var marked = require('marked'),
  frontMatter = require('front-matter'),
	renderer = new marked.Renderer(),
  originalCodeRenderer = renderer.code;

module.exports = renderer;

//add anchors to headlines
renderer.heading = function (text, level) {
  var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
  return '<h' + level + '><a name="' +
                escapedText +
                 '" class="anchor" href="#' +
                 escapedText +
                 '"><span class="header-link"></span></a>'+text+'</h' + level + '>';
};

//parse contact as gbif code field
renderer.code = function (code, language) {
    var fm = frontMatter('---\n' + code + '\n---');
    var data = fm.attributes;
    if (language == 'gbif') {
      var html = '';
      html += getHTMLfiles(data);
      html += getContacts(data);
      return html;
    }
    return originalCodeRenderer.call(renderer, code, language);
};

// Generate HTML for contacts
function getContacts(data) {
  if (typeof data.contacts !== 'undefined') {
    var strContacts = data.contacts.reduce(function(previousValue, currentValue, index, array) {
      return previousValue + generateContact(currentValue);
    }, '');
    return '<div class="contacts">'+strContacts+'</div>';
  }
  return '';
}

function generateContact(contact) {
  return '<div class="contact">'+
            '<div style="background-image: url('+contact.image+')"></div>'+
            '<address>'+
              '<span>'+contact.name+'</span>'+
              '<span>'+contact.info+'</span>'+
              '<span><a href="mailto:'+contact.mail+'">'+contact.mail+'</a></span>'+
              '<span><a href="tel:'+contact.tel+'">'+contact.tel+'</a></span>'+
            '</address>'+
        '</div>';
}

// Generate HTML for contacts
function getHTMLfiles(data) {
  if (typeof data.html !== 'undefined') {
    return data.html.reduce(function(previousValue, currentValue, index, array) {
      return previousValue + generateHTML(currentValue);
    }, '');
  }
  return '';
}
function generateHTML(html) {
  var fs = require('fs');
  var content = fs.readFileSync('./inject/html/' + html.path, 'utf8');
  return content;
}


