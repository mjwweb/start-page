
var predictiveSearch;

$('.autocompleteTog').change(function () {
    if ($('.autocompleteTog').prop('checked') == true) {
        localStorage.setItem('autocomplete', 'true');
        predictiveSearch = true;
    } else {
        localStorage.setItem('autocomplete', 'false');
        predictiveSearch = false;
    }
});

$(document).on('click', '.predictiveSearchRow', function () {
    $('.srchBarWrap').removeClass('srchBarFocus');
    $('.srchBarBottom').remove();
    q = $(this).find('.predictiveSearchTitle').text();

    $('#srchInpt').val(q);

    var e = jQuery.Event("keyup");
    e.keyCode = 13;
    $("#srchInpt").trigger(e);
});

var predictiveSearch = localStorage.getItem('autocomplete');

if (predictiveSearch == 'false') {
    $('.autocompleteTog').prop('checked', false);
    predictiveSearch = false;
}

function autocomplete() {
    const q = $('#srchInpt').val();
    const proxy = 'https://cors-everywhere.herokuapp.com/';

    fetch(`${proxy}https://google.com/complete/search?client=firefox&hl=en&q=${q}`, {
            headers: {
                origin: 'google.com'
            }
        })
        .then(res => res.json())
        .then(res => {
            results = res[1].map(x => `<div class="predictiveSearchRow"><div class="qlFavIconWrap">
                            <img style="width: 20px; margin-left: -2px; margin-right: 3px;" src="icons/backup.png" />
                        </div><p class="predictiveSearchTitle">${x}</p></div>`).join('');
            if ($.trim(results) == '') {
                $('.srchBarBottom').hide();
            } else {
                $('.srchBarBottom').show();
                $('.quickLinksWrap').html(results);
                $('.predictiveSearchTitle').each(function () {
                    $(this).html($(this).html().replace(q, "<span style='font-weight: 400'>" + q + "</span>"));
                });
                $('.bkgTint').show();
            }
        });
}