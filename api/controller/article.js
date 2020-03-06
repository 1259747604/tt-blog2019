const { query } = require('../server/db.js');

/* 文章类型 */
/* get */
exports.articletype = async ctx => {
  let result = await query('select * from articletype');
  ctx.body = {
    data: result,
    count: result.length,
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
  ctx.body = {
    result: true
  };
};
