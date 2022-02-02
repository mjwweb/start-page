var tasks = localStorage.getItem('tasks');

$('.showTasksTog').change(function () {
    if ($(this).is(':checked')) {
        showTasks();
    } else {
        hideTasks();
    }
});

if (tasks == 'hidden') {
    $('.mainTasksWrapper').hide();
    $('.showTasksTog').prop('checked', false);
}

function showTasks() {
    $('.mainTasksWrapper').fadeIn('fast');
    localStorage.setItem('tasks', 'visible');
}

function hideTasks() {
    $('.mainTasksWrapper').fadeOut('fast');
    localStorage.setItem('tasks', 'hidden');
}