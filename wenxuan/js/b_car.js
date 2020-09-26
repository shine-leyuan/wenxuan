window.onload = function () {
    const b_empty = document.querySelector('.b_car_empty')
    const b_table_list = document.querySelector('.b_car_table_list')
    const b_goods_list = document.querySelector('.b_goods_list')
    const b_car_num = document.querySelector('.b_car_num')
    const b_car_total_num = document.querySelector('.b_car_total_num')
    const b_car_price = document.querySelector('.b_car_price')
    console.log(b_goods_list);

    if (localStorage.getItem('admin') == null) {
        location.href = 'b_login.html'
    } else {
        function getData() {
            const b_admin = localStorage.getItem('admin')
            fetch('http://localhost:3000/car?admin=' + b_admin).then(response => {
                return response.json()
            }).then(res => {
                console.log(res);

                if (res.length != 0) {
                    console.log(res);

                    b_empty.style.display = 'none'            //购物车列表数量不为0时 隐藏 b_empty
                    b_table_list.style.display = 'block'


                    b_goods_list.innerHTML = ''
                    for (let i = 0; i < res.length; i++) {
                        // price_sum +=(res[i].price * res[i].number).toFixed(2)-0
                        // goods_num += res[i].number
                        b_goods_list.innerHTML += `
                        <li class="b_goods-item">
                            <div class="b_checkbox">
                                <input type="checkbox" class="b_car_ipt" data-i='${i}'>
                            </div>
                            <div class="b_product_item">
                            <a href="detail.html?id=${res[i].book_id}"><img src="${res[i].imgurl}" class="b_product_img"></a>
                                <p class="b_product_title"><a href="detail.html?id=${res[i].book_id}">${res[i].title}</a></p>
                            </div>
                            <div class="b_price"><span>¥${res[i].price}</span></div>
                            <div class="b_credits"><span>${res[i].price * 10}</span></div>
                            <div class="b_privilege"></div>
                            <div class="b_quantity">
                                <a href="#" class="b_car_less" data-j='${res[i].id}'></a>
                                <input type="text" class="b_car_price_ipt" value="${res[i].number}">
                                <a href="#" class="b_car_add" data-j='${res[i].id}'></a>
                            </div>
                            <div class="b_operation"><span class="b_operation_text" data-j='${res[i].id}'>删除</span></div>
                        </li>
                    `
                    }

                    //把所有的多选框变为选中状态
                    const checkall = document.querySelector('.checkall')
                    const b_car_ipt = document.querySelectorAll('.b_car_ipt')
                    checkall.checked = true
                    b_car_ipt.forEach(item => {
                        item.checked = true
                    })

                    checkall.onclick = function () {
                        b_car_ipt.forEach(item => {
                            item.checked = checkall.checked
                        })
                        getPrice()
                    }



                    // 当其中一个复选框被点击时 循环查看所有复选框的状态 如果有没被勾选的 则all不被勾选 如果都被选中了 则all也被选中
                    for (var i = 0; i < b_car_ipt.length; i++) {
                        b_car_ipt[i].addEventListener('click', function () {
                            var flag = true;

                            for (var j = 0; j < b_car_ipt.length; j++) {
                                if (!b_car_ipt[j].checked) {
                                    flag = false;
                                    break;
                                }
                            }

                            checkall.checked = flag
                        })

                    }


                    const b_car_price_ipt = document.querySelectorAll('.b_car_price_ipt')
                    //渲染价格数量
                    function getPrice() {
                        let price_sum = 0
                        let goods_num = 0
                        b_car_ipt.forEach((item, index) => {
                            if (item.checked == true) {
                                goods_num += b_car_price_ipt[index].value - 0
                                price_sum += (res[index].price * (b_car_price_ipt[index].value - 0)).toFixed(2) - 0
                            }
                        })

                        b_car_num.innerHTML = goods_num               //总计商品数量
                        b_car_total_num.innerHTML = price_sum         //总计费用
                        b_car_price.innerHTML = price_sum             //总计（不含运费）的费用
                        console.log(11111);
                        console.log(goods_num, price_sum);


                    }

                    getPrice()


                    //多选框逻辑判断及数据渲染
                    b_car_ipt.forEach((item, index) => {
                        // item.checked = true
                        item.onclick = () => {
                            getPrice()
                        }

                    })


                    //商品数量
                    const b_car_less = document.querySelectorAll('.b_car_less')
                    const b_car_add = document.querySelectorAll('.b_car_add')
                    const b_car_prompt = document.querySelector('.b_car_prompt')  //确认删除提示框
                    const b_car_cancel = document.querySelector('.b_car_cancel') //提示框的X
                    const b_confirm = document.querySelector('.b_confirm')    //提示框的确认按钮
                    const b_canel = document.querySelector('.b_canel')

                    //--按钮
                    b_car_less.forEach((item, index) => {
                        item.onclick = function () {
                            let j = item.getAttribute('data-j')
                            let ipt_num = b_car_price_ipt[index].value - 0
                            ipt_num -= 1
                            if (ipt_num <= 0) {
                                ipt_num = 1
                                b_car_prompt.style.display = 'block'
                                b_car_cancel.onclick = () => {
                                    b_car_prompt.style.display = 'none'
                                }
                                b_confirm.onclick = () => {
                                    fetch('http://localhost:3000/removecar?id=' + j).then(response => {
                                        return response.json()
                                    }).then(res => {
                                        console.log(res);
                                        getData()
                                        b_car_prompt.style.display = 'none'
                                    }).catch(err => {
                                        console.log(err);
                                    })
                                }
                                b_canel.onclick = () => {
                                    b_car_prompt.style.display = 'none'
                                }
                                b_car_price_ipt[index].value = ipt_num
                                getPrice()
                            } else {
                                fetch('http://localhost:3000/carless?num=' + ipt_num + '&id=' + j).then(response => {
                                    return response.json()
                                }).then(res => {
                                    console.log(res);

                                }).catch(err => {
                                    console.log(err);
                                })

                                b_car_price_ipt[index].value = ipt_num
                                console.log(222);

                                getPrice()
                            }

                        }
                    })

                    //++按钮
                    b_car_add.forEach((item, index) => {
                        item.onclick = () => {
                            let k = item.getAttribute('data-j')
                            let ipt_num = b_car_price_ipt[index].value - 0
                            ipt_num += 1
                            fetch('http://localhost:3000/carless?num=' + ipt_num + '&id=' + k).then(response => {
                                return response.json()
                            }).then(res => {
                                console.log(res);

                            }).catch(err => {
                                console.log(err);
                            })

                            b_car_price_ipt[index].value = ipt_num
                            getPrice()
                            console.log(22222);
                        }
                    })

                    //删除按钮
                    const b_operation_text = document.querySelectorAll('.b_operation_text')
                    b_operation_text.forEach(item => {
                        let j = item.getAttribute('data-j')
                        item.onclick = function () {
                            fetch('http://localhost:3000/removecar?id=' + j).then(response => {
                                return response.json()
                            }).then(res => {
                                console.log(res);
                                getData()
                            }).catch(err => {
                                console.log(err);
                            })
                        }

                    })


                    //结算
                    const b_settlement = document.querySelector('.b_settlement')
                    const b_car_prompt1 = document.querySelector('.b_car_prompt1')
                    const b_car_num1 = document.querySelector('.b_car_num1')
                    let num1 = 5

                    b_settlement.onclick = () => {                          //确定按钮被点击时清空数据库 5秒后跳转到主页
                        b_car_prompt1.style.display = 'block'
                        for (let i = 0; i < res.length; i++) {
                            fetch('http://localhost:3000/removecar?id=' + res[i].id).then(response => {
                                return response.json()
                            }).then(res => {
                                console.log(res);
                            }).catch(err => {
                                console.log(err);
                            })
                        }

                        var timer = setInterval(function () {
                            num1--
                            b_car_num1.innerHTML = num1
                            if (num1 == 0) {
                                clearInterval(timer)
                                b_car_prompt1.style.display = 'none'
                                location.href = './c_head.html'

                            }
                        }, 1000)
                    }
                } else {
                    b_table_list.style.display = 'none'
                    b_empty.style.display = 'block'
                }
            }).catch(err => {
                console.log(err);

            })
        }
        getData()

    }



}
