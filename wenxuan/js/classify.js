window.onload = function () {
    var ktype = location.search.split('=')[1];
    var wares = document.querySelector('.y_wares')
    var pages = document.querySelector('.y_page')//下面页码大盒子
    // var  k_pagenum = document.querySelector('.k_pagenum')//下面页码盒子
    // var k_larrow=document.querySelector('.k_larrow')//下面页码左键
    // var k_rarrow=document.querySelector('.k_rarrow')//下面页码左键
    var arrorright = document.querySelector('.y_arrorright'); //右箭头
    var number = document.querySelector('.number');//上面的页码
    var arrorleft = document.querySelector('.y_arrorleft'); //左箭头
    var k_all = document.querySelector('.k_all'); //综合排序
    var k_price1 = document.querySelector('.k_price1'); //价格
    var k_discount1 = document.querySelector('.k_discount1'); //折扣
    var grid = document.querySelector('.grid') //获取网格按钮
    var entry = document.querySelector('.entry') //获取列表按钮
    var y_betop = document.querySelectorAll('.y_betop')
    var k_alltype = document.querySelector('.k_alltype')
    var k_subtype = document.querySelector('.k_subtype')
    var w_type = document.querySelector('#w_type')
    var w_subtype = document.querySelector('#w_subtype')
    var k_flag = true //控制是否有放大动效
    var num = 0 //控制翻页
    var kind = 'id' //控制以什么类型排序的
    var ware
    var y_pagenum//下面的页码
    var k_totalpage//总页码
    var numberd//总页码
    var url1
    var url2

    // 搜索框模糊搜索
    var ipt = document.getElementById('ipt')
    const k_booklist = document.querySelector('.k_booklist')
    const btn = document.getElementById('btn')
    ipt.oninput = function () {
        console.log(1111);
        k_booklist.innerHTML = ''
        iptval = ipt.value
        if (iptval.trim() != '') {
            fetch('http://localhost:3000/fuzzy?iptval=' + iptval, {
                method: "GET"
            }).then(response => {
                return response.json()
            }).then(res => {
                if (res.data != '') {
                    k_booklist.innerHTML = ''
                    k_booklist.style.display = 'block';
                    for (var i = 0; i < res.data.length; i++) {
                        k_booklist.innerHTML += `
                            <a href="javascript:;">
                            <span class='k_searchtitle' onclick="gettitle()" data-knum=${res.data[i].id}>${res.data[i].title}</span>
                            <span style="color: green;">约1条</span>
                            </a>
                        `
                    }
                    var iptitem = document.querySelectorAll('.k_searchtitle')
                    iptitem.forEach(val => {
                        val.onclick = function () {
                            ipt.value = val.innerHTML
                            console.log(val.dataset['knum']);
                            ipt.setAttribute('data-wnum', val.dataset['knum'])
                            k_booklist.innerHTML = ''
                        }
                    })

                } else {
                    k_booklist.style.display = 'none'
                }
            }).catch(error => {
                console.log(error)
            })
        } else {
            k_booklist.style.display = 'none'
        }
    }
    btn.onclick = function () {
        iptval = ipt.value
        if (iptval.trim() != '') {
            fetch('http://localhost:3000/fuzzy?iptval=' + iptval, {
                method: "GET"
            }).then(response => {
                return response.json()
            }).then(res => {
                if (res.data != '') {
                    location.href = `./detail.html?id=${ipt.dataset['wnum']}`
                } else {
                    alert('你输入的内容查询不到！')
                }
            }).catch(error => {
                console.log(error)
            })
        }
    }
    //点击上面的导航
    var w_item_content = document.querySelectorAll('.w_item_content a')
    console.log(w_item_content);
    w_item_content.forEach(val => {
        val.onclick = function () {
            ktype = val.innerHTML
            console.log(ktype);
            this.href = './classify.html?key=' + ktype
        }
    })
    if (ktype == '%E5%85%A8%E9%83%A8%E5%88%86%E7%B1%BB') {
        url1 = 'http://localhost:3000/alldetail?kind='
        url2 = 'http://localhost:3000/allcount'
    } else {
        url1 = 'http://localhost:3000/detail?ktype=' + ktype + '&kind='
        url2 = 'http://localhost:3000/count?ktype=' + ktype
    }
    console.log(ktype, url1, url2);

    //请求数据函数
    function getData(url) {
        wares.innerHTML = ''
        fetch(url).then(response => {
            return response.json()
        }).then(res => {
            for (var i = 0; i < res.data.length; i++) {
                wares.innerHTML += `
                    <a class="y_ware" style="overflow: hidden;" href='javascript:;' data-id=${res.data[i].id}>
                    <div class="cell" >
                        <img src="${res.data[i].imgurl}"
                            alt="">
                        <div class="y_script">
                            <p class="title">${res.data[i].title}</p>
                            <div class="y_price">
                                <span class="new_price y_left">￥${res.data[i].newprice}</span>
                                <span class="old_price y_right"><b class="oldtxt">定价：</b>￥${res.data[i].oldprice}</span>
                                <span class="k_discount">(${res.data[i].discount}折)</span>
                            </div>
                            <p class="k_author">${res.data[i].author} 著绘</p>
                            <b class="k_warestar"></b>
                            <p style="line-height: 20px;">出版社：${res.data[i].publish}</p>
                            <p style="line-height: 20px;">出版时间：${res.data[i].publish_time}</p>
                        </div>
                        <button class="k_joinbtn1"></button>
                        <button class="k_joinbtn2"></button>
                    </div>
                </a>
            `
            }
            ware = wares.querySelectorAll('.y_ware')
            for (var i = 0; i < ware.length; i++) {
                ware[i].onclick = function () {
                    var w_list_id = this.dataset['id'];
                    this.setAttribute('href', './detail.html?id=' + w_list_id)
                }
            }
            k_alltype.innerHTML = res.data[0].type//渲染分类文本
            k_subtype.innerHTML = res.data[0].sub_type//渲染分类文本
            w_type.innerHTML = `<li id="w_type" style="padding-left: 10px;">L &nbsp;&nbsp;${res.data[0].type}</li>`//渲染分类文本
            w_subtype.innerHTML = `<li id="w_subtype" style="padding-left: 10px;">L &nbsp;&nbsp;${res.data[0].sub_type}</li>`//渲染分类文本
            // 商品滑过放大
            if (k_flag) {
                for (var i = 0; i < ware.length; i++) {
                    ware[i].onmouseover = function () {
                        this.classList.add('current')
                        this.style.overflow = ''
                        this.style.height = "auto"
                    }
                    ware[i].onmouseout = function () {
                        this.classList.remove('current')
                        this.style.overflow = "hidden"
                        this.style.height = "285px"
                    }
                }
            }
        }).catch(err => {
            console.log(err);
        })


    }
    getData(url1 + kind + '&page=' + num)
    //动态生成页码
    function setBtn(url) {
        fetch(url).then(response => {
            return response.json()
        }).then(res => {
            console.log(res.data.length)
            for (var i = 0; i < res.data.length / 8; i++) {
                pages.innerHTML += `
                <li> <a href="javascript:;" class="y_pagenum">${i + 1}</a> </li>
                `
            }
            y_pagenum = document.querySelectorAll('.y_pagenum')
            y_pagenum[0].classList.add('select');
            k_totalpage = Math.ceil(res.data.length / 8)
            if (k_totalpage > 5) {
                k_totalpage = 5
            }
            number.innerHTML = `
                    <b class="numbered">1</b>/${k_totalpage}
            `
            numberd = document.querySelector('.numbered');


            //点击翻页进行切换
            for (var i = 0; i < y_pagenum.length; i++) {
                y_pagenum[i].onclick = function () {
                    numberd.innerHTML = this.innerHTML
                    num = (this.innerHTML - 1) * 8
                    for (var j = 0; j < y_pagenum.length; j++) {
                        y_pagenum[j].classList.remove('select')
                    }
                    this.classList.add('select')
                    getData(url1 + kind + '&page=' + num)
                }
            }

            //页数改变函数
            function pagechange() {
                num = (numberd.innerHTML - 1) * 8
                for (var j = 0; j < y_pagenum.length; j++) {
                    y_pagenum[j].classList.remove('select')
                }
                y_pagenum[numberd.innerHTML - 1].classList.add('select')
                getData(url1 + kind + '&page=' + num)
            }
            // 点击上面分页，关联下面的分页
            arrorright.onclick = function () {
                if (numberd.innerHTML >= k_totalpage) {

                    numberd.innerHTML = k_totalpage;
                    // num=48
                } else {
                    numberd.innerHTML++;
                    pagechange()
                }
            }
            arrorleft.onclick = function () {
                if (numberd.innerHTML <= 1) {
                    numberd.innerHTML = 1;
                } else {
                    numberd.innerHTML--;
                    pagechange()
                }
            }
        }).catch(err => {
            console.log(err);
        })
    }
    setBtn(url2)


    // 点击列表按钮，进行页面切换
    entry.onclick = function () {
        k_flag = false
        this.children[0].style.backgroundPosition = '-164px 0';
        grid.children[0].style.backgroundPosition = '-108px 0';
        wares.classList.add('y_listing');
        // getData('http://localhost:3000/detail?ktype=' + ktype + '&kind=' + kind + '&page=' + num)
        getData(url1 + kind + '&page=' + num)
    }


    //点击网格按钮，进行页面切换
    grid.onclick = function () {
        k_flag = true
        this.children[0].style.backgroundPosition = '-128px 0';
        entry.children[0].style.backgroundPosition = '-145px 0';
        wares.classList.remove('y_listing');
        // getData('http://localhost:3000/detail?ktype=' + ktype + '&kind=' + kind + '&page=' + num)
        getData(url1 + kind + '&page=' + num)
    }


    //排序函数
    function sort(url) {
        // kind = k
        // num = 0
        numberd.innerHTML = 1
        for (var j = 0; j < y_pagenum.length; j++) {
            y_pagenum[j].classList.remove('select')
        }
        y_pagenum[0].classList.add('select')
        y_betop.forEach(val => {
            val.style.color = '#666'
            val.children[0].style.backgroundPosition = '-34px 0'
        })
        getData(url)
    }

    //点击综合排序
    k_all.onclick = function () {
        kind = 'id'
        console.log(kind);

        sort(url1 + kind + '&page=0')
        this.style.color = '#db2a41'
    }
    //点击价格排序
    k_price1.onclick = function () {
        kind = "newprice"
        console.log(kind);

        sort(url1 + kind + '&page=0')
        k_all.style.color = '#666'
        this.style.color = 'red'
        this.children[0].style.backgroundPosition = '3px 0'
    }
    //点击折扣排序
    k_discount1.onclick = function () {
        kind = "discount"
        console.log(kind);
        sort(url1 + kind + '&page=0')
        k_all.style.color = '#666'
        this.style.color = 'red'
        this.children[0].style.backgroundPosition = '3px 0'
    }
}