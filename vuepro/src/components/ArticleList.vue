<template>
  <div class="article">
    <div class="top">
      <Button
        shape="circle"
        icon="md-create"
        size="large"
        @click="showPageWrite"
      ></Button>
    </div>
    <div class="middle">
      <Table :columns="column" :data="dt"></Table>
    </div>
    <div style="margin-top:15px;">
      <Page :total="total" :page-size="pageSize" @on-change="changePage" />
    </div>
    <Modal v-model="ifPageWrite" :footer-hide="true" :fullscreen="true">
      <Article :info="info" :ifEdit="ifEdit" @refresh="refresh" />
    </Modal>
    <Modal v-model="ifPreview" :footer-hide="true" :fullscreen="true">
      <code v-html="curContent" />
    </Modal>
  </div>
</template>

<script>
import Article from './Article';
export default {
  components: {
    Article
  },
  data() {
    return {
      curContent: '',
      column: [
        {
          title: '名号',
          key: 'desp'
        },
        {
          title: '所在帮',
          key: 'type'
        },
        {
          title: '帮主查看次数',
          key: 'browse'
        },
        {
          title: '入帮时间',
          render: (h, params) => {
            return h(
              'span',
              this.$moment(params.row.time).format('YYYY-MM-DD HH:mm:ss')
            );
          }
        },
        {
          title: '大劫',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  style: {
                    marginLeft: '5px'
                  },
                  on: {
                    click: () => {
                      this.preview(params.row);
                    }
                  }
                },
                '帮主预览'
              ),
              h(
                'Button',
                {
                  style: {
                    marginLeft: '5px'
                  },
                  props: {
                    type: 'info'
                  },
                  on: {
                    click: () => {
                      this.modify(params.row);
                    }
                  }
                },
                '帮主修缮'
              ),
              h(
                'Button',
                {
                  style: {
                    marginLeft: '5px'
                  },
                  props: {
                    type: 'error'
                  },
                  on: {
                    click: () => {
                      this.delItem(params.row);
                    }
                  }
                },
                '铲除'
              )
            ]);
          }
        }
      ],
      dt: [],
      ifPageWrite: false,
      ifPreview: false,
      info: {},
      ifEdit: false,
      total: 0,
      pageSize: 13,
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
    // 获取文章列表数据
    async getDt() {
      let res = await this.$axios('/article', {
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
    clickHandler() {},
    // 删除
    delItem(item) {
      this.$axios
        .delete(`/article/${item.id}`)
        .then(res => res.data)
        .then(res => {
          if (res.result) {
            this.$Message.success('已铲除');
            this.getDt();
          }
        });
    },
    // 显示写作页面
    showPageWrite() {
      this.ifPageWrite = true;
      this.ifEdit = false;
    },
    //预览
    preview(item) {
      this.curContent = item.content;
      this.ifPreview = true;
    },
    // 修改
    modify(item) {
      this.info = item;
      this.ifEdit = true;
      this.ifPageWrite = true;
    },
    // 刷新
    refresh() {
      this.ifPageWrite = false;
      this.getDt();
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
.article {
  padding: 15px;
  .middle {
    margin-top: 20px;
  }
}
</style>
