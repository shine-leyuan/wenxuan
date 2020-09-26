// const { format } = require("mysql");

var c_nav = document.getElementById("c_nav");//文轩网搜索栏
var c_top_1 = document.getElementById("c_top_1");//顶部栏
var c_key_b = document.getElementById("c_key_b");//热搜栏
var c_logo_3 = document.getElementById("c_logo_3");//购物车
var c_logo_2 = document.getElementById("c_logo_2");//搜索框
var ipt = document.getElementById("ipt");//input标签
var btn = document.getElementById("btn");//搜索按钮
var c_from = document.getElementById("c_from");//input的宽度
window.onscroll = function () {
    var win_top = document.documentElement.scrollTop;
    if (win_top > c_nav.clientHeight + c_top_1.clientHeight) {
        c_nav.classList.add("c_position_1");//给搜索栏加一个定位类名
        c_key_b.classList.add("block");//给搜索栏下面的div加类名隐藏
        c_logo_3.classList.add("block");//给购物车的div加类名隐藏
        ipt.style.cssText = "width:625px;border:4px solid #e4393c;";
        btn.style.cssText = "height:44px;line-height:44px;";
        c_from.classList.add("c_logo_2_1");
    } else if (win_top == 0) {
        c_nav.classList.remove("c_position_1");
        c_key_b.classList.remove("block");//给搜索栏下面的div加类名隐藏
        c_logo_3.classList.remove("block");//给购物车的div加类名隐藏
        ipt.style.cssText = "width:435px;border:2px solid #e4393c;";
        btn.style.cssText = "height:40px;line-height:40px;";
        c_from.classList.remove("c_logo_2_1");
    }
}

//点击上面的导航
var ktype ;
var w_item_content = document.querySelectorAll('.w_item_content a')
console.log(w_item_content);
w_item_content.forEach(val => {
    val.onclick = function () {
        ktype = val.innerHTML
        console.log(ktype);
        this.href = './classify.html?key=' + ktype
    }
})

// 手风琴开始
const w_mod_list = document.getElementsByClassName('w_mod_list');
const w_mod = document.getElementById('w_mod');
for (var i = 0; i < w_mod_list.length; i++) {
    w_mod_list[i].setAttribute('data-index', i);
}
w_mod.onmouseover = function (e) {
    if (e.target.localName == 'li') {
        var index = e.target.dataset['index'];
        for (var i = 0; i < w_mod_list.length; i++) {
            w_mod_list[i].classList.remove('active');
        }
        w_mod_list[index].classList.add('active');
    }
}
// 手风琴结束

// 秒杀栏start
const w_list = document.getElementById('w_list');
fetch('http://localhost:3000/w_index').then(response => {
    return response.json();
}).then(res => {
    let str = '';
    for (let k in res.data) {
        str += `
    <div class="w_item">
      <a href="#" class="w_item_href" data-ms=${res.data[k].id}>
          <img class='lazyload' data-src="${res.data[k].imgurl}" alt="" class="w_good">
          <p class="w_goods_title">${res.data[k].title}</p>
          <div class="w_price">
            <div class="w_new_price">秒杀价：￥${res.data[k].newprice}</div>
            <s class="w_old_price">${res.data[k].oldprice}</s>
          </div>
      </a>
    </div>         
    `
    }
    w_list.innerHTML += str;
    const w_item_href = document.getElementsByClassName('w_item_href');
    console.log(w_item_href);
    for (var i = 0; i < w_item_href.length; i++) {
        w_item_href[i].onclick = function () {
            var w_ms_id = this.dataset['ms'];
            location.href = './detail.html?id='+w_ms_id
        }

    }
}).catch(err => {
    console.log(err);
});





// 秒杀栏end

// 以下，每日精选和文轩聚焦、作家推荐模块的接口 start
function get(url, key) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
                console.log(key);
            } else if (xhr.readyState === 4 && xhr.status === 404) {
                reject()
            }
        }
        xhr.open('GET', url + (key == undefined ? '' : `?keyword=${key}`), true)
        xhr.send()
    })
}

var kid = document.querySelector('.js_good_1 .js_good_books');
var wenxue = document.querySelector('.js_good_2 .js_good_books');
var sheke = document.querySelector('.js_good_3 .js_good_books');
var hangye = document.querySelector('.js_good_4 .js_good_books');
var jiaocai = document.querySelector('.js_good_5 .js_good_books');
var shenghuo = document.querySelector('.js_good_6 .js_good_books');
var focusbook = document.querySelector('.js_focus .js_focus_books');
//分类获取精选数据方法
function getData1(key, el) {
    get('http://localhost:3000/js_index', key).then(res => {
        el.innerHTML = ''
        res.data.forEach(item => {
            el.innerHTML += `
        <div class="js_good_book">
                <a href="file:///C:/Users/Administrator/Desktop/index/detail.html?id=${item.id}">
                    <img class='lazyload' data-src="${item.imgurl}" alt="">
                </a>
                <a href="file:///C:/Users/Administrator/Desktop/index/detail.html?id=${item.id}">${item.title}</a>
                <div class="js_author">${item.author}</div>
                <div class="js_price">
                    <div class="js_new">￥${item.newprice}</div>
                    <div class="js_old">￥${item.oldprice}</div>
                </div>
            </div>
        `
        })
        console.log(res)
    }).catch(err => {
        console.log(err)

    })
}

getData1('童书育儿', kid);
getData1('文学小说', wenxue);
getData1('社科经管', sheke);
getData1('行业职业', hangye);
getData1('教材教辅', jiaocai);
getData1('生活艺术', shenghuo);
getData1('聚焦', focusbook);

//tab切换方法
function tabchange1(el, ctt, show) {
    el.forEach((item, index) => {
        item.onmouseover = function () {
            el.forEach(t => {
                t.classList.remove('js_tab_active')
            })
            ctt.forEach(a => {
                a.classList.remove(show)
            })
            item.classList.add('js_tab_active')
            ctt[index].classList.add(show)
        }
    })
}
// 精选tab切换
var tabs = document.querySelectorAll('.js_tabchange .js_tab');
var good_ctts = document.querySelectorAll('.js_good_ctt');
tabchange1(tabs, good_ctts, 'js_good_ctt_block');



// 获取作家推荐数据方法

function getData2(key, el) {
    get('http://localhost:3000/js_author', key).then(res => {
        // console.log(res);
        res.data.forEach((item, index) => {
            if (item.author_title == '东野圭吾') {

                el.innerHTML += `
            <div class="js_author_ctt js_author_ctt_block">
                <div class="js_author_up">
                    <a href="${item.author_title_url}">
                        <img  class='lazyload' data-src="${item.author_img}" alt="">
                        </a>
                        <div class="js_introduce">
                <div class="js_author_title"><a href="${item.author_title_url}">${item.author_title}</a></div>
                <div class="js_author_desc">${item.author_desc}</div>
            </div>
            </div>
            <div class="js_author_down" data-sss="${item.author_title}">
                ${item.dom}
        </div>
        </div>                            
            `;

            } else {
                el.innerHTML += `
            <div class="js_author_ctt">
                <div class="js_author_up">
                    <a href="${item.author_title_url}">
                        <img class='lazyload' data-src="${item.author_img}" alt="">
                        </a>
                        <div class="js_introduce">
                <div class="js_author_title"><a href="${item.author_title_url}">${item.author_title}</a></div>
                <div class="js_author_desc">${item.author_desc}</div>
            </div>
            </div>
            <div class="js_author_down" data-sss="${item.author_title}">
                ${item.dom}
        </div>
        </div>                            
            `
            }

        })
        //作家推荐tab切换
        var tabs2 = document.querySelectorAll('.js_tabchange2 .js_tab2');
        var author_ctts = document.querySelectorAll('.js_author_ctt');
        tabchange1(tabs2, author_ctts, 'js_author_ctt_block');
        js_author_down = document.querySelectorAll('.js_author_down');
    }).catch(err => {
        console.log(err)
    })
};

//获取作家推荐部分的数据
var js_author = document.querySelector('.js_author');
getData2('东野圭吾', js_author);
getData2('杨绛', js_author);
getData2('马尔克斯', js_author);
getData2('曹文轩', js_author);
getData2('毕淑敏', js_author);
getData2('刘同', js_author);
getData2('杨冰洋', js_author);

// 以下，每日精选和文轩聚焦、作家推荐模块的接口 end
const w_backTop = document.getElementById('w_backTop');
w_backTop.onclick = function () {
    window.scrollTo(0, 0)
}


// 首页倒计时
var distTime = 1000 * 60 * 60 * 3;
var w_timer = setInterval(function () {
    //判断是否到达时间期限
    if (distTime > 0) {
        var h = Math.floor(distTime / 1000 / 3600 % 24);
        h = h < 10 ? '0' + h : h;
        var m = Math.floor(distTime / 1000 / 60 % 60);
        m = m < 10 ? '0' + m : m;
        var s = Math.floor(distTime / 1000 % 60);
        s = s < 10 ? '0' + s : s;
        document.getElementById("w_hous").innerHTML = h;
        document.getElementById("w_min").innerHTML = m;
        document.getElementById("w_sec").innerHTML = s;
        distTime = distTime - 1000
    }
    else if (distTime == 0) {
        window.clearTimeout(w_timer);
    }
}, 1000)

// 回到顶部

window.onscroll = function () {
    var win_top = document.documentElement.scrollTop;
    if (win_top > 600) {
        w_backTop.style.display = 'block';

    } else {
        w_backTop.style.display = 'none';
    }
}

// 影像精品推荐tab切换方法
function tabchange(el, ctt, show) {
    el.forEach((item, index) => {
        item.onmouseover = function () {
            el.forEach(t => {
                t.classList.remove('c_item_block')
            })
            ctt.forEach(a => {
                a.classList.remove(show)
            })
            item.classList.add('c_item_block')
            ctt[index].classList.add(show)
        }
    })
}

// 首页底部tab切换
var tabs11 = document.querySelectorAll('.c_store_item');
var ctt11 = document.querySelectorAll('.c_store_cont');
tabchange(tabs11, ctt11, 'c_ctt_block');


// 首页侧菜单栏点击跳转到商品列表界面

var w_pass_father = document.getElementById('w_pass_father');
var w_pass = document.getElementsByClassName('w_pass');
w_pass_father.onclick = function (e) {
    if (e.target.localName == 'a') {
        var w_pass_num = e.target.dataset.i;
        var w_pass_txt = e.target.innerHTML;
        w_pass[w_pass_num].href = `./classify.html?key=${w_pass_txt}`;
    }
}

// 首页侧栏    文学 小说
var w_pass1_father = document.getElementById('w_pass1_father');
var w_pass1 = document.getElementsByClassName('w_pass1');
w_pass1_father.onclick = function (e) {
    if (e.target.localName == 'a') {
        var w_pass_num = e.target.dataset.i;
        var w_pass_txt = e.target.innerHTML;

        w_pass1[w_pass_num].href = `./classify.html?key=${w_pass_txt}`;
    }
}


// 首页侧栏    社科 经管
var w_pass2_father = document.getElementById('w_pass2_father');
var w_pass2 = document.getElementsByClassName('w_pass2');
w_pass2_father.onclick = function (e) {
    if (e.target.localName == 'a') {
        var w_pass_num = e.target.dataset.i;
        var w_pass_txt = e.target.innerHTML;

        w_pass2[w_pass_num].href = `./classify.html?key=${w_pass_txt}`;
    }
}

// 首页侧栏     行业 职业
var w_pass3_father = document.getElementById('w_pass3_father');
var w_pass3 = document.getElementsByClassName('w_pass3');
w_pass3_father.onclick = function (e) {
    if (e.target.localName == 'a') {
        var w_pass_num = e.target.dataset.i;
        var w_pass_txt = e.target.innerHTML;
        w_pass3[w_pass_num].href = `./classify.html?key=${w_pass_txt}`;
    }
}

// 首页侧栏     教材 教辅
var w_pass4_father = document.getElementById('w_pass4_father');
var w_pass4 = document.getElementsByClassName('w_pass4');
w_pass4_father.onclick = function (e) {
    if (e.target.localName == 'a') {
        var w_pass_num = e.target.dataset.i;
        var w_pass_txt = e.target.innerHTML;
        w_pass4[w_pass_num].href = `./classify.html?key=${w_pass_txt}`;
    }
}

// 首页侧栏     生活 艺术
var w_pass5_father = document.getElementById('w_pass5_father');
var w_pass5 = document.getElementsByClassName('w_pass5');
w_pass5_father.onclick = function (e) {
    if (e.target.localName == 'a') {
        var w_pass_num = e.target.dataset.i;
        var w_pass_txt = e.target.innerHTML;

        w_pass5[w_pass_num].href = `./classify.html?key=${w_pass_txt}`;
    }
}

// 首页侧栏    全部分类
var w_pass_all = document.getElementById('w_pass_all');
w_pass_all.onclick = function (e) {
    var w_pass_txt = w_pass_all.innerHTML;
    w_pass_all.href = `./classify.html?key=${w_pass_txt}`;
}

// 导航上的登录接口 start
const w_go = document.getElementById('w_go');
const w_sign = document.getElementById('w_sign');
const w_username = document.getElementById('w_username');
const w_quit = document.getElementById('w_quit');
const w_user_welcom = document.getElementById('w_user_welcom');
const w_count = document.getElementById('w_count');
window.onload = function () {
    if (localStorage.getItem('admin') == null) {
        w_go.style.display = 'block';
        w_sign.style.display = 'block';
        w_quit.style.display = 'none';
        w_username.style.display = 'none';
    } else {
        var w_user_txt = localStorage.getItem('admin')
        w_go.style.display = 'none';
        w_sign.style.display = 'none';
        w_quit.style.display = 'block';
        w_username.style.display = 'block';
        w_username.innerHTML = w_user_txt;
        w_user_welcom.innerHTML = '您好';
    }
    w_username.onclick = function () {
        w_username.href = './js_myWenxuan.html?admin=' + w_user_txt;
    }
    w_count.onclick = function () {
        w_count.href = './b_account.html?admin=' + w_user_txt;
    }
}



w_quit.onclick = function () {
    w_go.style.display = 'block';
    w_sign.style.display = 'block';
    w_quit.style.display = 'none';
    w_username.style.display = 'none';
    localStorage.removeItem('admin')
}

// 导航上的登录接口 end


// 影像精品推荐tab切换方法
function tabchange(el, ctt, show) {
    el.forEach((item, index) => {
        item.onmouseover = function () {
            el.forEach(t => {
                t.classList.remove('c_item_block')
            })
            ctt.forEach(a => {
                a.classList.remove(show)
            })
            item.classList.add('c_item_block')
            ctt[index].classList.add(show)
        }
    })
}

// 首页底部tab切换
var tabs11 = document.querySelectorAll('.c_store_item');
var ctt11 = document.querySelectorAll('.c_store_cont');
tabchange(tabs11, ctt11, 'c_ctt_block');

//搜索框模糊搜索
const k_booklist = document.querySelector('.k_booklist')
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

// 首页搜索框下的导航栏的接口
var w_top_item = document.querySelectorAll('.w_top_item a');
var w_top_list = document.getElementById('w_top_list');

w_top_list.onclick = function (e) {
    console.log(e);
    if (e.target.localName == 'a') {
        var w_top_index = e.target.dataset.x;
        console.log(w_top_index);
        var w_top_txt = '';
        if (w_top_index == 2) {
            w_top_txt = '童书育儿'
        } else if (w_top_index == 3) {
            w_top_txt = '文学小说'
        } else if (w_top_index == 4) {
            w_top_txt = '社科经管'
        } else if (w_top_index == 7) {
            w_top_txt = '教材教辅'
        } else if (w_top_index == 8) {
            w_top_txt = '生活艺术'
        } else if (w_top_index == 0) {
            w_top_txt = '全部'
        } else if (w_top_index == 1) {
            w_top_txt = '折扣'
        } else if (w_top_index == 5) {
            w_top_txt = '行业职业'
        } else if (w_top_index == 6) {
            w_top_txt = '行业职业'
        }
        console.log(w_top_txt);
        w_top_item[w_top_index].href = './z_top_detail.html?keys=' + w_top_txt;
    }
}
