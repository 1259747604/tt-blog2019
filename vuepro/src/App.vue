<template>
  <div id="app">
    <div id="nav">
      显示:
      {{ text }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: ''
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      let res = await this.$axios('http://127.0.0.1:3000/test').then(
        res => res.data
      );
      this.text = res.text;
    }
  }
};
</script>

<style lang="less" scoped></style>
