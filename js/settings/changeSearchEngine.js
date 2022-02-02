var searchEngine = localStorage.getItem('searchEngine');
if (!searchEngine) {
    localStorage.setItem('searchEngine', 'Google');
}
setSearchLogo();

$('.srchEngineBtn').click(function () {
    $('.srchEngineFormWrap').removeClass('srchEngineFormDeanimate');
    $('.srchEngineCheck').remove();
    $('.srchEngineRow[value=' + searchEngine + ']').prepend('<i class="far fa-check srchEngineCheck"></i>');
    $('.srchEngineFormWrap').show();
    $('.srchEngineForm').addClass('srchEngineFormAnimate').css({
        'margin-right': '-10px',
        opacity: '0',
        width: '80px',
        height: '30px'
    });
    $(".srchEngineForm").animate({
        marginRight: "0",
        opacity: 1,
        width: '160px',
        height: '160px'
    }, 300);
});

$('.srchEngineRow').click(function () {
    searchEngine = $(this).attr('value');

    localStorage.setItem('searchEngine', searchEngine);

    $('.srchEngineCheck').remove();
    $('.srchEngineRow[value=' + searchEngine + ']').prepend('<i class="far fa-check srchEngineCheck"></i>');
    $('.srchEngineFormWrap').addClass('srchEngineFormDeanimate');
    setTimeout(function () {
        $('.srchEngineFormWrap').hide();
    }, 200);
    setSearchLogo();
});

function setSearchLogo() {
    if (searchEngine == 'Google') {
        $('.srchIcon').attr('src', 'icons/googleSearch.webp').addClass('googleSearchIcon').removeClass('bingSearchIcon yahooSearchIcon ddGoSearchIcon');
    }
    else if (searchEngine == 'Bing') {
        $('.srchIcon').attr('src', 'icons/bingSearch.png').addClass('bingSearchIcon').removeClass('googleSearchIcon yahooSearchIcon ddGoSearchIcon');
    }
    else if (searchEngine == 'Yahoo') {
        $('.srchIcon').attr('src', 'icons/yahooSearch.webp').addClass('yahooSearchIcon').removeClass('googleSearchIcon bingSearchIcon ddGoSearchIcon');
    }
    else if (searchEngine == 'ddGo') {
        $('.srchIcon').attr('src', 'icons/ddGoSearch.png').addClass('ddGoSearchIcon').removeClass('googleSearchIcon bindSearchIcon yahooSearchIcon');
    }
    else {
        $('.srchIcon').attr('src', 'icons/googleSearch.webp').addClass('googleSearchIcon').removeClass('bingSearchIcon yahooSearchIcon ddGoSearchIcon');
    }
}