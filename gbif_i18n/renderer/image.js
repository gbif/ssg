// Generate HTML for image
module.exports = getImages;

function getImages(data) {
    if (typeof data.images !== 'undefined') {
        var strImages = data.images.reduce(function (previousValue, currentValue, index, array) {
            return previousValue + getResponsiveImage(currentValue);
        }, '');
        return strImages;
    }
    return '';
}

function getResponsiveImage(img) {
    var responsiveImage = '<div class="responsiveImage"><img src="{url}" title="{title}">{license}</div>';
    var license = '<div class="responsiveImage_license"><span class="responsiveImage__icon gb-icon-search"></span><span class="responsiveImage__info">{info}</span></div>';
    //return '<div class="responsiveImage"><img src="'+img.url+'" title ="'+img.title+'"><a href="'+link+'">class="responsiveImage_license">'+img.license+'</a></div>';

    var info = img.link ? '<a href="'+img.link+'">'+img.title+'</a>' : img.title;
    license = license.replace('{info}', info);
    responsiveImage = responsiveImage.replace('{title}', img.title).replace('{url}', img.url).replace('{license}', license);
    return responsiveImage;
}