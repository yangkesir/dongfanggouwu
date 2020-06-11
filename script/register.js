! function($) {
    const $form = $('form');
    const $username = $('.username');
    const $password = $('.password');
    const $repass = $('.repass');
    const $email = $('.email');
    const $span = $('span');

    
    let userflag = true; 
    let passflag = true;
    let repassflag = true;

    //1.用户名
    $username.on('focus', function() {
        $span.eq(1).html('设置后不可更改，中英文均可，最长14个英文或7个汉字').css({
            color: '#ccc'
        });
    });

    $username.on('blur', function() {
        if ($(this).val() !== '') { 
            let len = $(this).val().replace(/[\u4e00-\u9fa5]/g, 'aa').length;
            if (len < 14) {
                $.ajax({
                    type: 'post',
                    url: 'http://localhost/daima/dongfanggouwu/xiangmu/php/register.php',
                    data: {
                        username: $username.val()
                    }
                }).done(function(result) {
                    if (!result) { 
                        $span.eq(1).html('√').css('color', 'green');
                        $userflag = true;
                    } else {
                        $span.eq(1).html('该用户名已经存在').css('color', 'red');
                        $userflag = false;
                    }
                })
            } else {
                $span.eq(1).html('该用户名长度有问题').css({
                    color: 'red'
                });
                userflag = false;
            }
        } else {
            $span.eq(1).html('该用户名不能为空').css({
                color: 'red'
            });
            userflag = false;
        }
    });

    //密码
    $password.on('focus', function() {
        $span.eq(1).html('长度为8~14个字符,至少包含2种字符').css({
            color: '#ccc'
        });
    });

    $password.on('input', function() {
        let $pass = $(this).val();
        if ($pass.length >= 8 && $pass.length <= 14) {
            let regnum = /\d+/;
            let regupper = /[A-Z]+/;
            let reglower = /[a-z]+/;
            let regother = /[\W\_]+/; 

          
            let $count = 0; 

            if (regnum.test($pass)) {
                $count++;
            }

            if (regupper.test($pass)) {
                $count++;
            }

            if (reglower.test($pass)) {
                $count++;
            }

            if (regother.test($pass)) {
                $count++;
            }

            switch ($count) {
                case 1:
                    $span.eq(2).html('弱').css({
                        color: 'red'
                    });
                    passflag = false;
                    break;

                case 2:
                case 3:
                    $span.eq(2).html('中').css({
                        color: 'yellow'
                    });
                    passflag = true;
                    break;
                case 4:
                    $span.eq(2).html('强').css({
                        color: 'green'
                    });
                    passflag = true;
                    break;
            }

        } else {
            $span.eq(2).html('密码长度错误').css({
                color: 'red'
            });
            passflag = false;
        }
    });

    $password.on('blur', function() {
        if ($(this).val() !== '') {
            if (passflag) {
                $span.eq(1).html('√').css({
                    color: 'green'
                });
                passflag = true;
            }
        } else {
            $span.eq(1).html('密码不能为空').css({
                color: 'red'
            });
            passflag = false;
        }
    });
    //3.确认密码
    $repass.on('focus',function(){
        $span.eq(3).html('请再次输入密码').css({
            color:'#ccc'
        });
    });

    $repass.on('blur',function(){
        let $repass=$(this).val();
        if($(this).val() === $(password).val()){
           $span.eq(3).html('√').css({
               color:'green'
           });
           repassflag = true;
        }else{
            $span.eq(3).html('密码不对').css({
                color:'red'
            });
            passflag = flase;
        }
    });




    $form.on('submit', function() {
        if ($username.val() === '') {
            $span.eq(1).html('该用户名不能为空').css({
                color: 'red'
            });
            userflag = false;
        }

        if ($password.val() === '') {
            $span.eq(2).html('密码不能为空').css({
                color: 'red'
            });
            passflag = false;
        }
      
        if (!userflag || !passflag) {
            return false;
        }

    });

  
}(jQuery);