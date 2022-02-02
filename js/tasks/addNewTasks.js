
$('.addTaskBtn').click(function () {
    d = new Date();
    preview = formatDatePreview(d);
    $('.dateInptWrap').text(preview);

    $('.addTaskForm').css({
        'top': '75px',
        'right': '75px',
        'left': 'auto'
    });
    $('.addTaskForm').removeClass('editTaskForm');
    $('.deleteTaskBtn').hide();
    $('.addTaskForm').show();

    setTimeout(function(){
        $('.addTaskInpt').trigger('click').focus();
    }, 250);

    $('.addTaskForm').css({
        'margin-top': '-10px',
        'opacity': '0'
    });
    $(".addTaskForm").animate({
        marginTop: "0",
        opacity: 1
    }, 200);
});

$('.dateInptWrap').flatpickr({
    onChange: function (selectedDates, dateStr, instance) {
        preview = formatDatePreview(selectedDates);
        $('.dateInptWrap').text(preview);
        selectedDate = dateStr;
    }
});

$('.timeOption').click(function () {
    preview = $(this).text();
    value = $(this).attr('value');
    $('.timeInptWrap').text(preview);
    $('.timePickFrm').hide();
    $('.timeOption').removeClass('selectedTime');
    $(this).addClass('selectedTime');
});

$('.saveTaskBtn').click(function () {

    dateTime = selectedDate;
    if ($('.timeCheckbox').hasClass('uncheckedTime')) {
        time = $('.selectedTime').attr('value');
        dateTime = selectedDate + ' ' + time;
    }
    taskText = $('.addTaskInpt').val();
    taskComment = $('.taskCommentInpt').val();

    if (!$('.addTaskForm').hasClass('editTaskForm')) {
        $.ajax({
            type: 'POST',
            url: 'Includes/addTask.inc.php',
            data: {
                dateTime: dateTime,
                taskText: taskText,
                taskComment: taskComment
            },
            success: function (r) {
                closeTaskForm();
                if (activeDate == selectedDate) {
                    fetchTasks();
                }
            }
        });
    } else {
        tid = $('.addTaskForm').attr('tid');
        $.ajax({
            type: 'POST',
            url: 'Includes/editTask.inc.php',
            data: {
                tid: tid,
                dateTime: dateTime,
                taskText: taskText,
                taskComment: taskComment
            },
            success: function (r) {
                closeTaskForm();
                fetchTasks();
            }
        });
    }

});

$('.cancelTaskBtn').click(function () {
    closeTaskForm();
});

$('.timeInptWrap').click(function () {
    topPos = $(this).offset().top + 38;
    leftPos = $(this).offset().left;
    $('.timePickFrm').css('top', topPos + 'px');
    $('.timePickFrm').css('left', leftPos + 'px');
    $('.timePickFrm').show();
});

$('.timeCheckbox').click(function () {
    if ($('.timeInptWrap').is(':hidden')) {
        showFormTime();
    } else {
        hideFormTime();
    }
});

function showFormTime() {
    $('.timeInptWrap').css('display', 'inline-block');
    $('.timeCheckbox').removeClass('checkedTime');
    $('.timeCheckbox').addClass('uncheckedTime');
}

function hideFormTime() {
    $('.timeInptWrap').hide();
    $('.timeCheckbox').removeClass('uncheckedTime');
    $('.timeCheckbox').addClass('checkedTime');
}

function closeTaskForm() {
    $('.addTaskForm, .timePickFrm').hide();
    $('.addTaskInpt').val('');
    hideFormTime();
}