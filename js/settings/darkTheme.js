var theme = localStorage.getItem('theme');
setTheme();

/*
if (theme == 'dark') {
    $('.darkThemeTog').prop('checked', true);
}
*/

$('.darkThemeTog').change(function(){
    if ($(this).is(':checked')) {
        $('#whiteThemeCss').remove();
        $('head').append('<link id="darkThemeCss" rel="stylesheet" type="text/css" href="darkTheme.less">');

        localStorage.setItem('theme', 'dark');

        themeColor = 'dark';
    } else {
        $('#darkThemeCss').remove();
        $('head').append('<link id="whiteThemeCss" rel="stylesheet" type="text/css" href="whiteTheme.less">');

        localStorage.setItem('theme', 'light');

        themeColor = 'white';
    }

    $.ajax({
        type: 'POST',
        url: 'Includes/changeTheme.inc.php',
        data: {
            theme: themeColor
        },
        success: function (r) {}
    });
});

$('.photoFeedSwitch').change(function () {
    if ($(this).is(':checked')) {
        theme = 'wallpaper';
        setTheme();
    } else {
        theme = 'white';
        setTheme();
    }
});

function setTheme() {
    if (theme == 'white') {
        $('head').append('<link id="whiteThemeCss" rel="stylesheet" type="text/css" href="whiteTheme.less">');
        $('#wallpaperThemeCss').remove();
        $('.photoFeedSwitch').prop('checked', false);
        localStorage.setItem('theme', 'white');
    }
    if (theme == 'wallpaper') {
        $('head').append('<link id="wallpaperThemeCss" rel="stylesheet" type="text/css" href="wallpaperTheme.less">');
        $('#whiteThemeCss').remove();
        $('.photoFeedSwitch').prop('checked', true);
        getUnsplashBackground();
        localStorage.setItem('theme', 'wallpaper');
    }
    if (!theme) {
        $('head').append('<link id="wallpaperThemeCss" rel="stylesheet" type="text/css" href="wallpaperTheme.less">');
        $('#whiteThemeCss').remove();
        $('.photoFeedSwitch').prop('checked', true);
        getUnsplashBackground();
        localStorage.setItem('theme', 'wallpaper');
    }
}

function getUnsplashBackground(){
    $.ajax({
        url: 'Includes/getUnsplashBackground.inc.php',
        type: 'GET',
        success: function(r) {
            data = JSON.parse(r);
            url = data[0];
            person = data[1];
            instagram = data[2];
            photo_location = data[3];

            $('.creditsPerson').text(person);
            $('.creditsLocation').text(photo_location);
            $('.creditsInstagram').text('@'+instagram);
            $('.wrapperMain').css('background-image', 'linear-gradient( rgba(0,0,0,.3), rgba(0,0,0,.3) ),url('+url+')');
        }
    });
}