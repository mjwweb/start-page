
$(document).on('click', '.quickLinkRow', function(e){
    if ($('.quickLinkRemove').is(e.target)) {
        qlid = e.target.getAttribute('qlid');
        $.ajax({
            type: 'POST',
            url: 'Includes/removeQuickLink.inc.php',
            data: {
                qlid: qlid
            },
            success: function (r) {
                fetchQuickLinks();
            }
        });
    } else {
        url = $(this).attr('url');
        window.open(url, '_blank');
    }
});

function sortQuickLinks() {
    var list_order = 0;
    $('.quickLinkSort').sortable({
        axis: 'y',
        delay: 120,
        stop: function (event, ui) {
            ids = [];
            $('.quickLinkRow').each(function () {
                val = $(this).attr('value');
                ids.push(val);
            });
            $.ajax({
                type: 'POST',
                url: 'Includes/orderQuickLinks.inc.php',
                data: {
                    ids: ids
                }
            });
        }
    });
}

function fetchQuickLinks() {
    $.ajax({
        type: 'POST',
        url: 'Includes/fetchQuickLinks.inc.php',
        success: function (data) {
            if ($.trim(data) !== '') {
                $('.bkgTint').show();
                $('.quickLinksWrap').html(data).addClass('quickLinkSort').removeClass('rootFolderSort');
                $('.srchBarBottom').show();
                //$('.addQlBtn').show();
                sortQuickLinks();
            } else {
                $('.srchBarBottom').hide();
            }
        }
    });
}