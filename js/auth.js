$('.authInput').keydown(function(e){
    if (e.keyCode == 13) {
        if ($('.loginForm').is(':visible')) {
            $('.loginSubmit').trigger('click');
        }
        if ($('.signupForm').is(':visible')) {
            $('.signupSubmit').trigger('click');
        }
    }
});

    $('.loginTog').click(function(){
        $('.signupForm').hide().removeClass('signupFormAnimate');;
        $('.loginForm').show();
        setTimeout(function(){
            $('.loginForm').addClass('loginFormAnimate');
        }, 1);
        setTimeout(function(){
            $('.emailInptLogin').focus();
        }, 100);
    });

    $('.registerTog').click(function(){
        $('.loginForm').hide().removeClass('loginFormAnimate');
        $('.signupForm').show();
        setTimeout(function(){
            $('.signupForm').addClass('signupFormAnimate');
        }, 1);
        setTimeout(function(){
            $('.emailInptSignup').focus();
        }, 100);
    });

    $('.loginBtn').click(function(){
        $('.loginPanel').hide();
        $('.loginForm').show();
        //$('.srchBarBottom').hide();
        $('.srchBarWrap').removeClass('srchBarFocus');
        setTimeout(function(){
            $('.loginForm').addClass('loginFormAnimate');
        }, 1);
        setTimeout(function(){
            $('.emailInptLogin').focus();
        }, 100);
    });

    $('.signupBtn').click(function(){
        $('.loginPanel').hide();
        $('.signupForm').show();
        //$('.srchBarBottom').hide();
        $('.srchBarWrap').removeClass('srchBarFocus');
        setTimeout(function(){
            $('.signupForm').addClass('signupFormAnimate');
        }, 1);
        setTimeout(function(){
            $('.emailInptSignup').focus();
        }, 100);
    });

    $('.signupSubmit').click(function(){
        email = $('.emailInptSignup').val();
        pwd = $('.pwdInptSignup').val();
        pwdRpt = $('.pwdRptInptSignup').val();

        if ($.trim(email) == '' || $.trim(pwd) == '' || $.trim(pwdRpt) == '') {
            $('#signupErMsg').text('*Fill in all fields').show();
        }
        else {
            $.ajax({
                type: 'POST',
                url: 'Includes/signup.inc.php',
                data: {email: email, pwd: pwd, pwdRpt: pwdRpt},
                success: function(r) {
                    if ($.trim(r) == '1') {
                        window.location.reload();
                    }
                    else {
                        $('#signupErMsg').text(r).show();
                    }
                }
            });
        }
    });

    $('.loginSubmit').click(function(){
        email = $('.emailInptLogin').val();
        pwd = $('.pwdInptLogin').val();

        if ($.trim(email) == '' || $.trim(pwd) == '') {
            $('#loginErMsg').text('*Fill in all fields').show();
        }
        else {
            $.ajax({
                type: 'POST',
                url: 'Includes/login.inc.php',
                data: {email: email, pwd: pwd},
                success: function(r) {
                    if ($.trim(r) == '1') {
                        window.location.reload();
                    } 
                    else {
                        $('#loginErMsg').text(r).show();
                    }
                }
            });
        }
    });