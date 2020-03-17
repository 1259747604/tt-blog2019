<template>
  <div class="detail scroll-bar b-b2">
    <div class="middle">
      <div class="title">{{ title }}</div>
      <div class="content">
        <div class="ql-snow">
          <p class="ql-editor" v-html="content"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: '',
      title: ''
    };
  },
  mounted() {
    this.getDt();
  },
  methods: {
    async getDt() {
      let res = await this.$axios(`/article1/${this.$route.params.id}`).then(
        res => res.data
      );
      if (res.result && res.data.length > 0) {
        this.content = res.data[0].content;
        this.title = res.data[0].desp;
      }
    }
  }
};
</script>
<style lang="less">
.detail {
  .content {
    & img {
      max-width: 100%;
      height: auto;
    }
  }
}
</style>
<style>
.ql-snow .ql-editor pre.ql-syntax {
  background: #2d343c;
  width: 70%;
  overflow: auto;
  border-radius: 5px;
  color: #abb5c2;
}
.ql-snow .ql-editor pre {
  white-space: pre;
}
</style>

<style lang="less" scoped>
.detail {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  .title {
    margin: auto;
    width: 50%;
    height: 60px;
    padding-left: 20px;
    display: flex;
    align-items: center;
    font-size: 40px;
    background: #000;
    color: #fff;
  }
  .content {
    padding: 20px 40px 50px;
    margin: 0 auto;
    width: 50%;
    background: #fff;
    font-size: 16px;
    .ql-editor {
      overflow: initial;
    }
    .ql-editor pre.ql-syntax {
      width: 70%;
      overflow: auto;
      border-radius: 5px;
    }
    & img {
      max-width: 100%;
      height: auto;
    }
  }
}
</style>
