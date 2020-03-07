<template>
  <div class="container">
    <div class="left">
      <Menu theme="dark" @on-select="changeSecondPage" :active-name="curMenuItem">
        <MenuItem name="1">
          <Icon type="ios-analytics" />
          谋士呆子所在
        </MenuItem>
        <MenuItem name="2">
          <Icon type="ios-bookmarks" />
          哪个帮派
        </MenuItem>
        <MenuItem name="3">
          <Icon type="ios-book" />
          写个锤子
        </MenuItem>
      </Menu>
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>  
</template>

<script>
export default {
  data() {
    return {
      dict: {
        '1': 'analyse',
        '2': 'articletype',
        '3': 'article'
      },
      curMenuItem: '1'
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      switch (to.name) {
        case 'backstage':
          vm.$router.push({ name: vm.dict['1'] }).catch(err => err);
          break;
        case 'analyse':
          vm.curMenuItem = '1';
          break;
        case 'articletype':
          vm.curMenuItem = '2';
          break;
        case 'article':
          vm.curMenuItem = '3';
          break;
        default:
          break;
      }
    });
  },
  beforeRouteUpdate(to, from, next) {
    switch (to.name) {
      case 'backstage':
        this.$nextTick(() => {
          this.$router.push({ name: this.dict['1'] }).catch(err => err);
        });
        break;
      case 'analyse':
        this.curMenuItem = '1';
        break;
      case 'articletype':
        this.curMenuItem = '2';
        break;
      case 'article':
        this.curMenuItem = '3';
        break;
      default:
        break;
    }
    next();
  },
  mounted() {},
  methods: {
    changeSecondPage(name) {
      this.$router.push({ name: this.dict[name] }).catch(err => err);
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  .ivu-menu {
    height: 100%;
  }
  .right {
    width: 90%;
  }
}
</style>


