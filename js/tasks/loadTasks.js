var activeDate = formatDate(new Date());

fetchTasks();

function fetchTasks() {
    showCompletedTasks = localStorage.getItem('showCompletedTasks');

    $.ajax({
        type: 'POST',
        url: 'Includes/fetchTasks.inc.php',
        data: {
            date: activeDate,
            showCompletedTasks: showCompletedTasks
        },
        success: function (r) {
            $('.tasksWrap').html(r);
            d = new Date(activeDate.replace(/-/g, '\/'));
            weekday = d.toLocaleString('default', {
                weekday: 'long'
            });
            month = d.toLocaleString('default', {
                month: 'long'
            });
            day = d.toLocaleString('default', {
                day: 'numeric'
            });
            $('#weekdayHdr').text(weekday);
            $('#taskDateHdr').val(month + ' ' + day);
        }
    });
}

$('.taskListBtn').click(function () {
    $('.taskListWrap').show();
    $('.taskListWrap').css({
        'margin-top': '-15px',
        'opacity': '0'
    });
    $(".taskListWrap").animate({
        marginTop: "0",
        opacity: 1
    }, 200);
});