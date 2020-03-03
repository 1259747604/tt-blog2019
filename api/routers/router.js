const Router = require('@koa/router');
const router = new Router();

router.get('/test', async ctx => {
  ctx.body = {
    text: '测试数据'
  };
});

module.exports = router;
