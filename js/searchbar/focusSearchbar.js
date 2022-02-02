setTimeout(function(){
    $('#srchInpt').focus();
}, 75);

$('.srchBarWrap').click(function(e){
    $('.srchBarWrap').addClass('srchBarFocus');

    if ($('#srchInpt').val() == '') {
        fetchQuickLinks();
    } else {
        autocomplete();
    }

});