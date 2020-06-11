! function($) {
    
    let $sid = location.search.substring(1).split('=')[1];
    const $smallpic = $('#smallpic');
    const $bpic = $('#bpic');
    const $title = $('.loadtitle');
    const $price = $('.loadpcp');

    
    if (!$sid) {
        $sid = 1;
    }

    $.ajax({
        url: 'http://localhost/daima/dongfanggouwu/xiangmu/php/getsid.php',
        data: {
            sid: $sid
        },
        dataType: 'json'
    }).done(function(d) {
        console.log(d);
        $smallpic.attr('src', d.url);
        $smallpic.attr('sid', d.sid); 
        $bpic.attr('src', d.url);
        $title.html(d.title);
        $price.html(d.price);
        console.log(d.piclisturl.split(','));
        let picarr = d.piclisturl.split(',');
        let $strhtml = '';
        $.each(picarr, function(index, value) {
            $strhtml += '<li><img src="' + value + '"/>></li>';
        });
        $('#list ul').html($strhtml);
    });

    const $spic = $('#spic');
    const $sf = $('#sf'); 
    const $bf = $('#bf'); 
    const $left = $('#left'); 
    const $right = $('#right'); 
    const $list = $('#list'); 
 
    $sf.width($spic.width() * $bf.width() / $bpic.width());
    $sf.height($spic.height() * $bf.height() / $bpic.height());
    let $bili = $bpic.width() / $spic.width();


    $spic.hover(function() {
        $sf.css('visibility', 'visible');
        $bf.css('visibility', 'visible');
        $(this).on('mousemove', function(ev) {
            let $leftvalue = ev.pageX - $('.goodsinfo').offset().left - $sf.width() / 2;
            let $topvalue = ev.pageY - $('.goodsinfo').offset().top - $sf.height() / 2;
            if ($leftvalue < 0) {
                $leftvalue = 0;
            } else if ($leftvalue >= $spic.width() - $sf.width()) {
                $leftvalue = $spic.width() - $sf.width()
            }

            if ($topvalue < 0) {
                $topvalue = 0;
            } else if ($topvalue >= $spic.height() - $sf.height()) {
                $topvalue = $spic.height() - $sf.height()
            }

            $sf.css({
                left: $leftvalue,
                top: $topvalue
            });

            $bpic.css({
                left: -$leftvalue * $bili,
                top: -$topvalue * $bili
            });

        });
    }, function() {
        $sf.css('visibility', 'hidden');
        $bf.css('visibility', 'hidden');
    });

 
    $('#list ul').on('click', 'li', function() {
    
        let $imgurl = $(this).find('img').attr('src');
        $smallpic.attr('src', $imgurl);
        $bpic.attr('src', $imgurl);
    });

   
    let $num = 6; 
    $right.on('click', function() {
        let $lists = $('#list ul li');
        if ($lists.size() > $num) { 
            $num++;
            $left.css('color', '#333');
            if ($lists.size() == $num) {
                $right.css('color', '#fff');
            }
            $('#list ul').animate({
                left: -($num - 6) * $lists.eq(0).outerWidth(true)
            });
        }
    });


    $left.on('click', function() {
        let $lists = $('#list ul li');
        if ($num > 6) { 
            $num--;
            $right.css('color', '#333');
            if ($num <= 6) {
                $left.css('color', '#fff');
            }
            $('#list ul').animate({
                left: -($num - 6) * $lists.eq(0).outerWidth(true)
            });
        }
    });

  

    
    let arrsid = []; 
    let arrnum = []; 
   

    
    function cookietoarray() {
        if ($.cookie('cookiesid') && $.cookie('cookienum')) {
            arrsid = $.cookie('cookiesid').split(',');
            arrnum = $.cookie('cookienum').split(','); 
        } else {
            arrsid = [];
            arrnum = [];
        }
    }



    $('.p-btn a').on('click', function() {
        
        let $sid = $(this).parents('.goodsinfo').find('#smallpic').attr('sid');
       
       
        
        cookietoarray();
        if ($.inArray($sid, arrsid) != -1) { 
            
            let $num = parseInt(arrnum[$.inArray($sid, arrsid)]) + parseInt($('#count').val());
            arrnum[$.inArray($sid, arrsid)] = $num; 
            $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
        } else {
            
            arrsid.push($sid); 
            $.cookie('cookiesid', arrsid, { expires: 10, path: '/' });
            arrnum.push($('#count').val()); 
            $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
        }
        alert('按钮触发了');
    });




}(jQuery);