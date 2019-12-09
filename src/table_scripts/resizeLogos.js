/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
function resizeLogos() {
    $('.logo-img').each(function(i, img) {
        if (img.width > img.height) $(img).addClass('wide-img');
        else $(img).addClass('tall-img');
    });
}

module.exports = resizeLogos;