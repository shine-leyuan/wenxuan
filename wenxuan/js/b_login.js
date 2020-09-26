
const user = document.querySelector('.ipt-user');
const psw = document.querySelector('.ipt-psw');
const rem = document.querySelector('.rem-psw')
const sign_in = document.querySelector('.login-btn')
const show_psw = document.querySelector('.show-psw')
const login_err = document.querySelector('.login-err')

let remAdmin = [];
let remPassword = []
let admin = []
let password = []
let id = []

//获取数据库内的用户名
fetch('http://localhost:3000/remadmin').then(response => {
    return response.json()
}).then(res => {

    if (res.data != '') {
        //如果有数据就把数据放进remAdmin和remPassword里面 然后把第一个数据渲染进输入框内 并勾选上记住密码
        for (let i = 0; i < res.data.length; i++) {
            remAdmin.push(res.data[i].admin)
            remPassword.push(res.data[i].password)
        }

        user.value = remAdmin[0]
        psw.value = remPassword[0]
        rem.checked = true
        sign_in.style.background = '#e4393c'
        sign_in.style.color = '#ffffff'
    }


}).catch(err => {
    console.log(err);

})




//获取数据库内的用户
fetch('http://localhost:3000/user').then(response => {
    return response.json()
}).then(res => {
    for (let j = 0; j < res.data.length; j++) {
        admin.push(res.data[j].admin)
        password.push(res.data[j].password)
        id.push(res.data[j].id)

    }
    console.log(admin, password, id);
}).catch(err => {
    console.log(err);

})

user.oninput = function () {
    psw.value = ''
    rem.checked = false
}



//当用户输入完密码时判断
psw.onblur = function () {
    if (psw.value != '' && user.value != '') {
        sign_in.style.background = '#e4393c'
        sign_in.style.color = '#ffffff'
    }
}

//点击注册按钮时 判断
sign_in.onclick = function () {
    if (admin.indexOf(user.value) != -1) {
        let index = admin.indexOf(user.value)
        if (password[index] === psw.value) {
            if (rem.checked == true) {
                const date = new Date()
                console.log(date);
                const date1 = date.getTime();
                console.log(date1);
                fetch('http://localhost:3000/remuser?rem=1&&date=' + date1 + '&&id=' + id[index]).then(response => {
                    return response.json()
                }).then(res => {
                    console.log(res);
                    localStorage.setItem('admin',admin[index])
                    location.href = 'c_head.html?';
                }).catch(err => {
                    console.log(err);
                })
            } else {
                fetch('http://localhost:3000/noremuser?rem=0&&date=""&&id=' + id[index]).then(response => {
                    return response.json()
                }).then(res => {
                    console.log(res);
                    localStorage.setItem('admin',admin[index])
                    location.href = 'c_head.html?';
                }).catch(err => {
                    console.log(err);
                })
            }
            console.log(admin[index]);
        }
    }


}

//密码框内容显示与隐藏
let flag1 = 0
show_psw.onclick = function () {
    if (flag1 == 0) {
        psw.type = 'text';
        show_psw.classList.remove('icon-bukejian')
        show_psw.classList.add('icon-xianshikejian')
        flag1 = 1;
    } else {
        psw.type = 'password';
        show_psw.classList.remove('icon-xianshikejian')
        show_psw.classList.add('icon-bukejian')
        flag1 = 0;
    }

}