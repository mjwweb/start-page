

    var activeDate = formatDate(new Date());
    var selectedDate = formatDate(new Date());
    var today = formatDate(new Date());

    $(document).ready(function(){
        $('.showTasksTog').change(function(){
            if ($(this).is(':checked')) {
                showTasks();
            } else {
                hideTasks();
            }
        });
    });

    $(document).ready(function(){
        tasks = localStorage.getItem('tasks');

        if (tasks == 'hidden') {
            $('.mainTasksWrapper').hide();
            $('.showTasksTog').prop('checked', false);
        }
    });

    function showTasks() {
        $('.mainTasksWrapper').fadeIn('fast');
        localStorage.setItem('tasks', 'visible');
    }

    function hideTasks() {
        $('.mainTasksWrapper').fadeOut('fast');
        localStorage.setItem('tasks', 'hidden');
    }

    $(document).ready(function(){
        $('.photoFeedSwitch').change(function(){
            if ($(this).is(':checked')) {
                setTheme('wallpaper');
            } else {
                setTheme('white');
            }
        });
    });

    $(document).ready(function(){
       theme =  localStorage.getItem('theme');
       setTheme(theme);
    });

    function setTheme(theme) {
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
            $('.wrapperMain').css('background-image', 'linear-gradient( rgba(0,0,0,.3), rgba(0,0,0,.3) ),url("backgrounds/bkg28.jpg")');
            localStorage.setItem('theme', 'wallpaper');
        }
        if (!theme) {
            $('head').append('<link id="wallpaperThemeCss" rel="stylesheet" type="text/css" href="wallpaperTheme.less">');
            $('#whiteThemeCss').remove();
            $('.photoFeedSwitch').prop('checked', true);
            localStorage.setItem('theme', 'wallpaper');
        }
    }

    $(document).ready(function(){
        $('#taskDateHdr').flatpickr();
        $('#taskDateHdr').click(function(){
            $('.flatpickr-calendar').addClass('mainCalendarPickr');
            $('.bkgTint').fadeIn('fast');
            $('.tasksWrap').fadeOut('fast');
        });
    });

    $(document).ready(function(){
        $('.deleteTaskBtn').click(function(){
            tid = $('.editTaskForm').attr('tid');
            $.ajax({
                type: 'POST',
                url: 'Includes/deleteTask.inc.php',
                data: {tid: tid},
                success: function(r) {
                    closeTaskForm();
                    fetchTasks();
                    //$('.taskWrap [tid="'+tid+'"]').slideToggle();
                }
            });
        });
    });

    $(document).ready(function(){
        $(document).on('click', '.taskEditBtn', function(){
            $(this).addClass('taskEditBtnFocus');
            tid = $(this).attr('tid');
            taskBox = $(this).parent('.taskBox');
            offset = taskBox.offset();
            leftPos = offset.left + 425 + 'px';
            topPos = offset.top + -6 + 'px';

            title = $('.taskTitle[tid|="'+tid+'"]').text();
            selectedDate = $(this).attr('date');

            // format date in date input
            // reformat - javascript bug
            reformat = selectedDate.replace(/-/g, '\/');
            defaultDate = formatDatePreview(reformat);
            $('.dateInptWrap').text(defaultDate);
            
            //set the default date on date picker
            $('.dateInptWrap').flatpickr({
                defaultDate: selectedDate,
                onChange: function(selectedDates, dateStr, instance) {
                    preview = formatDatePreview(selectedDates);
                    $('.dateInptWrap').text(preview);
                    selectedDate = dateStr;
                },
            });
            
            $('.addTaskInpt').val(title);

            if ($('.taskTime[tid|="'+tid+'"]').length) {
                showFormTime();
                time_preview = $('.taskTime[tid|="'+tid+'"]').text();
                time_value = $(this).attr('time');
                $('.timeInptWrap').text(time_preview);
                $('.timeOption').removeClass('selectedTime');
                $('.timeOption[value|="'+time_value+'"]').addClass('selectedTime');
            } else {
                hideFormTime();
            }
       
            $('.deleteTaskBtn').show();
            $('.addTaskForm').css({'top' : topPos, 'left' : leftPos, 'right' : 'auto', 'margin-left' : '-15px', 'opacity' : '0'}).attr('tid', tid).addClass('editTaskForm').show();
            $(".addTaskForm").animate({ marginLeft: "0", opacity: 1 }, 200);

            setTimeout(function(){
                $('.addTaskInpt').trigger('click').focus();
                //$('.bkgTint').fadeIn('fast');
            }, 250);
        });
    });

    $(document).ready(function(){
        $('.starIcon').click(function(){
            query = '';
            getStarredTasks(query);
        });
    });

    $(document).ready(function(){
        $('.srchStarInpt').keyup(function(e){
            query = $(this).val();
            getStarredTasks(query);
        });
    });

    $(document).ready(function(){
        $(document).on('click', '.taskStar', function(){
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
                data: {tid: tid, action: action},
                success: function(r) {
                    fetchTasks();
                }
            });
        });
    });

    $(document).ready(function(){
        $(document).on('click', '.checkCircle', function(){
            taskId = $(this).attr('taskid');
            action = $(this).attr('action');
            $.ajax({
                type: 'POST',
                url: 'Includes/completeTask.inc.php',
                data: {taskId: taskId, action: action},
                success: function(r) {
                    fetchTasks();
                }
            });
        });
    });

    $(document).ready(function(){
        $('.addTaskBtn').click(function(){
            $('.addTaskForm').css({ 'top' : '75px', 'right' : '149px', 'left' : 'auto' });
            $('.addTaskForm').removeClass('editTaskForm');
            $('.deleteTaskBtn').hide();
            $('.addTaskForm').show();
            $('.addTaskInpt').trigger('click').focus();

            $('.addTaskForm').css({'margin-top' : '-10px', 'opacity' : '0'});
            $(".addTaskForm").animate({ marginTop: "0", opacity: 1 }, 200);
        });
    });

    function getStarredTasks(query) {
        $.ajax({
            type: 'POST',
            url: 'Includes/getStarredTasks.inc.php',
            data: {query: query},
            success: function(r) {
                $('.starredTasksContent').html(r);
                if ($('.starredTasksForm').is(':hidden')) {
                    $('.starredTasksForm').show();
                    $('.starredTasksForm').css({'margin-top' : '-15px', 'opacity' : '0'});
                    $(".starredTasksForm").animate({ marginTop: "0", opacity: 1 }, 200);
                }
            }
        });
    }

    $(document).ready(function(){
        $(document).on('click', '.completeTasksTog', function(){
            $('.completeTaskWrap').fadeToggle(100);
            $('.completeTasksTog i').toggleClass('fa-chevron-right');
        });
    });

    function fetchTasks() {
        
        $.ajax({
            type: 'POST',
            url: 'Includes/fetchTasks.inc.php',
            data: {date: activeDate},
            success: function(r) {
                $('.tasksWrap').html(r);
                d = new Date(activeDate.replace(/-/g, '\/'));
                weekday = d.toLocaleString('default', { weekday: 'long' });
                month = d.toLocaleString('default', {month: 'long'});
                day = d.toLocaleString('default', {day: 'numeric'});
                $('#weekdayHdr').text(weekday);
                $('#taskDateHdr').text(month + ' ' + day);
            }
        });
    }

    $(document).ready(function(){
        $('#plusDay').click(function(){
            activeDate = incrementDate(activeDate, 1);
            fetchTasks();
        });
    });

    $(document).ready(function(){
        $('#minusDay').click(function(){
            activeDate = incrementDate(activeDate, -1);
            fetchTasks();
        });
    });

    $(document).ready(function(){
        $('.taskListBtn').click(function(){
            $('.taskListWrap').show();
            $('.taskListWrap').css({'margin-top' : '-15px', 'opacity' : '0'});
            $(".taskListWrap").animate({ marginTop: "0", opacity: 1 }, 200);
        });
    });

    $(document).ready(function(){
        $(".timePickFrm").overlayScrollbars({});
    });

    $(document).ready(function(){
        $('.cancelTaskBtn').click(function(){
            closeTaskForm();
        });
    });

    $(document).ready(function(){
        $('.saveTaskBtn').click(function(){

            dateTime = selectedDate;
            if ($('.timeCheckbox').hasClass('uncheckedTime')) {
                time = $('.selectedTime').attr('value');
                dateTime = selectedDate + ' ' + time;
            }
            taskText = $('.addTaskInpt').val();
            taskComment = $('.taskCommentInpt').val();

            alert(selectedDate);

            if (!$('.addTaskForm').hasClass('editTaskForm')) {
                $.ajax({
                    type: 'POST',
                    url: 'Includes/addTask.inc.php',
                    data: {dateTime: dateTime, taskText: taskText, taskComment: taskComment},
                    success: function(r) {
                        closeTaskForm();
                        if (activeDate == selectedDate) {
                            fetchTasks();
                        }
                    }
                });
            }

            else {
                tid = $('.addTaskForm').attr('tid');
                $.ajax({
                    type: 'POST',
                    url: 'Includes/editTask.inc.php',
                    data: {tid: tid, dateTime: dateTime, taskText: taskText, taskComment: taskComment},
                    success: function(r) {
                        closeTaskForm();
                        fetchTasks();
                    }
                });
            }

        });
    });

    $(document).ready(function(){
        $('.timeOption').click(function(){
            preview = $(this).text();
            value = $(this).attr('value');
            $('.timeInptWrap').text(preview);
            $('.timePickFrm').hide();
            $('.timeOption').removeClass('selectedTime');
            $(this).addClass('selectedTime');
        });
    });

    $(document).ready(function(){
        $('.dateInptWrap').flatpickr({
            onChange: function(selectedDates, dateStr, instance) {
                preview = formatDatePreview(selectedDates);
                $('.dateInptWrap').text(preview);
                selectedDate = dateStr;
            },
            onMonthChange() {
                alert('go');
            }
        });
    });

    $(document).ready(function(){
        $(document).on('click', '.flatpickr-next-month', function(){
            //alert('go');
        });
    });

    $(document).ready(function(){
        d = new Date();
        preview = formatDatePreview(d);
        $('.dateInptWrap').text(preview);
    });

    function formatDatePreview(date) {
        d = new Date(date);
        month = d.toLocaleString('default', { month: 'short' });
        weekday = d.toLocaleString('default', { weekday: 'short' });
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

    function incrementDate(date_str, incrementor) {
        var parts = date_str.split("-");
        var dt = new Date(
            parseInt(parts[0], 10),      // year
            parseInt(parts[1], 10) - 1,  // month (starts with 0)
            parseInt(parts[2], 10)       // date
        );
        dt.setTime(dt.getTime() + incrementor * 86400000);
        parts[0] = "" + dt.getFullYear();
        parts[1] = "" + (dt.getMonth() + 1);
        if (parts[1].length < 2) {
            parts[1] = "0" + parts[1];
        }
        parts[2] = "" + dt.getDate();
        if (parts[2].length < 2) {
            parts[2] = "0" + parts[2];
        }
        return parts.join("-");
    };

    $(document).ready(function(){
        $('.timeInptWrap').click(function(){
            topPos = $(this).offset().top + 38;
            leftPos = $(this).offset().left;
            $('.timePickFrm').css('top', topPos + 'px');
            $('.timePickFrm').css('left', leftPos + 'px');
            $('.timePickFrm').show();
        });
    });

    $(document).ready(function(){
        $('.timeCheckbox').click(function(){
            if ($('.timeInptWrap').is(':hidden')) {
                showFormTime();
            } else {
                hideFormTime();
            }
        });
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
        $('.addTaskForm, .timePickFrm, .bkgTint').hide();
        $('.addTaskInpt').val('');
        hideFormTime();
    }