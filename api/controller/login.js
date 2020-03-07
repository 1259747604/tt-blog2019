const { query } = require('../server/db');
const encrypt = require('../util/encrypt');

//登录
exports.login = async ctx => {
  const req = ctx.request.body;
  const username = req[0];
  const pwd = encrypt(req[1]);
  let res = await query('select * from user where username=?', username);
  if (res.length === 0 || res[0].password !== pwd) {
    ctx.body = {
      result: false,
      data: []
    };
    return;
  }
  let session = {
    id: res[0].id,
    username
  };
  ctx.session = session;
  ctx.body = {
    result: true,
    data: [username],
    session
  };
};

// 保持登录
exports.keepLogin = async (ctx, next) => {
  if (ctx.session.isNew) {
    ctx.body = {
      keepStatus: false
    };
    return;
  }
  await next();
};

exports.checkLogin = async ctx => {
  ctx.body = {
    keepStatus: true,
    session: ctx.session
  };
};

// 登出
exports.exit = async ctx => {
  ctx.session = null;
  ctx.body = {
    result: true
  };
};
