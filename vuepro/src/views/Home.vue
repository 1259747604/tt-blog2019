<template>
  <div class="home b-b2 ">
    <div class="middle">
      <div class="m-top">
        <div class="m-t-left">
          <span :class="[ifLDesc ? 'c-w1' : 'c-y1']" @click="selectTime">
            发榜时间
            <Icon v-if="ifTDesc" type="md-arrow-dropdown" size="20" />
            <Icon v-else type="md-arrow-dropup" size="20" />
          </span>
          <span :class="[ifLDesc ? 'c-y1' : 'c-w1']" @click="selectLook">
            关心指数
          </span>
        </div>
        <div class="m-t-right">
          <Input v-model="iVal" style="width: 300px" @on-keyup.enter="search" />
          <Icon type="ios-search" size="40" color="#f9c73d" @click="search" />
          <hr />
        </div>
      </div>
      <div class="m-list">
        <HomeList :reqBody="reqBody" />
      </div>
    </div>
    <div class="left" :class="[ifshowLeft ? 'left-show' : 'left-hide']">
      <div class="btn" @click="ifshowLeft = !ifshowLeft">
        <Icon type="ios-arrow-forward" size="50" v-if="!ifshowLeft" />
        <Icon type="ios-arrow-back" size="50" v-else />
      </div>
      <div class="left-list scroll-bar">
        <div
          v-for="(item, index) in typeList"
          :key="index"
          @click="changeType(item.id)"
          :class="[item.id === curTypeId ? 'c-y1' : '']"
        >
          {{ item.name }}
          <span class="tag">{{ item.count }}</span>
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeList from '../components/HomeList';
export default {
  components: {
    HomeList
  },
  data() {
    return {
      ifTDesc: true,
      ifLDesc: false,
      iVal: '',
      ifshowLeft: false,
      typeList: [],
      curTypeId: 0,
      reqBody: {}
    };
  },
  watch: {
    ifTDesc() {
      this.reqBody = this.backParams();
    },
    ifLDesc() {
      this.reqBody = this.backParams();
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      await this.getTypeDt();
      this.reqBody = this.backParams();
    },
    // 类型数据
    async getTypeDt() {
      let res = await this.$axios('/articletype').then(res => res.data);
      if (res.result) {
        this.typeList = res.data;
        let total = 0;
        for (let i = 0; i < this.typeList.length; i++) {
          total += this.typeList[i].count;
          if (this.typeList[i].count > 99) {
            this.typeList[i].count = '99+';
          }
        }
        if (total > 99) {
          total = '99+';
        }
        this.typeList = [
          { name: '全部', id: 0, count: total },
          ...this.typeList
        ];
        this.curTypeId = 0;
      }
    },
    //类型改变
    changeType(id) {
      this.curTypeId = id;
      this.reqBody = this.backParams();
      this.ifshowLeft = !this.ifshowLeft;
    },
    // 选择按时间排序
    selectTime() {
      if (this.ifLDesc) {
        this.ifLDesc = false;
        return;
      }
      this.ifTDesc = !this.ifTDesc;
    },
    // 选择查看次数
    selectLook() {
      this.ifLDesc = true;
    },
    // 查询
    search() {
      this.reqBody = this.backParams();
    },
    //返回需要参数
    backParams() {
      return {
        keyword: this.iVal,
        ifTDesc: this.ifTDesc,
        ifLDesc: this.ifLDesc,
        curTypeId: this.curTypeId
      };
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  position: relative;
  width: 100%;
  height: 100%;
  .middle {
    height: 100%;
    width: 70%;
    margin: 0 auto;
    background: #fff;
    .m-top {
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: space-between;
      line-height: 50px;
      padding: 0 15px;
      background: #000;
      .m-t-left {
        width: 22%;
        display: flex;
        justify-content: space-around;
        font-size: 17px;
        span {
          // color: #f9c73d;
          cursor: pointer;
        }
      }
      .m-t-right {
        position: relative;
        .ivu-icon {
          vertical-align: middle;
          cursor: pointer;
        }
        .ivu-input-wrapper {
          /deep/ .ivu-input {
            background: none;
            border: none;
            outline: none;
            color: #fff;
          }
          /deep/ .ivu-input:focus {
            border: none;
            box-shadow: 0 0 #000;
          }
        }
        hr {
          position: absolute;
          top: 37px;
          width: 300px;
          height: 2px;
          border: none;
          background: linear-gradient(to right, #f9c73d, #4ae5d5);
        }
      }
    }
    .m-list {
      width: 100%;
      height: calc(100% - 50px);
    }
  }
  .left {
    position: absolute;
    top: 0;
    left: -15%;
    width: 15%;
    height: 100%;
    background: #171717;
    transition: 500ms;
    .btn {
      position: absolute;
      top: 50%;
      right: -50px;
      width: 50px;
      height: 50px;
      background: #fff;
      cursor: pointer;
    }
    .left-list {
      width: 100%;
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      color: #fff;
      font-size: 24px;
      & > div {
        position: relative;
        width: 100%;
        height: 70px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 15px;
        padding-right: 10px;
        line-height: 70px;
        cursor: pointer;
        hr {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          height: 1px;
          border: none;
          background: linear-gradient(to right, #f9c73d, #4ae5d5);
        }
        .tag {
          display: inline-block;
          padding: 2px;
          min-width: 30px;
          height: 20px;
          line-height: 20px;
          background: #dbe56f;
          color: #000;
          border-radius: 20px;
          font-size: 12px;
          text-align: center;
        }
      }
    }
  }
  .left-show {
    left: 0;
  }
  .left-hide {
    left: -15%;
  }
}
</style>
