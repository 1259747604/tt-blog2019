const Koa = require('koa');
const app = new Koa();
const session = require('koa-session');
const cors = require('@koa/cors');
const router = require('./routers/router');

/*cors跨域*/
app.use(
  cors({
    credentials: true
  })
);
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
