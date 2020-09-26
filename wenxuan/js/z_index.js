
var a=document.querySelector('.w_top_w')
var b=document.querySelector('.c_head_content')
var c=document.querySelector('.w_top_menu2')
var z_backtop=document.querySelector('.z_backtop')
console.log(c_from);
window.onscroll = function () {
  var win_top = document.documentElement.scrollTop;
  if (win_top >a.clientHeight + b.clientHeight+c.clientHeight) {
    z_backtop.classList.add("block")
  } else{
    z_backtop.classList.remove("block")
  }
}
z_backtop.onclick=function(){
    window.scrollTo(0,0)  //让屏幕回到0,0位置
}

// 订单查询
const w_card = document.getElementById('w_card');
const w_psd = document.getElementById('w_psd');
const w_btn = document.getElementById('w_btn');
const w_info = document.getElementById('w_info');
w_btn.onclick = function(){
  if(w_card.value!=''&&w_psd.value!=''){
    w_info.innerHTML = '* 暂无数据'
  }else{
    w_info.innerHTML = '备注:点击可查询购书卡余额和消费明细'
  }
}
