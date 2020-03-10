<template>
  <div class="detail scroll-bar b-b2">
    <div class="middle">
      <div class="title">{{ title }}</div>
      <div class="content">
        <p v-html="content"></p>
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

<style lang="less" scoped>
.detail {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  .title {
    margin: auto;
    width: 70%;
    height: 60px;
    padding-left: 20px;
    display: flex;
    align-items: center;
    font-size: 40px;
    background: #000;
    color: #fff;
  }
  .content {
    padding: 20px;
    margin: 0 auto;
    width: 70%;
    background: #fff;
    font-size: 16px;
  }
}
</style>
