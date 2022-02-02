
showTime();

function showTime() {
    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();

    if (h == 0) {
        h = 12;
    }

    if (h > 12) {
        h = h - 12;
    }

    m = (m < 10) ? "0" + m : m;

    var time = h + ":" + m;

    $('.clockWrap p').text(time);

    setTimeout(showTime, 30000);
}

$('.settingsIcon').click(function () {
    if ($('.settingsForm').is(':hidden')) {
        $(this).addClass('activeSettingsIcon');
        $('.settingsForm').show();
        $('.settingsForm').css({
            'margin-top': '-20px',
            'margin-left': '-45px',
            'opacity': '0',
            'width': '150px'
        });
        $('.settingsForm').animate({
            marginTop: '0',
            marginRight: '0',
            opacity: 1,
            width: '230px'
        }, 200, 'easeOutCirc');
    }
});

$('.srchBarBottom').overlayScrollbars({
    overflowBehavior: {
        x: "hidden",
        y: "scroll"
    },
    scrollbars: {
        autoHide: 'leave',
        autoHideDelay: 400
    }
});

$(document).on('mousedown', function (e) {
    if (!$('.srchBarBotom, .srchBarWrap, .qlFormWrap').is(e.target) && $('.srchBarBottom, .srchBarWrap, .qlFormWrap').has(e.target).length === 0) {
        $('.srchBarBottom').hide();
        $('.srchBarWrap').removeClass('srchBarFocus');
    }
    if (!$('.settingsForm').is(e.target) && $('.settingsForm').has(e.target).length === 0 && !$('.srchEngineFormWrap').is(e.target) && $('.srchEngineFormWrap').has(e.target).length === 0) {
        $('.settingsForm').hide();
        $('.settingsIcon').removeClass('activeSettingsIcon');
    }
    if (!$('.activeInput').is(e.target) && $('.activeInput').has(e.target).length === 0) {
        $('.inputBorder').css('width', '0');
    }
    if (!$('.srchEngineFormWrap').is(e.target) && $('.srchEngineFormWrap').has(e.target).length === 0) {
        $('.srchEngineFormWrap').hide();
    }
    if (!$('.setHomepageFormWrap').is(e.target) && $('.setHomepageFormWrap').has(e.target).length === 0) {
        $('.setHomepageFormWrap').hide();
    }
    if (!$('.qlFormWrap').is(e.target) && $('.qlFormWrap').has(e.target).length === 0 && !$('.addQlBtn').is(e.target) && $('.addQlBtn').has(e.target).length === 0) {
        closeQlForm();
    }
    if (!$('.addTaskForm, .timePickFrm, .flatpickr-calendar').is(e.target) && $('.addTaskForm, .timePickFrm, .flatpickr-calendar').has(e.target).length === 0) {
        closeTaskForm();
    }
/*
    if (!$('.timePickFrm').is(e.target) && $('.timePickFrm').has(e.target).length === 0) {
        $('.timePickFrm').hide();
    }
    if (!$('.taskListWrap').is(e.target) && $('.taskListWrap').has(e.target).length === 0) {
        $('.taskListWrap').hide();
    }
    if (!$('.starredTasksForm').is(e.target) && $('.starredTasksForm').has(e.target).length === 0) {
        $('.starredTasksForm').hide();
    }
    */
});

$('.bkgTint').click(function () {
    $('.bkgTint').hide();
});

$('.logoutBtn').click(function () {
    $.ajax({
        type: 'POST',
        url: 'Includes/logout.inc.php',
        success: function (r) {
            window.location.reload();
        }
    });
});

$('.specialInput').focus(function () {
    $('.inputBorder').css('width', '0');
    $('.specialInput').removeClass('activeInput');
    $(this).next('.inputBorder').css('width', '0%');
    $(this).next('.inputBorder').animate({
        width: '100%'
    }, 200);
    $(this).addClass('activeInput');
});

$(".timePickFrm").overlayScrollbars({});

$(document).on('click', '.flatpickr-next-month', function () {
    //alert('go');
});

function formatDatePreview(date) {
    d = new Date(date);
    month = d.toLocaleString('default', {
        month: 'short'
    });
    weekday = d.toLocaleString('default', {
        weekday: 'short'
    });
    day = d.getDate();
    preview = weekday + ', ' + month + ' ' + day;
    return preview;
}

function formatDate() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}