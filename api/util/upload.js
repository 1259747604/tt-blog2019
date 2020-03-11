const koaBody = require('koa-body');
const { join } = require('path');
exports.imgUpload = koaBody({
  multipart: true,
  formidable: {
    // 上传存放的路径
    uploadDir: join(__dirname, `../static/artImg`),
    // 保持后缀不变
    keepExtensions: true,
    // 文件大小
    maxFileSize: 10 * 1024 * 1024,
    onFileBegin: (name, file) => {
      // 取后缀  如：.js  .txt
      const reg = /\.[A-Za-z]+$/g;
      const ext = file.name.match(reg)[0];

      // 修改上传文件名
      let temp = Date.now();
      file.path = join(__dirname, '../static/artImg/') + temp + ext;
      file.name = temp + ext;
    },
    onError(err) {
      ctx.err = err;
    }
  }
});
