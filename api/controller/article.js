const { query } = require('../server/db.js');

/* 文章类型 */
/* get */
exports.articletype = async ctx => {
  let req = ctx.query;
  let result;
  if (req.page && req.limit) {
    result = await query(`select * from articletype limit ?,?`, [
      Number(req.page) * Number(req.limit),
      Number(req.limit)
    ]);
  } else {
    result = await query(`select * from articletype`);
  }
  let total = await query('select count(*) as total from articletype');
  ctx.body = {
    data: result,
    total: total[0].total,
    result: true
  };
};
/* post */
exports.articletypeinsert = async ctx => {
  let req = ctx.request.body;
  await query('insert into articletype set ?', req);
  ctx.body = {
    result: true
  };
};
/* put */
exports.articletypeupdate = async ctx => {
  let id = ctx.params.id;
  let req = ctx.request.body;
  await query('update articletype set ? where id = ?', [req, id]);
  ctx.body = {
    result: true
  };
};
/* delete */
exports.articletypedelete = async ctx => {
  let id = ctx.params.id;
  await query('delete from articletype where id = ?', [id]);
  await query('delete from article where typeid = ?', [id]);
  ctx.body = {
    result: true
  };
};

/* 文章 */
/* get */
exports.article = async ctx => {
  let res = await query('select * from article order by time desc');
  let total = await query('select count(*) as total from article');
  ctx.body = {
    result: true,
    data: res,
    total: total[0].total
  };
};
/* post*/
exports.articleinsert = async ctx => {
  let req = ctx.request.body;
  await query('insert into article set ?', req);
  await query('update articletype set count = count+1 where id = ?', [
    Number(req.typeid)
  ]);
  ctx.body = {
    result: true
  };
};
/* put */
exports.articleupdate = async ctx => {
  let id = ctx.params.id;
  let req = ctx.request.body;
  let res = await query('select typeid from article where id = ?', [id]);
  if (Number(res[0].typeid) !== Number(req.typeid)) {
    await query('update articletype set count = count-1 where id = ?', [
      Number(res[0].typeid)
    ]);
    await query('update articletype set count = count+1 where id = ?', [
      Number(req.typeid)
    ]);
  }
  await query('update article set ? where id = ?', [req, id]);
  ctx.body = {
    result: true
  };
};
/* delete */
exports.articledelete = async ctx => {
  let id = ctx.params.id;
  let res = await query('select typeid from article where id = ?', [id]);
  await query('update articletype set count = count-1 where id = ?', [
    Number(res[0].typeid)
  ]);
  await query('delete from article where id = ?', [id]);
  ctx.body = {
    result: true
  };
};
