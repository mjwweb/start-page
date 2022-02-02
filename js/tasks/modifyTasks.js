

$('.deleteTaskBtn').click(function () {
    tid = $('.editTaskForm').attr('tid');
    $.ajax({
        type: 'POST',
        url: 'Includes/deleteTask.inc.php',
        data: {
            tid: tid
        },
        success: function (r) {
            closeTaskForm();
            fetchTasks();
            //$('.taskWrap [tid="'+tid+'"]').slideToggle();
        }
    });
});

$(document).on('click', '.taskEditBtn', function () {
    $(this).addClass('taskEditBtnFocus');
    tid = $(this).attr('tid');
    taskBox = $(this).parent('.taskBox');
    offset = taskBox.offset();
    leftPos = offset.left + 425 + 'px';
    topPos = offset.top + -6 + 'px';

    title = $('.taskTitle[tid|="' + tid + '"]').text();
    selectedDate = $(this).attr('date');

    // format date in date input
    // reformat - javascript bug
    reformat = selectedDate.replace(/-/g, '\/');
    defaultDate = formatDatePreview(reformat);
    $('.dateInptWrap').text(defaultDate);

    //set the default date on date picker
    $('.dateInptWrap').flatpickr({
        defaultDate: selectedDate,
        onChange: function (selectedDates, dateStr, instance) {
            preview = formatDatePreview(selectedDates);
            $('.dateInptWrap').text(preview);
            selectedDate = dateStr;
        },
    });

    $('.addTaskInpt').val(title);

    if ($('.taskTime[tid|="' + tid + '"]').length) {
        showFormTime();
        time_preview = $('.taskTime[tid|="' + tid + '"]').text();
        time_value = $(this).attr('time');
        $('.timeInptWrap').text(time_preview);
        $('.timeOption').removeClass('selectedTime');
        $('.timeOption[value|="' + time_value + '"]').addClass('selectedTime');
    } else {
        hideFormTime();
    }

    $('.deleteTaskBtn').show();
    $('.addTaskForm').css({
        'top': topPos,
        'left': leftPos,
        'right': 'auto',
        'margin-left': '-15px',
        'opacity': '0'
    }).attr('tid', tid).addClass('editTaskForm').show();
    $(".addTaskForm").animate({
        marginLeft: "0",
        opacity: 1
    }, 200);

    setTimeout(function () {
        $('.addTaskInpt').trigger('click').focus();
        //$('.bkgTint').fadeIn('fast');
    }, 250);
});

$(document).on('click', '.taskStar', function () {
    tid = $(this).attr('tid');
    if (!$(this).hasClass('fas')) {
        $(this).addClass('fas').removeClass('fal');
        action = 1;
    } else {
        $(this).removeClass('fas').addClass('fal');
        action = '';
    }
    $.ajax({
        type: 'POST',
        url: 'Includes/starTask.inc.php',
        data: {
            tid: tid,
            action: action
        },
        success: function (r) {
            fetchTasks();
        }
    });
});

$(document).on('click', '.checkCircle', function () {
    taskId = $(this).attr('taskid');
    action = $(this).attr('action');
    $.ajax({
        type: 'POST',
        url: 'Includes/completeTask.inc.php',
        data: {
            taskId: taskId,
            action: action
        },
        success: function (r) {
            fetchTasks();
        }
    });
});

function getStarredTasks(query) {
    $.ajax({
        type: 'POST',
        url: 'Includes/getStarredTasks.inc.php',
        data: {
            query: query
        },
        success: function (r) {
            $('.starredTasksContent').html(r);
            if ($('.starredTasksForm').is(':hidden')) {
                $('.starredTasksForm').show();
                $('.starredTasksForm').css({
                    'margin-top': '-15px',
                    'opacity': '0'
                });
                $(".starredTasksForm").animate({
                    marginTop: "0",
                    opacity: 1
                }, 200);
            }
        }
    });
}

$(document).on('click', '.completeTasksTog', function () {
    if ($('.completeTaskWrap').is(':visible')) {
        localStorage.setItem('showCompletedTasks', 'false');
    } else {
        localStorage.setItem('showCompletedTasks', 'true');
    }

    $('.completeTaskWrap').fadeToggle(100);
    $('.completeTasksTog i').toggleClass('fa-chevron-right fa-chevron-down');
});

/*
$('.starIcon').click(function () {
    query = '';
    getStarredTasks(query);
});

$('.srchStarInpt').keyup(function (e) {
    query = $(this).val();
    getStarredTasks(query);
});
*/