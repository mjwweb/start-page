$('#srchInpt').keyup(function (e) {
    search = $(this).val();

    if (e.keyCode == 13) {
        $.ajax({
            type: 'POST',
            url: 'Includes/saveSearch.inc.php',
            data: {
                query: search
            },
            success: function () {
                if (searchEngine == 'Google') {
                    window.location = 'https://www.google.com/search?q=' + search;
                }
                else if (searchEngine == 'Bing') {
                    window.location = 'https://www.bing.com/search?q=' + search;
                }
                else if (searchEngine == 'Yahoo') {
                    window.location = 'https://search.yahoo.com/search?p=' + search;
                }
                else if (searchEngine == 'ddGo') {
                    window.location = 'https://www.duckduckgo.com/?q=' + search;
                }
                else {
                    window.location = 'https://www.google.com/search?q=' + search;
                }
            }
        });
    } else if ($.trim(search) == '') {
        fetchQuickLinks();
    } else {
        autocomplete();
    }
    /*
    if (e.keyCode == 13 && $(this).val().indexOf(':') > -1) {
        val = $.trim($(this).val());
        $.ajax({
            type: 'POST',
            url: 'Includes/runLine.inc.php',
            data: {val: val},
            success: function(r) {
                alert(r);
            }
        });
    }
    else {
        $(this).css('color', 'black');
        $('.srchBarBottom').css('border-top', '1px solid #ebecef');
    }
    */
});
/*
    function doneTyping() {
        if ($('#srchInpt').val().indexOf(':') > -1) {
            val = $('#srchInpt').val();
        }
    }
*/