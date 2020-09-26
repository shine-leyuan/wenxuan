const { query } = require('express')
const express = require('express')    // 使用commonjs全局引入express
// const request = require('request')
const app = express()
const port = 3000   // 设置端口号
const mysql = require('mysql')
const superagent = require('superagent')
//跨域处理
app.all("/*", function (req, res, next) {
  // 跨域处理
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Content-Type", "application/json;charset=utf-8");
  next()
})

// 聊天机器人
app.get('/ai', (req, res) => {
  let url = 'http://api.qingyunke.com/api.php'
  getdata(url, req.query).then(result => {
    res.send(result)
  }).catch(err => {
    res.send(err)
  })
})

function getdata(url, params) {
  return new Promise((resolve, reject) => {
    superagent.get(url)
      .query(params)
      .end((err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result.text)
        }
      })
  })
}

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'wenxuan'
})

connection.connect()

// 首页秒杀栏接口 wpz
app.get('/w_index', (req, res) => {
  console.log(11111, req.query.id)  // 可以获取到前端传递的参数值   get请求
  // console.log(req.body.id)   // 可以获取到前端传递的参数值    post请求
  connection.query('select * from total limit 9', (err, result) => {
    const obj = {
      status: 200,
      data: result
    }
    res.json(obj)
    console.log(obj);

  })
});

// // 首页每日精选栏 js
// app.get('/js_index', (req, res) => {
//   connection.query(`select * from book where class='${req.query.keyword}';`, (err, result) => {
//     const obj = {
//       status: 200,
//       data: result
//     }
//     res.json(obj)
//   })
// })

// 首页每日精选栏 js
app.get('/js_index', (req, res) => {
  connection.query(`select * from total where type='${req.query.keyword}' limit 0,15;`, (err, result) => {
    const obj = {
      status: 200,
      data: result
    }
    res.json(obj)
  })
})

// 首页作者推荐 js
app.get('/js_index2', (req, res) => {
  connection.query(`select * from total where author='${req.query.keyword}';`, (err, result) => {
    const obj = {
      status: 200,
      data: result
    }
    res.json(obj)
  })
})

// 首页文轩聚焦栏接口 js
app.get('/js_author', (req, res) => {
  connection.query(`select * from author_tuijian where author_title='${req.query.keyword}';`, (err, result) => {
    const obj = {
      status: 200,
      data: result
    }
    res.json(obj)
  })
})

//banner下的跳转页 kq
app.get('/k_index', (req, res) => {
  connection.query(`select * from total where sub_type=${req.query.types} limit 10`, function (err, result) {
    const obj = {
      status: 200,
      data: result
    }
    res.json(obj)
  })
});

// 查询所有记住密码的用户
app.get('/remadmin', (req, res) => {
  connection.query('select * from b_user where rem=1 order by date desc', function (err, result) {
    const obj = {
      status: 200,
      data: result
    }
    res.json(obj)

  })
});


// 查询所有用户
app.get('/user', (req, res) => {
  connection.query('select * from b_user', function (err, result) {
    const obj = {
      status: 200,
      data: result
    }
    res.json(obj)

  })
});

// 添加用户名密码
app.get('/adduser', (req, res) => {
  connection.query('insert into b_user (admin,password) values ("' + req.query.admin + '","' + req.query.psw + '")', function (err, result) {
    const obj = {
      status: 200
    }
    res.json(obj)
  })
});

// 记住用户名密码
app.get('/remuser', (req, res) => {
  connection.query('update b_user set rem=' + req.query.rem + ',date=' + req.query.date + '  where id=' + req.query.id, function (err, result) {
    const obj = {
      status: 200
    }
    res.json(obj)
  })
});
// 不记住用户名密码
app.get('/noremuser', (req, res) => {
  connection.query('update b_user set rem=' + req.query.rem + ',date=' + req.query.date + '  where id=' + req.query.id, function (err, result) {
    const obj = {
      status: 200
    }
    res.json(obj)
  })
});

// 修改用户名密码
app.get('/updatePsw', (req, res) => {
  connection.query('update b_user set password="' + req.query.psw + '",rem=0  where id=' + req.query.id, function (err, result) {
    const obj = {
      status: '修改成功'
    }
    res.json(obj)
  })
});
// 收藏
app.get('/js_collection', (req, res) => {
  connection.query(`select * from book where collection='yes' limit 0,4;`, (err, result) => {
    const obj = {
      status: 200,
      data: result
    }
    res.json(obj)
  })
})

// app.get('/detail', (req, res) => {
//   connection.query(`select * from total where sub_type='${req.query.ktype}' order by ${req.query.kind} asc limit ${req.query.page} ,8;`, function (err, result) {
//     const obj = {
//       status: '连接成功',
//       data: result
//     }
//     res.json(obj)
//   })
// })

// 首页侧栏  点击全部分类时的接口
app.get('/alldetail', (req, res) => {
  connection.query(`select * from total order by ${req.query.kind} asc limit ${req.query.page} ,8;`, (err, result) => {
    const obj = {
      status: 200,
      data: result
    }
    res.json(obj);
  })
})
//详情页数据渲染
app.get('/detail', (req, res) => {
  connection.query(`select * from total where sub_type='${req.query.ktype}' order by ${req.query.kind} asc limit ${req.query.page} ,8;`, function (err, result) {
    const obj = {
      status: '连接成功',
      data: result
    }
    res.json(obj)
  })
})

//获取数据长度，动态生成页码
app.get('/count', (req, res) => {
  connection.query(`select * from total where sub_type='${req.query.ktype}'`, function (err, result) {
    const obj = {
      status: 200,
      data: result
    }
    res.json(obj)
  })
})
//获取全部的数据长度，动态生成页码
app.get('/allcount', (req, res) => {
  connection.query(`select * from total`, function (err, result) {
    const obj = {
      status: 200,
      data: result
    }
    res.json(obj)
  })
})

// 首页侧栏 的接口
app.get('/w_passed', (req, res) => {
  connection.query(`select * from total where sub_type='${req.query.key}'`, (err, result) => {
    const obj = {
      status: 200,
      data: result
    }
    res.json(obj);
  })
})

// 首页侧栏  点击全部分类时的接口
app.get('/w_passed_all', (req, res) => {
  connection.query(`select * from total`, (err, result) => {
    const obj = {
      status: 200,
      data: result
    }
    res.json(obj);
  })
})

// 模糊搜索接口
app.get('/fuzzy', (req, res) => {
  connection.query("select * from total where title like '%" + req.query.iptval + "%';", function (err, result) {
    const obj = {
      status: 200,
      data: result
    }
    res.json(obj)
  })
});

app.get('/w_top_menu', (req, res) => {
  connection.query(`select * from total where type = '${req.query.txt}';`, function (err, result) {
    const obj = {
      status: 200,
      data: result
    }
    res.json(obj)
  })
});

//首页菜单栏下的 除 全部  热销 之外的  接口
app.get('/z_index', (req, res) => {
  connection.query(`select * from total where type = '${req.query.keys}'`, function (err, result) {
    const obj = {
      status: 200,
      data: result
    }
    res.json(obj)
  })
}) //创建了一个路由接口

// 首页菜单栏 下的 全部  接口
app.get('/z_all', (req, res) => {
  connection.query(`select * from total limit 80`, function (err, result) {
    const obj = {
      status: 200,
      data: result
    }
    res.json(obj)
  })
}) //创建了一个路由接口

// 首页菜单栏 下的 新书热销榜接口
app.get('/z_discount', (req, res) => {
  connection.query(`select * from total order by discount limit 80`, function (err, result) {
    const obj = {
      status: 200,
      data: result
    }
    res.json(obj)
  })
}) //创建了一个路由接口


// 加入收藏
app.get('/w_join_col', (req, res) => {
  connection.query(`update total set collect=1 where id= ${req.query.id}`, function (err, result) {
    const obj = {
      status: '连接成功',
      data: result
    }
    res.json(obj)
  })
})

// 收藏页面拿数据
app.get('/z_show', (req, res) => {
  connection.query(`select * from total where collect=1`, function (err, result) {
    const obj = {
      status: '连接成功',
      data: result
    }
    res.json(obj)
  })
})

// 收藏页面删数据  
app.get('/w_del_col', (req, res) => {
  connection.query(`update total set collect=0 where id= ${req.query.txts}`, function (err, result) {
    const obj = {
      status: '连接成功',
      data: result
    }
    res.json(obj)
  })
})

//点击详情页数据渲染
app.get('/ydetail', (req, res) => {
  connection.query('select * from total where id=' + req.query.id, function (err, result) {
    const obj = {
      status: '连接成功',
      data: result
    }
    res.json(obj)
  })
})

app.get('/car', (req, res) => {
  connection.query(`select * from b_car where admin='${req.query.admin}'`, function (err, result) {
    // const obj={
    // status: 200,
    // data: result
    // }
    // res.json(obj)
    res.json(result)
  })
});  // 创建了一个路由接口

// 添加购物车
app.get('/addcar', (req, res) => {
  connection.query(`insert into b_car (title,price,number,imgurl,book_id,admin) values ('${req.query.title}',${req.query.price},${req.query.num}, '${req.query.imgurl}' ,${req.query.book_id},'${req.query.admin}')`, function (err, result) {
    const obj = {
      status: 200
    }
    res.json(obj)
  })
});

// 更新购物车
app.get('/updatecar', (req, res) => {
  connection.query(`update b_car set number=${req.query.num} where book_id=${req.query.id}`, function (err, result) {
    const obj = {
      status: 200
    }
    res.json(obj)
  })
});
//删除购物车
app.get('/removecar', (req, res) => {
  connection.query('delete from b_car where id=' + req.query.id, function (err, result) {
    res.json(result)
  })
});
//减少购物车
app.get('/carless', (req, res) => {
  connection.query('update b_car set number=' + req.query.num + ' where id=' + req.query.id, function (err, result) {
    res.json(result)
  })
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))   // 监听端口