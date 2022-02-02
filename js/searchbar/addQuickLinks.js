$('.addQlBtn').click(function () {
    $(this).addClass('addQlBtnActive');
    if ($.trim($('#srchInpt').val()).length > 0) {
        root = $('#srchInpt').val();
        $('#qlRootHdr').text(root);
    }
    $('.qlFormWrap').show();
    $('.qlFormWrap').css({
        'margin-left': '-15px',
        'opacity': '0'
    });
    $(".qlFormWrap").animate({
        marginLeft: "0",
        opacity: 1
    }, 200);
    setTimeout(function () {
        $('.qlFrmTitle').focus();
    }, 200);
});

function closeQlForm() {
    if ($('.qlFormWrap').is(':visible')) {
        $('.addQlBtn').removeClass('addQlBtnActive');
        $('.qlFormWrap').addClass('qlFormDeanimate');
        $('.srchBarBottom').hide();
        $('.bkgTint').hide();
        setTimeout(function () {
            $('.qlFormWrap').hide();
            $('.qlFormWrap').removeClass('qlFormDeanimate');
            $('.srchBarWrap').removeClass('srchBarFocus');
        }, 200);
    }
}

$('.cancelQl').click(function () {
    $('.qlFrmTitle, .qlFrmUrl').val('');
    $('#srchInpt').focus();
    closeQlForm();
});

$('.saveQl').click(function () {
    title = $('.qlFrmTitle').val();
    url = $('.qlFrmUrl').val();

    if ($.trim(title) !== '' && $.trim(url) !== '') {
        $.ajax({
            type: 'POST',
            url: 'Includes/addQuickLink.inc.php',
            data: {
                title: title,
                url: url
            },
            success: function (r) {
                fetchQuickLinks();
                $('#srchInpt').focus();
                $('.addQlBtn').removeClass('addQlBtnActive');
                closeQlForm();
                $('.qlFrmTitle, .qlFrmUrl').val('');
            }
        });
    }

});