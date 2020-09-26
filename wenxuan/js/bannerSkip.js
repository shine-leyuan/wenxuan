window.onload = function () {
  const k_list1 = document.querySelector('.k_list1')
  const k_list2 = document.querySelector('.k_list2')
  const k_list3 = document.querySelector('.k_list3')
  const k_list4 = document.querySelector('.k_list4')
  function getData(url, ele) {
    fetch(url).then(response => {
      return response.json()
    }).then(res => {
      for (var i = 0; i < res.data.length; i++) {
        ele.innerHTML += `
        <li class="k_content_item" data-id=${res.data[i].id}>
            <a href="javascript:;" class="k_img_title">
              <img class='lazyload' data-src="${res.data[i].imgurl}" alt="">
              <h4>${res.data[i].title}</h4>
            </a>
            <div class="k_price">
              ￥
              <span class="k_now_price">${res.data[i].newprice}</span>
              <del class="k_old_price">￥${res.data[i].oldprice}</del>
            </div>
            <a href="javascript:;" class="k_buy">立即购买</a>
          </li>
        `
      }
      const k_content_item = document.querySelectorAll('.k_content_item');

      for (var i = 0; i < k_content_item.length; i++) {
        k_content_item[i].addEventListener('click', function () {
          var detailid=this.dataset['id'];
          window.location.href=`./detail.html?id=${detailid}`
        })
      }
    }).catch(error => {
      console.log(error)
    })
  }

  getData(`http://localhost:3000/k_index?types='趣味童书'`, k_list1);
  getData(`http://localhost:3000/k_index?types='外国文学'`, k_list2)
  getData(`http://localhost:3000/k_index?types='国学'`, k_list3)
  getData(`http://localhost:3000/k_index?types='国学启蒙'`, k_list4)
}

