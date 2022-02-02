var selectedDate = formatDate(new Date());
var today = formatDate(new Date());

$('#plusDay').click(function () {
    activeDate = incrementDate(activeDate, 1);
    fetchTasks();
});

$('#minusDay').click(function () {
    activeDate = incrementDate(activeDate, -1);
    fetchTasks();
});

$('#taskDateHdr').flatpickr({
    onChange: function (selectedDates, dateStr, instance) {
        activeDate = dateStr;
        fetchTasks();
    }
});

function incrementDate(date_str, incrementor) {
    /*
    date = new Date(date_str);
    date.setDate(date.getDate() + 1);

    month = '' + (date.getMonth() + 1),
    day = '' + date.getDate(),
    year = date.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    date = [year, month, day].join('-');

    return date;
    */

    var parts = date_str.split("-");
    var dt = new Date(
        parseInt(parts[0], 10), // year
        parseInt(parts[1], 10) - 1, // month (starts with 0)
        parseInt(parts[2], 10) // date
    );

    if (date_str == '2021-11-07' && incrementor == 1) {
        dt.setTime(dt.getTime() + incrementor * 24*120*60*1000);
    } else {
        dt.setTime(dt.getTime() + incrementor * 24*60*60*1000);
    }
    parts[0] = "" + dt.getFullYear();
    parts[1] = "" + (dt.getMonth() + 1);
    if (parts[1].length < 2) {
        parts[1] = "0" + parts[1];
    }
    parts[2] = "" + dt.getDate();
    if (parts[2].length < 2) {
        parts[2] = "0" + parts[2];
    }
    date = parts.join("-");
    return date;
};