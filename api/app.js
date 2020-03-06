const Koa = require('koa');
const app = new Koa();
const session = require('koa-session');
const cors = require('@koa/cors');
const router = require('./routers/router');
const static = require('koa-static');
const koaBody = require('koa-body');
const { join } = require('path');
const { query } = require('./server/db');
const encrypt = require('./util/encrypt');

/*cors跨域*/
app.use(
  cors({
    credentials: true
  })
);

app.use(koaBody());

/* 静态资源 */
app.use(static(join(__dirname, 'static')));

/*配置session*/
app.keys = ['tt is a good boy'];
const CONFIG = {
  key: 'tt is a bad boy', //密匙
  maxAge: 7200000, //过期时间 2小时
  autoCommit: true, //自动提交头文件
  overwrite: true, //是否覆盖
  httpOnly: true, //不允许客户端读取
  signed: true, //是否签名
  rolling: true //是否刷新
};

app.use(session(CONFIG, app));

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log('http://localhost:3000');
});

{
  // 设置初始账号
  async function account() {
    let res = await query('select * from user');
    if (res.length) return;
    await query('insert into user set ?', {
      username: 'tt',
      password: encrypt('111111qqq')
    });
  }
  account();
}
