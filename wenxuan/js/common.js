// 首页搜索框下的导航栏的接口
var w_top_item = document.querySelectorAll('.w_top_item a');
var w_top_item2 = document.querySelectorAll('.w_top_item2 a')
var w_top_list = document.getElementById('w_top_list');
var w_top_list2 = document.getElementById('w_top_list2');
console.log(w_top_list2);

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

w_top_list2.onclick = function (e) {
    console.log(e);
    if (e.target.localName == 'a') {
        var w_top_index = e.target.dataset.h;
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