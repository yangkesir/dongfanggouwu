!function ($) {

    let array_default = [];
    let array = [];
    let prev = null;
    let next = null;


    
    const $list = $('.list');
    $.ajax({
        url: 'http://localhost/daima/dongfanggouwu/xiangmu/php/list.php',
        dataType: 'json'
    }).done(function (data) {
        let $strhtml = '<ul>';
        $.each(data, function (index, value) {
            $strhtml += `
                <li>
                    <a href="detail1.html?sid=${value.sid}" target="_blank">
                        <img class="lazy" data-original="${value.url}" width="200" height="200"/>
                        <p>${value.sid}${value.title}</p>
                        <span class="price">￥${value.price}</span>
                        <span>${value.sailnumber}</span>
                    </a>
                </li>
            `;
        });
        $strhtml += '</ul>';
        $list.html($strhtml);

       
        $(function () {
            $("img.lazy").lazyload({ effect: "fadeIn" });
        });

        array_default = [];
        array = [];
        prev = null;
        next = null;
        $('.list li').each(function (index, element) {
            array[index] = $(this);
            array_default[index] = $(this);
        });
    });

    $('.page').pagination({
        pageCount: 3,
        jump: true,
        coping: true,
        prevContent: '上一页',
        nextContent: '下一页',
        homePage: '首页',
        endPage: '尾页',
        callback: function (api) {
            console.log(api.getCurrent());
            $.ajax({
                url: 'http://localhost/daima/dongfanggouwu/xiangmu/php/list.php',
                data: {
                    page: api.getCurrent()
                },
                dataType: 'json'
            }).done(function (data) {
                let $strhtml = '<ul>';
                $.each(data, function (index, value) {
                    $strhtml += `
                        <li>
                            <a href="detail1.html?sid=${value.sid}" target="_blank">
                                <img src="${value.url}"/>
                                <p>${value.sid}${value.title}</p>
                                <span class="price">￥${value.price}</span>
                                <span>${value.sailnumber}</span>
                            </a>
                        </li>
                    `;
                });
                $strhtml += '</ul>';
                $list.html($strhtml);

                array_default = [];
                array = [];
                prev = null;
                next = null;

                $('.list li').each(function (index, element) {
                    array[index] = $(this);
                    array_default[index] = $(this);
                });
            })
        }
    });

    

    $('button').eq(0).on('click', function () {
        $.each(array_default, function (index, value) {
            $('.list ul').append(value);
        });
        return;
    });
    $('button').eq(1).on('click', function () {
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                prev = parseFloat(array[j].find('.price').html().substring(1));
                next = parseFloat(array[j + 1].find('.price').html().substring(1));
                if (prev > next) {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }
        $.each(array, function (index, value) {
            console.log(value);//n.fn.init [li, context: li]
            $('.list ul').append(value);
        });
    });
    $('button').eq(2).on('click', function () {
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                prev = parseFloat(array[j].find('.price').html().substring(1));
                next = parseFloat(array[j + 1].find('.price').html().substring(1));
                if (prev < next) {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }
      
        $.each(array, function (index, value) {
            console.log(value);
            $('.list ul').append(value);
        });
    })


}(jQuery);