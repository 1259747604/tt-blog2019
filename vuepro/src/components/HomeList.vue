<template>
  <div class="container">
    <div class="list">
      <div
        v-for="(item, index) in list"
        :key="index"
        @click="openDetail(item.id)"
      >
        <div class="top">
          {{ item.desp }}
        </div>
        <div class="bottom">
          <span>{{ filterTime(item.time) }}</span>
          <span>帮主关心指数:{{ item.browse }}</span>
        </div>
      </div>
    </div>
    <div class="page">
      <Page
        :current="currentPage"
        :total="total"
        :page-size="pageSize"
        @on-change="changePage"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ['reqBody'],
  watch: {
    reqBody(newObj) {
      if (
        newObj.keyword !== undefined &&
        newObj.ifTDesc !== undefined &&
        newObj.ifLDesc !== undefined &&
        newObj.curTypeId !== undefined
      ) {
        this.currentPage = 1;
        this.handlerReqBody(newObj);
      }
    }
  },
  data() {
    return {
      list: [],
      total: 0,
      pageSize: 8,
      currentPage: 1,
      params: []
    };
  },
  methods: {
    // 处理需要请求的参数
    handlerReqBody(newObj) {
      let { keyword, ifTDesc, ifLDesc, curTypeId } = newObj;
      let sort = '';
      let dir = '';
      if (ifLDesc) {
        sort = 'browse';
        dir = 'DESC';
      } else {
        sort = 'time';
        if (ifTDesc) {
          dir = 'DESC';
        } else {
          dir = 'ASC';
        }
      }
      this.getDt(keyword, sort, dir, curTypeId);
    },
    // 请求数据
    async getDt(...params) {
      if (params.length) {
        this.params = params;
      }
      let res = await this.$axios('/article1', {
        params: {
          keyword: this.params[0],
          sort: this.params[1],
          dir: this.params[2],
          typeid: this.params[3],
          limit: this.pageSize,
          page: this.currentPage - 1
        }
      }).then(res => res.data);
      if (res.result) {
        this.list = res.data;
        this.total = res.total;
      }
    },
    // 时间转换
    filterTime(val) {
      return this.$moment(val).format('YYYY-MM-DD HH:mm:ss');
    },
    // 页数改变
    changePage(params) {
      this.currentPage = params;
      this.getDt();
    },
    // 打开详情
    openDetail(id) {
      let routeUrl = this.$router.resolve({
        name: 'articledetail',
        params: { id }
      });
      window.open(routeUrl.href, '_blank');
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  padding: 0 0 20px 0;
  width: 100%;
  height: 100%;
  .list {
    width: 100%;
    height: 93%;
    overflow: hidden;
    & > div {
      height: 12%;
      padding: 0 15px 0 20px;
      border-bottom: 1px solid #dedede;
      cursor: pointer;
      .top {
        display: flex;
        height: 70%;
        align-items: center;
        font-size: 30px;
        font-weight: bold;
        color: #59542b;
      }
      .bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #c2c1b9;
      }
      &:hover {
        border-bottom: 1px solid #22f499;
      }
    }
  }
  .page {
    width: 100%;
    height: 7%;
    display: flex;
    align-items: center;
    padding-left: 20px;
    /deep/ .ivu-page-item-active {
      border-color: #f9c73d;
      & a,
      &:hover a {
        color: #f9c73d;
      }
    }
    /deep/ .ivu-page-item:hover {
      border-color: #f9c73d;
      & a,
      &:hover a {
        color: #f9c73d;
      }
    }
    /deep/ .ivu-page-next:hover,
    /deep/.ivu-page-prev:hover {
      border-color: #f9c73d;
      &:hover a {
        color: #f9c73d;
      }
    }
  }
}
</style>
