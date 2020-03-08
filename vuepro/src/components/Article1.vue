<template>
  <div>
    <froala :tag="'textarea'" :config="config" v-model="model"></froala>
  </div>
</template>

<script>
// 废弃，froala无代码高亮
export default {
  data() {
    return {
      config: {
        language: 'zh_cn', //中文
        charCounterCount: true, //字数统计
        attribution: false, //底部froala来源消失掉
        height: 500,
        heightMax: 500,
        requestWithCredentials: true, //允许凭证
        tabSpaces: 4, //按下tab空格数，
        theme: 'dark', //主题
        zIndex: 99999,
        imageUploadMethod: 'POST', //图片上传方法
        imageUploadURL: '', //上传地址
        events: {
          'froalaEditor.initialized': function() {
            console.log('初始化完成');
          }
        }
      },
      model: 'Edit Your Content Here!'
    };
  }
};
</script>

<style lang="less" scoped></style>
