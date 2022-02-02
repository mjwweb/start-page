

$('.homepageBtn').click(function(){
    $('.setHomepageFormWrap').show();
    $('.setHomepageFormWrap').css({
        'margin-right': '-10px',
        opacity: '0'
    });

    $(".setHomepageFormWrap").animate({
        marginRight: "0",
        opacity: 1
    }, 200);

    if ($(window).width() < 600) {
        $('.settingsForm').hide();
    }

    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
        alert('Opera');
    } else if (navigator.userAgent.indexOf("Chrome") != -1) {
        $('.chromeInstructions').show();
    } else if (navigator.userAgent.indexOf("Safari") != -1) {
        alert('Safari');
    } else if (navigator.userAgent.indexOf("Firefox") != -1) {
        $('.firefoxInstructions').show();
    } else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) {
        alert('IE');
    } else {
        alert('unknown');
    }
});