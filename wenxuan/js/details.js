// const { response } = require("express");
window.onload = function () {
    var w_id = location.search.split('=')[1];
    //图书信息数据渲染
    var news = document.querySelector('.y_news');
    fetch('http://localhost:3000/ydetail?id=' + w_id).then(response => {
        return response.json();
    }).then(res => {
        console.log(res.data);
        news.innerHTML = `
                    <div class="y_title">
                        <h1>${res.data[0].title}</h1>
                        <p>${res.data[0].desc}</p>
                    </div>
                    <!-- 图书详情 -->
                    <div class="y_attr">
                        <dl class="y_price">
                            <dt>定　　价 ：</dt>
                            <dd class="y_oldPrice">￥${res.data[0].newprice}</dd>
                        </dl>
                        <dl class="y_sellling">
                            <dt>文 轩 价 ：</dt>
                            <dd><strong>￥${res.data[0].oldprice}</strong> <span>（${res.data[0].discount}折）</span></dd>
                        </dl>
                        <dl class="y_gps">
                            <dt>配 送 至 ：</dt>
                            <dd><input type="text" class="address" placeholder="中国四川省成都市"> <span>现在有货</span><br><b>文轩网 <span>正版图书音像</span> ，为您快捷发货</b>
                                <a href="javascript:;">（配送详情）</a>
                            </dd>
                        </dl>
                        <dl class="y_author">
                            <dt>作　　者 ：</dt>
                            <dd><a href="javascript:;">${res.data[0].author}</a></dd>
                        </dl>
                        <dl class="y_class">
                            <dt>所属分类 ：</dt>
                            <dd><a href="javascript:;">图书</a><span>></span><a href="javascript:;">${res.data[0].type}</a><span>></span><a href="javascript:;">${res.data[0].sub_type}</a> </dd>
                        </dl>
                        <dl class="y_class ">
                            <dt>促销活动 ：</dt>
                            <dd class="y_page">❤【文轩秒杀】0903 <br>❤老客户回馈，积分换礼券，购书更实惠<br>❤大陆非新疆西藏地区包邮，新疆西藏运费每单20元 <a href="javascript:;">详情>></a> </dd>
                        </dl>
                        <dl class="y_number">
                            <dt>购买数量 ：</dt>
                            <dd><a href="javascript:;" class="y_remov">-</a><input type="text" value="1" class="y_number_txt"><a href="javascript:;" class="y_add">+</a>&nbsp;&nbsp;件</dd>
                        </dl>
                        <dl class="y_purchase">
                            <dd>
                                <a href="javascript:;" class="tipsa"></a>
                            </dd>
                        </dl>
                        <dl class="y_service">
                            <dt>服务 ：</dt>
                            <dd><span>由"文轩网"直接销售和发货，并提供售后服务</span><br>
                                <a href="javascript:;">正品低价</a><span class="cut">|</span><a href="javascript:;">闪电发货</a><span class="cut">|</span><a href="javascript:;">货到付款</a><span class="cut">|</span><a href="javascript:;">高效退换货</a>
                            </dd>
                        </dl>
                    </div>
                `
        // 放大镜图片渲染
        var imgs = document.querySelector('.y_wrap_imgs');
        imgs.innerHTML = `
                <div class="y_img">
                <div class="y_wrap_box"></div>
                <div class="y_tag"></div>
                <img src="${res.data[0].imgurl}" width='350px'>
                </div>
                <div class="y_img y_bigimg">
                    <img src="${res.data[0].imgurl}" width='600px'>
                </div>
                `
        //第二个价格渲染
        var y_head_r = document.querySelector('.y_head_r ');
        y_head_r.innerHTML = `
                    <strong>￥${res.data[0].newprice}</strong> <span>（${res.data[0].discount}折）</span>
                    <a href="javascript:;" class="y_right spirit"></a>
                `
        //作者出版社渲染
        var y_content_author = document.querySelector('.y_content_author');
        y_content_author.innerHTML = `
                    <span>作者:</span><a href="javascript:;" class="select">${res.data[0].author}</a>
                    `
        var y_content_press = document.querySelector('.y_content_press');
        y_content_press.innerHTML = `
                    <span>出版社:</span><a href="javascript:;" class="select">${res.data[0].publish}</a>
                    `
        // 详情图片的渲染
        var mainimg = document.querySelector('.y_navBnner');
        mainimg.innerHTML = `
         <img src="${res.data[0].descimgurl}" alt="">
        `
        // 目录渲染
        var y_bottom = document.querySelector('.y_bottom');
        y_bottom.innerHTML = `
            ${res.data[0].directory}
            <a href="###" class="y_hiden_all">隐藏全部>></a>
        `
        //作者简介等
        var y_author = document.querySelector('#author .y_bottom'); //作者简介
        var y_editing = document.querySelector('#editing .y_bottom'); //主编推荐
        var y_synopsis = document.querySelector('#synopsis .y_bottom'); //内容简介
        y_author.innerHTML = `
            ${res.data[0].aboutauthor}
        `
        y_editing.innerHTML = `
            ${res.data[0].recommend}
        `
        y_synopsis.innerHTML = `
            ${res.data[0].contentabstract}
        `
        var add = document.getElementsByClassName('y_add')[0];
        var remo = document.getElementsByClassName('y_remov')[0];
        var num = document.getElementsByClassName('y_number_txt')[0];
        // 点击+号增加数量
        add.onclick = function () {
            num.value++
        }
        // 点击-号减少数量
        remo.onclick = function () {
            if (num.value <= 0) {
                num.value == 0;
            } else {
                num.value--
            }
        }
        // 放大镜特效
        var simg = document.querySelector('.y_img'); //小图片
        var shade = document.querySelector('.y_wrap_box'); //遮罩
        var bimg = document.querySelector('.y_bigimg img'); //大图片
        var bimgs = document.querySelector('.y_bigimg'); //大图片
        var wrap = document.querySelector('.y_wrap'); //大图片框
        simg.addEventListener('mouseover', function () {
            shade.style.display = 'block';
            bimgs.style.display = 'block';
        })
        simg.addEventListener('mousemove', function (e) {

            var x = e.clientX - wrap.offsetLeft - shade.offsetWidth / 2;
            if (x < 0) {
                x = 0;
            } else if (x > simg.offsetWidth - shade.offsetWidth) {
                x = simg.offsetWidth - shade.offsetWidth;
            }
            var y = e.clientY - wrap.offsetTop - shade.offsetHeight / 2;
            if (y < 0) {
                y = 0;
            } else if (y > simg.offsetHeight - shade.offsetHeight) {
                y = simg.offsetHeight - shade.offsetHeight;
            }
            shade.style.left = '' + x + 'px';
            shade.style.top = '' + y + 'px';
            beliel = bimg.offsetWidth / simg.offsetWidth;
            // console.log(beliel)  比列1.24
            bimg.style.transform = 'translate(' + -x * beliel + 'px,' + -y * beliel + 'px)';
        })
        simg.addEventListener('mouseout', function () {
            shade.style.display = 'none';
            bimgs.style.display = 'none';
        })


        // 点击商品介绍和评论切换
        var navs = document.querySelector(' .y_head_n');
        navs.addEventListener('click', function (e) {
            if (e.target.localName == 'a') {
                for (var i = 0; i < navs.children.length; i++) {
                    navs.children[i].className = '';
                }
                e.target.className = 'select';
            }
        })
        //显示部分目录点击显示全部目录显示完整
        var catalog = document.querySelector('#catalog .y_bottom');
        if (catalog.offsetHeight > 180) {
            catalog.classList.add('y_bottoms');
        }
        //点击显示全部，显示所有
        var catashow = document.getElementsByClassName('y_show_all')[0];
        catashow.addEventListener('click', function () {
            catalog.classList.remove('y_bottoms');
            catashow.style.display = 'none';
        })
        //点击隐藏全部，还原
        var catahiden = document.getElementsByClassName('y_hiden_all')[0];
        catahiden.addEventListener('click', function () {
            catalog.classList.add('y_bottoms');
            catashow.style.display = 'block';

        })
        // 点击购物车按钮，加入购物车提示
        var tips = document.querySelector('.tips');
        var tipsa = document.querySelector('.tipsa');


        tipsa.addEventListener('click', function () {
            tips.style.display = 'block';
            if (localStorage.getItem('admin') == null) {
                location.href = 'b_login.html'
            } else {
                const b_admin = localStorage.getItem('admin')
                const b_book_ids = []
                const b_book_nums = []
                fetch('http://localhost:3000/car?admin=' + b_admin).then(response => {     //获取购物车内的id和对应的数量
                    return response.json();
                }).then(res => {
                    console.log(res);
                    for (var i = 0; i < res.length; i++) {
                        b_book_ids.push(res[i].book_id)
                        b_book_nums.push(res[i].number)
                    }
                    console.log(b_book_ids);
                    console.log(b_book_nums);

                    //加入购物车
                    const b_title = document.querySelector('.y_news .y_title h1') //获取title
                    const b_price = document.querySelector('.y_attr .y_sellling strong').innerHTML.split('￥')[1] - 0 //获取价格
                    const b_num = document.querySelector('.y_number_txt').value - 0         //获取数量
                    const b_img = document.querySelector('.y_img img')                    //获取img
                    const b_book_id = location.search.split('=')[1] - 0

                    //获取id
                    if (b_book_ids.indexOf(b_book_id) != -1) {
                        const b_index = b_book_ids.indexOf(b_book_id)
                        const b_nums = b_book_nums[b_index] + b_num
                        console.log(b_nums);

                        fetch('http://localhost:3000/updatecar?num=' + b_nums + '&id=' + b_book_id).then(response => {
                            return response.json();
                        }).then(res => {
                            console.log(res);
                            console.log(121212);

                        }).catch(err => {
                            console.log(err);
                        })
                    } else {
                        fetch('http://localhost:3000/addcar?title=' + b_title.innerHTML + '&price=' + b_price + '&num=' + b_num + '&imgurl=' + b_img.src + '&book_id=' + b_book_id + '&admin=' + b_admin).then(response => {
                            return response.json();
                        }).then(res => {
                            console.log(res);
                        }).catch(err => {
                            console.log(err);

                        })

                    }
                }).catch(err => {
                    console.log(err);

                })
            }
        })


        var close = document.querySelector('.close');
        close.addEventListener('click', function () {
            tips.style.display = 'none';
        })
        var purchase = document.querySelector('.tip_purchase');
        purchase.addEventListener('click', function () {
            tips.style.display = 'none';
        })
        //点击返回顶部显示和隐藏
        var top = document.getElementsByClassName('top')[0];
        window.onscroll = function () {
            // console.log(document.documentElement.scrollTop);
            if (document.documentElement.scrollTop >= 600) {
                top.style.display = 'block';
            } else {
                top.style.display = 'none';

            }
        }
        // 点击加入收藏显示和隐藏
        var collect = document.getElementsByClassName('y_collect')[0]; //加入收藏按钮
        var collection = document.getElementsByClassName('y_collection')[0];
        var cancel = document.getElementsByClassName('y_colle_cancel')[0];
        collect.onclick = function () {
            collection.style.display = 'block';
        }
        cancel.onclick = function () {
            collection.style.display = 'none';
        }

    }).catch(err => {
        console.log(err);
    })

    //星星的显示
    var k_stardesc = ['很差', '较差', '还行', '推荐', '力荐']
    var k_mystar = document.querySelector('.k_mystar')
    var k_mystar_item = k_mystar.querySelectorAll('span')
    var k_desc = k_mystar.querySelector('i')
    k_mystar_item.forEach((val, index) => {
        val.setAttribute('data-i', index)
        val.onmouseover = function () { //鼠标进入某个星星时
            val.style.backgroundPositionX = '-190px'
            k_desc.innerHTML = k_stardesc[index]
            var num = index
            k_mystar_item.forEach((val, index) => {
                if (index > num) {
                    val.style.backgroundPositionX = '-217px'
                }
            })
        }
    })
    k_mystar.onmouseout = function () { //鼠标离开时恢复原样
        k_mystar_item.forEach(val => {
            val.style.backgroundPositionX = '-190px'
            k_desc.innerHTML = ''
        })
    }
    //评论的tab切换
    var k_discuss_type_top = document.querySelector('.k_discuss_type_top')
    var k_type_content = document.querySelector('.k_type_content')
    k_discuss_type_top.onmouseover = function (e) {
        if (e.target.localName == 'span') {
            var k_tab_item = this.querySelectorAll('.k_tab_item')
            var k_type_item = k_type_content.querySelectorAll('p')
            k_tab_item.forEach((val, index) => {
                val.setAttribute('data-i', index)
                val.classList.remove('k_added')
            })
            k_type_item.forEach((val, index) => {
                val.setAttribute('data-i', index)
                val.style.display = 'none'
            })
            e.target.classList.add('k_added')
            k_type_item[e.target.dataset.i].style.display = 'block'
        }
    }

}

