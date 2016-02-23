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
    var ratio = '';
    if (img.height && img.width) {
        var r = Math.ceil(10*img.height / img.width)*10;
        ratio = 'img_r_' + r;
    }
    var widthClass = img.width ? 'w_' + (50*Math.ceil(img.width/50)) : '';

    var responsiveImage = '<div class="responsiveImageContainer {widthClass}"><div class="responsiveImage {ratio}"><img src="{url}" title="{title}">{license}</div>';
    var license = '<div class="responsiveImage_license"><span class="responsiveImage__icon gb-icon-info"></span><span class="responsiveImage__info">{info}</span></div></div>';

    var info = img.link ? '<a href="'+img.link+'">'+img.title+'</a>' : img.title;
    license = license.replace('{info}', info);
    responsiveImage = responsiveImage
                            .replace('{title}', img.title)
                            .replace('{url}', img.url)
                            .replace('{widthClass}', widthClass)
                            .replace('{ratio}', ratio)
                            .replace('{license}', license);
    return responsiveImage;
}