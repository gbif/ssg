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
    return '<div class="responsiveImage"><img src="'+img.url+'" title ="'+img.title+'"></div>';
}