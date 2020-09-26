const user=document.querySelector('.b_sign_username');
const psw=document.querySelector('.b_sign_password');
const sign_random=document.querySelector('.b_sign_random')
const random=document.querySelector('.random')
const sign_up=document.querySelector('.b_sign_up')

const user_err=document.querySelector('.b_sign_user_err')
const psw_err=document.querySelector('.b_sign_psw_err')
const ran_err=document.querySelector('.b_sign_ran_err')
const reg=/^[0-9a-zA-Z]\w{5,9}$/

let admin=[]
//获取数据库内的用户名
fetch('http://localhost:3000/user').then(response=>{
            return response.json()
        }).then(res=>{
            for(let j=0;j<res.data.length;j++){
                admin.push(res.data[j].admin)
            }
            console.log(admin);
        }).catch(err=>{
            console.log(err);
            
        })



//验证码初始化
let random1=''
function getRandom(){
    sign_random.innerHTML=''
    let randoms=''
    for(let i=0;i<4;i++){
       randoms+=Math.floor(Math.random()*10)
    }
    sign_random.innerHTML=randoms
    random1=sign_random.innerHTML
    console.log(random1);
}
getRandom()


//用户名 密码 验证码 输入框失去焦点时 判断 是否符合格式
user.onblur=function(){
    if(!reg.test(user.value)){
        user_err.innerHTML='用户名格式不正确'
        sign_up.style.background='#e5e5e5'
        sign_up.style.color='#a0a0a0'
    }else if(admin.indexOf(user.value)!=-1){
        user_err.innerHTML='用户名已注册'
        sign_up.style.background='#e5e5e5'
        sign_up.style.color='#a0a0a0'
    }else{
        user_err.innerHTML=''
    }
}
psw.onblur=function(){
    if(!reg.test(psw.value)){
        psw_err.innerHTML='密码格式不正确'
        sign_up.style.background='#e5e5e5'
        sign_up.style.color='#a0a0a0'
    }else{
        psw_err.innerHTML=''
    }
}
random.onblur=function(){
    if(random.value!=random1){
        ran_err.innerHTML='验证码不正确'
    }else{
        ran_err.innerHTML=''
    }
}
random.oninput=function(){
    if(user.value!=''&&psw.value!=''){
        sign_up.style.background='#e4393c'
        sign_up.style.color='#ffffff'
    }else{
        sign_up.style.background='#e5e5e5'
        sign_up.style.color='#a0a0a0'
    }
}

//点击注册按钮时 判断
sign_up.onclick = function () {
    
    if (reg.test(user.value) && reg.test(psw.value) && random.value == random1) {
        if (admin.indexOf(user.value) != -1) {
            user_err.innerHTML='用户名已注册'
        }else{
            fetch('http://localhost:3000/adduser?admin=' + user.value + '&&psw=' + psw.value).then(response => {
                return response.json()
            }).then(res => {
                console.log(res);

                window.location.href='b_login.html'

            }).catch(err => {
                console.log(err);

            })

        }
    }


}

