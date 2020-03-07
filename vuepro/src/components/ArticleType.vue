<template>
  <div class="articleType">
    <div class="top">
      <div v-if="!showAdd">
         <Button type="primary" shape="circle" icon="md-add" @click="showAdd = !showAdd"></Button>
      </div>
      <div v-else>
        <Button type="error" shape="circle" icon="md-close" @click="showAdd = !showAdd"></Button>
        <Input v-model="newName" placeholder="请创建帮派" style="width:250px;margin: 0 20px;" />
        <Button type="info" @click="createNew">创帮</Button>
      </div>
    </div>
    <div class="bottom">
      <Table :columns="column" :data="dt"></Table>
      <div style="margin-top:15px;">
        <Page :total="total" :page-size="pageSize" @on-change="changePage"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      column: [
        {
          title: '帮名',
          key: 'name'
        },
        {
          title: '帮众',
          key: 'count'
        },
        {
          title: '大劫',
          width: 150,
          render: (h, params) => {
            return h(
              'Button',
              {
                props: {
                  type: 'error'
                },
                on: {
                  click: () => {
                    this.clickHandler(params.row);
                  }
                }
              },
              '灭帮'
            );
          }
        }
      ],
      dt: [],
      showAdd: false,
      newName: '',
      total: 0,
      pageSize: 10,
      currentPage: 1
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getDt();
    },
    // 请求数据
    async getDt() {
      let res = await this.$axios('/articletype', {
        params: {
          limit: this.pageSize,
          page: this.currentPage - 1
        }
      }).then(res => res.data);
      if (res.result) {
        this.dt = res.data;
        this.total = res.total;
      }
    },
    // 创建
    createNew() {
      if (this.newName) {
        this.$axios
          .post('/articletype', { name: this.newName })
          .then(res => res.data)
          .then(res => {
            if (res.result) {
              this.showAdd = false;
              this.newName = '';
              this.getDt();
            }
          });
      } else {
        this.$Message.info('还没帮名');
      }
    },
    // 删除
    clickHandler(parmas) {
      this.$axios
        .delete(`/articletype/${parmas.id}`)
        .then(res => res.data)
        .then(res => {
          if (res.result) {
            this.$Message.success('魔头已灭了此帮');
            this.getDt();
          }
        });
    },
    // 页数改变
    changePage(params) {
      this.currentPage = params;
      this.getDt();
    }
  }
};
</script>

<style lang="less" scoped>
.articleType {
  padding: 15px;
  .top {
    height: 50px;
  }
}
</style>


