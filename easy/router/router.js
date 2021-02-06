const express = require('express');
const pool = require('../pool.js');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const r = express.Router();
r.use(cookieParser());
//配置express-session
r.use(session({
    name:'shoesmall',//返回客户端key的名称，默认是connect.sid
    secret:'123456',//服务器端生成session的签名
    cookie:{maxAge:600000},//设置返回给前端的key的属性
    resave:false,//不强制保存session即使它没有变化
    saveUninitialized:true//强制将(新建时)未初始化的session存储
}));
//============================ 关于商品的接口 ===================================
/* 1.1
* 请求所有商品列表
* 接口地址:http://localhost:5050/product/getall
* */
r.get('/product/getall',(req,res)=>{
    let sql = 'SELECT * FROM product';
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.json(result);
    })
});
/* 1.2
* 根据商品名称查找商品(默认顺序/综合排序)
* 接口地址:http://localhost:5050/product/search
* */
r.get('/product/search',(req,res)=>{
    let obj = req.query;
    console.log(obj);
    if(!obj.pname){
        res.json({code:121,msg:'请输入商品名!'});
        return ;
    }
    let sql = "SELECT * FROM product WHERE name LIKE '%"+(obj.pname)+"%'";
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.json(result);
    });
});
/* 1.3
* 随机返回5件商品
* 接口地址:http://localhost:5050/product/random
* */
r.get('/product/random',(req,res)=>{
    let sql = "SELECT * FROM product WHERE uid >= ((SELECT MAX(uid) FROM product)-(SELECT MIN(uid) FROM product))*RAND() + (SELECT MIN(uid) FROM product) LIMIT 6";
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.json(result);
    })
})
/*
* BackStage界面可能用到的接口
* */
/* 1.4.1
* 按照价格区间查找
* 接口地址:http://localhost:5050/product/schprice
* */
r.get('/product/schprice',(req,res)=>{
    let min = req.query.minprice;
    let max = req.query.maxprice;
    let sql = "SELECT * FROM product WHERE price BETWEEN "+min+" AND "+max;
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.json(result);
    })
})
/* 1.4.2
* 根据分类查找商品
* 接口地址:http://localhost:5050/product/schtype
* */
r.get('/product/schtype',(req,res)=>{
    let type = req.query.category;
    let sql = "SELECT * FROM product WHERE category LIKE '%"+type+"%'";
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.json(result);
    })
})
/* 1.4.3
* 价格、分类一起查找
* 接口地址:http://localhost:5050/product/pac
* */
r.get('/product/pac',(req,res)=>{
    let min = req.query.minprice;
    let max = req.query.maxprice;
    let type = req.query.category;
    let sql;
    if(!type){
        sql = "SELECT * FROM product WHERE price BETWEEN "+min+" AND "+max;
    }else{
        sql = "SELECT * FROM product WHERE category LIKE '%"+type+"%' AND price BETWEEN "+min+" AND "+max;
    }
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.json(result);
    })
})
/*
* Search界面可能用到的接口
* */
/* 1.5
* 关键词搜索的商品按照销量(高到低)排序
* 接口地址:http://localhost:5050/product/sortsell
* */
r.get('/product/sortsell',(req,res)=>{
    let sell = req.query.sortsell;
    let name = req.query.pname;
    let sql;
    if(!sell){
        sql = "SELECT * FROM product WHERE name LIKE '%"+name+"%'";
    }else{
        sql = "SELECT * FROM product WHERE name LIKE '%"+name+"%' ORDER BY price DESC";
    }
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.json(result);
    });
})
/* 1.6
* 关键词搜索的商品按照评分(高到低)排序
* 接口地址:http://localhost:5050/product/sortscore
* */
r.get('/product/sortscore',(req,res)=>{
    let score = req.query.sortscore;
    let name = req.query.pname;
    let sql;
    if(!score){
        sql = "SELECT * FROM product WHERE name LIKE '%"+name+"%'";
    }else{
        sql = "SELECT * FROM product WHERE name LIKE '%"+name+"%' ORDER BY score DESC";
    }
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.json(result);
    })
})
/* 1.7
* 关键词搜索的商品按照价格(高到低)排序
* 接口地址:http://localhost:5050/product/sortprice
* */
r.get('/product/sortprice',(req,res)=>{
    let price = req.query.sortprice;
    let name = req.query.pname;
    let sql;
    if(!price){
        sql = "SELECT * FROM product WHERE name LIKE '%"+name+"%'";
    }else{
        sql = "SELECT * FROM product WHERE name LIKE '%"+name+"%' ORDER BY price DESC";
    }
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.json(result);
    })
})
/* 1.8
* 下架商品(删除商品)
* 接口地址:http://localhost:5050/product/delete
* */
r.get('/product/delete',(req,res)=>{
    let uid = req.query.uid;
    let sql = "DELETE FROM product WHERE uid="+uid;
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        if(result.affectedRows==0){
            res.json({code:181,msg:'删除失败，请重试!'});
            return ;
        }else{
            res.json({code:182,msg:'删除成功!'});
            return ;
        }
    });
})
/* 1.9
* 某件商品的详情
* 接口地址:http://localhost:5050/product/detail
* */
r.get('/product/detail',(req,res)=>{
    let uid = req.url.split('=')[1];
    let sql = "SELECT * FROM product WHERE uid="+uid;
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.json(result);
    });
})
//============================ 用户注册相关接口 ===================================
/* 2.1
* 用户注册
* 接口地址:http://localhost:5050/user/reg
* */
r.post('/user/reg',(req,res)=>{
    let name = req.body.uname;
    let pwd = req.body.upwd;
    let email = req.body.uemail;
    console.log(req.body);
    //姓名为空
    if(!name){
        res.json({code:211,msg:'请输入用户名!'});
        return ;
    }
    //密码为空
    if(!pwd){
        res.json({code:212,msg:'请输入密码!'});
        return ;
    }
    //邮箱为空
    if(!email){
        res.json({code:213,msg:'请输入邮箱!'});
        return ;
    }
    //密码长度小于3
    if(pwd.length<3){
        res.json({code:214,msg:'密码长度小于3!'});
        return ;
    }
    //邮箱格式验证
    var reg1 = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    //验证用户名:只能输入字母、数字、“_”、“.”
    var reg2 = /^[a-z][a-zA-Z0-9\-]{2,15}$/;
    if(!reg1.test(email)){
        res.json({code:215,msg:'邮箱不符合格式!'});
        return ;
    }
    // //如果用户名不符合格式
    // if(!reg2.test(name)){
    //     res.json({code:216,msg:'用户名格式不正确，小写字母开头+数字/字母/减号，最少3位，最长16位!'});
    //     return ;
    // }
    //检查用户名是否存在
    let sql1 = "SELECT * FROM user WHERE username='" + name+"'";
    pool.query(sql1,(err,res1)=>{
        if(err) throw err;
        if(res1.length>0){
            res.json({code:217,msg:'用户名已存在!'});
            return ;
        }
    });
    //检查邮箱是否存在
    let sql2 = "SELECT * FROM user where email='" + email+"'";
    pool.query(sql2,(err,res2)=>{
        if(err) throw err;
        if(res2.length>0){
            res.json({code:218,msg:'邮箱已存在!'});
            return ;
        }
    });
    //通过验证后可以注册
    let sql3 = "INSERT INTO user values(null,'"+name+"','"+pwd+"','"+email+"',"+0+")";
    pool.query(sql3,(err,res3)=>{
        if(err) throw err;
        console.log(res3);
        res.json({code:name,msg:'注册成功!'});
        return ;
    })
})
/* 2.2
* 用户名单独验证
* 接口地址:http://localhost:5050/user/valiname
* */
r.get('/user/valiname',(req,res)=>{
    let name = req.query.uname;
    //姓名为空
    if(!name){
        res.json({code:221,msg:'请输入用户名!'});
        return ;
    }
    //验证用户名:只能输入字母、数字、“_”、“.”
    var reg2 = /^[a-z][a-zA-Z0-9\-]{2,15}$/;
    //如果用户名不符合格式
    if(!reg2.test(name)){
        res.json({code:222,msg:'用户名格式不正确，小写字母开头+数字/字母/减号，最少3位，最长16位!'});
        return ;
    }
    //检查用户名是否存在
    let sql1 = "SELECT * FROM user WHERE username='" + name+"'";
    pool.query(sql1,(err,res1)=>{
        if(err) throw err;
        if(res1.length>0){
            res.json({code:223,msg:'用户名已存在!'});
            return ;
        }else{
            res.json({code:224,msg:'用户名可以使用!'});
            return ;
        }
    });
})
/* 2.3
* 邮箱单独验证
* 接口地址:http://localhost:5050/user/valiemail
* */
r.get('/user/valiemail',(req,res)=>{
    let email = req.query.uemail;
    //邮箱为空
    if(!email){
        res.json({code:231,msg:'请输入邮箱!'});
        return ;
    }
    //邮箱格式验证
    var reg1 = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    if(!reg1.test(email)){
        res.json({code:232,msg:'邮箱不符合格式!'});
        return ;
    }
    //检查邮箱是否存在
    let sql2 = "SELECT * FROM user where email='" + email+"'";
    pool.query(sql2,(err,res2)=>{
        if(err) throw err;
        if(res2.length>0){
            res.json({code:233,msg:'邮箱已存在!'});
            return ;
        }else{
            res.json({code:234,msg:'邮箱可以使用!'});
            return ;
        }
    });
})
/* 2.4
* 密码单独验证
* 接口地址:http://localhost:5050/user/valipwd
* */
r.get('/user/valipwd',(req,res)=>{
    let pwd = req.query.upwd;
    //密码为空
    if(!pwd){
        res.json({code:241,msg:'请输入密码!'});
        return ;
    }
    //密码长度小于3
    let len = pwd.length;
    if(len<3){
        res.json({code:242,msg:'密码长度小于3!'});
        return ;
    }else{
        res.json({code:243,msg:'密码可以使用!'});
        return ;
    }
})
//============================ 用户登录相关接口 ===================================
/* 3.1
* 用户登录验证
* 接口地址:http://localhost:5050/user/login
* */
r.post('/user/login',(req,res)=>{
    let uname = req.body.uname;
    let upwd = req.body.upwd;
    //用户名为空
    if(!uname){
        res.json({code:311,msg:'用户名为空!'});
        return ;
    }
    //密码为空
    if(!upwd){
        res.json({code:312,msg:'密码为空!'});
        return ;
    }
    let sql = "SELECT * FROM user WHERE username='"+uname+"' and userpwd='"+upwd+"'";
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        //如果用户或密码不对
        if(result.length==0){
            res.json({code:313,msg:'信息不正确!'});
            return ;
        }//如果用户名和密码正确
        else{
            //保存session
            req.session.uname = uname;
            req.session.islog = true;
            res.json({code:314,msg:uname});
            return ;
        }
    });
})
/* 3.2
* 登录时用户名单独验证
* 接口地址:http://localhost:5050/user/justiname
* */
r.get('/user/justiname',(req,res)=>{
    let uname = req.query.username;
    if(!uname){
        res.json({code:321,msg:'用户名为空!'});
        return ;
    }
})
/* 3.3
* 登录时密码单独验证
* 接口地址:http://localhost:5050/user/justipwd
* */
r.get('/user/justipwd',(req,res)=>{
    let upwd = req.query.userpwd;
    if(!upwd){
        res.json({code:331,msg:'密码为空!'});
        return ;
    }
})
/* 3.4
* 检验是否在线
* 接口地址:http://localhost:5050/user/wholog
* */
r.get('/user/wholog',(req,res)=>{
    let uname = req.session.od;
    let islog = req.session.islog;
    console.log(req.session);
    if(!islog){
        res.json({code:341,msg:'没有用户登录!'});
        return ;
    }else{
        res.json({code:342,msg:uname});
        return ;
    }
})
/* 3.5
* 退出登录
* 接口地址:http://localhost:5050/user/logout
* */
r.get('/user/logout',(req,res)=>{
    req.session.uname = '';
    req.session.islog = false;
    res.json({code:351,msg:'退出成功!'})
})
/* 3.6
* 用户是否登录
* 接口地址:http://localhost:5050/user/islog
* */
r.get('/user/islog',(req,res)=>{
    let name = req.query.username;
    let uname = req.session.uname;
    let islog = req.session.islog;
    if(uname==name){
        res.json({code:361,msg:'用户在登录状态'});
        return ;
    }else{
        res.json({code:362,msg:'用户不在登录状态'});
        return ;
    }
})
/* 3.7
* 登录身份是否是管理员
* 接口地址:http://localhost:5050/user/isadmin
* */
r.get('/user/isadmin',(req,res)=>{
    let name = req.session.uname;
    if(name=='' || !name){
        res.json({code:371,msg:'请先登录!'});
        return ;
    }
    let sql = "SELECT * FROM user WHERE username='"+name+"'";
    pool.query(sql,(err,result)=>{
        console.log(result);
        if(parseInt(result[0].authority)==1){
            res.json({code:372,msg:'登录用户为管理员身份!'});
            return ;
        }else{
            res.json({code:373,msg:'登录用户不是管理员身份!'});
            return ;
        }
    })
})


//============================ 订单相关接口 ===================================
/* 4.1
* 单件商品加入购物车
* 接口地址:http://localhost:5050/cart/single
* */
r.get('/cart/single',(req,res)=>{
    let uid = req.query.uid;//商品id
    let name = req.query.uname;
    console.log(uid)
    console.log(name)
    // if(uid)
    // {
    //     res.json({msg:uid});
    //     return;
    // }
    // if(name)
    // {
    //     res.json({msg:name});
    //     return;
    // }
    let num = 1;//商品数量
    let sql1 = "SELECT * FROM product WHERE uid="+uid;//查找商品信息
    if(name=='' || !name){
        res.json({code:411,msg:'请先登录!'});
        return ;
    }
    let sql2 = "SELECT * FROM user WHERE username = '"+name+"'";//查找用户信息
    console.log(sql2);
    pool.query(sql1,(err1,res1)=>{
        if(err1) throw err1;
        pool.query(sql2,(err2,res2)=>{
            console.log(res2);
            if(err2) throw err2;
            let id = res2[0].id;
            let price = res1[0].price;
            let img = res1[0].img;
            let uname = res1[0].name;
            let exec = "SELECT * FROM cart WHERE uid="+uid+" AND id="+id+" AND state=0";//查找购物车是否已有记录
            pool.query(exec,(err3,res3)=>{
                console.log(exec)
                console.log(res3)
                if(err3) throw err3;
                if(res3.length>0){//购物车已存在该商品的未付款记录
                    let ori_num = res3[0].num;
                    let sql3 = "UPDATE cart SET num="+(parseInt(ori_num)+parseInt(num))+" WHERE cartid="+res3[0].cartid;
                    pool.query(sql3,(err5,res5)=>{
                        console.log(sql3)
                        console.log(res5)
                        if(err5) throw err5;
                        res.json({code:412,msg:"添加成功!"});
                        return ;
                    })
                }else{
                    let sql4 = "INSERT INTO cart VALUES(null,"+id+","+uid+",'"+uname+"',"+price+","+num+",'"+img+"',0)";
                    pool.query(sql4,(err4,res4)=>{
                        console.log(sql4)
                        console.log(res4)
                        if(err4) throw err4;
                        res.json({code:412,msg:"添加成功!"});
                        console.log(10)
                        return ;
                    });
                }
                console.log(1)
                return ;
            });
            console.log(2)
            return ;
        });
        console.log(3)
        return ;
    });
    console.log(4)
    return ;
})
/* 4.2
* 数量增加+
* 接口地址:http://localhost:5050/cart/add
* */
r.post('/cart/add',(req,res)=>{
    let cartid = req.body.cartid;
    let sql = "UPDATE cart SET num=num+1 WHERE cartid="+cartid;
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.json({code:421,msg:"添加成功!"});
            return ;
        }else{
            res.json({code:422,msg:"添加失败，请重试!"});
            return ;
        }
    })
})
/* 4.3
* 数量减少-
* 接口地址:http://localhost:5050/cart/sub
* */
r.post('/cart/sub',(req,res)=>{
    let cartid = req.body.cartid;
    if(!req.body.cartid)
    {
        res.json({code:1,msg:"空"});
        return ;
    }
    if(!cartid){
        res.json({code:433,msg:"减少失败!"});
        return ;
    }
    let sql1 = "SELECT * FROM cart WHERE cartid="+cartid;
    let sql2 = "UPDATE cart SET num=num-1 WHERE cartid="+cartid;
    pool.query(sql1,(err1,res1)=>{
        if(err1) throw err1;
        if(parseInt(res1[0].num)==1){
            res.json({code:431,msg:"不能再减少!"});
            return ;
        }else{
            pool.query(sql2,(err2,res2)=>{
                if(err2) throw err2;
                if(res2.affectedRows>0){
                    res.json({code:432,msg:"减少成功!"});
                    return ;
                }else{
                    res.json({code:433,msg:"减少失败，请重试!"});
                    return ;
                }
            })
        }
    })
})
/* 4.4
* 更改购买数量(+-中间的数字填写)
* 接口地址:http://localhost:5050/cart/change
* */
r.post('/cart/change',(req,res)=>{
    let buynum = req.body.buynum;
    let cartid = req.body.cartid;
    if(!cartid){
        res.json({code:443,msg:"更改失败!"});
        return ;
    }
    if(buynum<=0){
        res.json({code:441,msg:"数量需要大于0!"});
        return ;
    }
    let sql = "UPDATE cart SET num="+buynum+" WHERE cartid="+cartid;
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.json({code:442,msg:"更改成功!"});
            return ;
        }else{
            res.json({code:443,msg:"更改失败!"});
            return ;
        }
    })
})
/* 4.5
* 删除购物车的一项
* 接口地址:http://localhost:5050/cart/remove
* */
r.post('/cart/remove',(req,res)=>{
    let cartid = req.body.cartid;
    if(!cartid){
        res.json({code:452,msg:"删除失败!"});
        return ;
    }
    let sql = "DELETE FROM cart WHERE cartid="+cartid;
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.json({code:451,msg:"删除成功!"});
            return ;
        }else{
            res.json({code:452,msg:"删除失败!"});
            return ;
        }
    })
})
/* 4.6
* 单件商品付款
* 接口地址:http://localhost:5050/cart/pay
* */
r.post('/cart/pay',(req,res)=>{
    let name = req.session.uname;
    let cartid = req.body.cartid;
    if(!name || name==''){
        res.json({code:461,msg:"请先登录!"});
        return ;
    }
    let sql = "UPDATE cart SET state=1 WHERE cartid="+cartid;
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.json({code:462,msg:"付款成功!"});
            return ;
        }else{
            res.json({code:463,msg:"付款失败!"});
            return ;
        }
    });
})
/* 4.61
* 所有商品付款
* 接口地址:http://localhost:5050/cart/pay1
* */
r.post('/cart/pay1',(req,res)=>{
    // req.session.uname = "a";
    let name = req.session.uname;
    if(!name || name==''){
        res.json({code:461,msg:"请先登录!"});
        return ;
    }
    let sql = "SELECT * FROM user WHERE username='"+name+"'";
    pool.query(sql,(err1,res1)=>{
        if(err1) throw err1;
        let id = res1[0].id;
        let sql2 = "UPDATE cart SET state=1 WHERE id="+id+" AND state=0";
        pool.query(sql2,(err2,result)=>{
            if(err2) throw err2;
            if(result.affectedRows>0){
                res.json({code:464,msg:"付款成功!"});
                return ;
            }else{
                res.json({code:465,msg:"付款失败!"});
                return ;
            }
        });
    });
})
/* 4.7
* 查询目前登录的用户的所有未付款订单
* 接口地址:http://localhost:5050/cart/schnot
* */
r.post('/cart/schnot',(req,res)=>{
    // req.session.uname = "a";
    let name = req.body.uname;
    if(!name || name==''){
        res.json({code:471,msg:"请先登录!"});
        return ;
    }
    let sql = "SELECT * FROM user WHERE username='"+name+"'";
    pool.query(sql,(err1,res1)=>{
        if(err1) throw err1;
        let id = res1[0].id;
        let sql2 = "SELECT * FROM cart WHERE id="+id+" AND state=0";
        pool.query(sql2,(err2,res2)=>{
            if(err2) throw err2;
            res.json(res2);
            return ;
        });
    });
})
/* 4.8
* 查询目前登录的用户的所有已付款订单
* 接口地址:http://localhost:5050/cart/schyes
* */
r.post('/cart/schyes',(req,res)=>{
    let name = req.session.uname;
    if(!name || name==''){
        res.json({code:481,msg:"请先登录!"});
        return ;
    }
    let sql = "SELECT * FROM user WHERE username='"+name+"'";
    pool.query(sql,(err1,res1)=>{
        if(err1) throw err1;
        let id = res1[0].id;
        let sql2 = "SELECT * FROM cart WHERE id="+id+" AND state=1";
        pool.query(sql2,(err2,res2)=>{
            if(err2) throw err2;
            res.json(res2);
            return ;
        });
    });
})

/**
 * 4.9 购物车项列表
 * 接口地址：http://127.0.0.1:5050/cart
 返回格式：JSON
 请求方式：GET
 请求示例：http://127.0.0.1:5050/cart?id=?
 */
r.get('/cart',function(req,res){
    let id=req.url.split('=')[1]
    let sql='SELECT * FROM cart WHERE cartid=? AND cart.id=user.id';
    pool.query(sql,[id],function(err,result){
        if(err)throw err
        if(result.length>0){
            res.json(result)
            console.log(1)
        }
    })
})

r.get('/liaotian',function(req,res){
    let uname=req.url.split('=')[1];
    let exec = "SELECT * FROM user1 WHERE username='"+uname+"'";
    pool.query(exec,(err3,res3)=> {
        console.log(exec)
        console.log(res3)
        if (err3) throw err3;
        if (res3.length > 0) {
            let sql3 = "UPDATE user1 SET au="+1+" WHERE username='"+uname+"'";
            pool.query(sql3, (err5, res5) => {
                console.log(sql3)
                console.log(res5)
                if (err5) throw err5;
                res.json({code: 412, msg: "更新成功!"});
                return;
            })
        } else {
            let sql4 = "INSERT INTO user1 VALUES('" + uname + "',1)";
            pool.query(sql4, (err4, res4) => {
                console.log(sql4)
                console.log(res4)
                if (err4) throw err4;
                res.json({code: 412, msg: "添加成功!"});
                console.log(10)
                return;
            })
        }
    })
})
//http://localhost:5050/zaixian
r.get('/zaixian',function(req,res){
    let sql="SELECT * FROM user1 WHERE au=1";
    pool.query(sql,(err,result)=>{
        console.log(sql)
        if(err)throw err
        if(result.length>0)
        {
            res.json(result)
            console.log(1)
            return;
        }
    })
})
r.get('/tuichu',function(req,res){
    let uname=req.url.split('=')[1];
    let sql="UPDATE user1 SET au="+0+" WHERE username='"+uname+"'";
    pool.query(sql,(err,result)=>{
        console.log(sql)
        if(err)throw err;
        res.json({code:200,msg:"更新成功！"});
        return;
    })
})
r.get('/chat',function(req,res){
    let uname=req.url.split('=')[1];
    let yu=req.url.split('=')[3];
    let sql="INSERT INTO chat VALUES('" + uname + "','" + yu + "')";
    pool.query(sql,(err,result)=>{
        if(err)throw err;
        res.json({code:210,msg:"发送成功！"});
        console.log(yu);
        return;
    })
})
r.get('/chat1',function(req,res){
    let sql="SELECT * FROM chat";
    pool.query(sql,(err,result)=>{
        if(err)throw err;
        res.json(result);
        return;
    })
})
r.get('/chat2',function(req,res){
    let sql="SELECT * FROM chat1";
    pool.query(sql,(err,result)=>{
        if(err)throw err;
        res.json(result);
        return;
    })
})
r.get('/chat3',function(req,res){
    let uname=req.url.split('=')[1];
    let yu=req.url.split('=')[3];
    let sql="INSERT INTO chat1 VALUE('" + uname + "',0,'" + yu + "')";
    pool.query(sql,(err,result)=>{
        if(err)throw err;
        res.json(result);
        return;
    })
})

module.exports = r;