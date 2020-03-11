<template>
  <div class="writeArticle">
    <div class="top">
      <div class="type">
        <span style="letter-spacing: 14px;">帮派:</span>
        <Select
          v-model="typeId"
          style="width:250px;margin: 0 5px;"
          :label-in-value="true"
          @on-change="changeType"
        >
          <Option
            v-for="(item, index) in typeList"
            :value="item.id"
            :key="index"
            >{{ item.name }}</Option
          >
        </Select>
      </div>
      <div class="desp">
        <span>入伙宣言:</span>
        <Input
          v-model="desp"
          placeholder="写出入伙宣言吧"
          style="width:250px;margin: 0 20px;"
        />
      </div>
    </div>
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
    ></quill-editor>
    <div class="bottom">
      <Button icon="md-send" @click="send">给帮主审核</Button>
    </div>
  </div>
</template>

<script>
import quillConfig from '../plugin/quill';
import { url } from '../main';
import { quillRedefine } from 'vue-quill-editor-upload';
export default {
  props: ['info', 'ifEdit'],
  watch: {
    info() {
      if (this.ifEdit) {
        this.addInitData();
      }
    },
    ifEdit(newVal) {
      if (newVal) {
        this.addInitData();
      } else {
        this.clear();
      }
    }
  },
  data() {
    return {
      content: ``,
      editorOption: {},
      desp: '',
      typeId: '',
      typeName: '',
      typeList: [],
      url
    };
  },
  created() {
    this.editorOption = quillRedefine({
      uploadConfig: {
        action: `${this.url}/uploadImg`,
        res: respnse => {
          return respnse.data;
        }
      },
      toolOptions: quillConfig.modules.toolbar
    });
    this.editorOption.modules.imageResize = quillConfig.modules.imageResize;
    this.editorOption.modules.syntax = quillConfig.modules.syntax;
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      await this.getTypeDt();
    },
    // 获取类型
    async getTypeDt() {
      let res = await this.$axios('/articletype').then(res => res.data);
      if (res.result) {
        this.typeList = res.data;
      }
    },
    // 选项改变
    changeType(parmas) {
      if (parmas) {
        this.typeName = parmas.label;
      }
    },
    //发送数据
    send() {
      if (this.ifEdit) {
        this.update();
      } else {
        this.add();
      }
    },
    // 新增
    add() {
      if (this.typeId) {
        this.$axios
          .post('/article', {
            type: this.typeName,
            typeid: this.typeId,
            desp: this.desp,
            content: this.content,
            time: this.$moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
          })
          .then(res => res.data)
          .then(res => {
            if (res.result) {
              this.$Message.success('少侠已加入本帮!!!!!');
              this.clear();
              this.$emit('refresh');
            }
          });
      } else {
        this.$Message.warning('少侠 选个帮派呗......');
      }
    },
    //修改
    update() {
      if (this.typeId) {
        this.$axios
          .put(`/article/${this.info.id}`, {
            type: this.typeName,
            typeid: this.typeId,
            desp: this.desp,
            content: this.content
          })
          .then(res => res.data)
          .then(res => {
            if (res.result) {
              this.$Message.success('少侠资料已更新!!!!!');
              this.clear();
              this.$emit('refresh');
            }
          });
      } else {
        this.$Message.warning('少侠 选个帮派呗......');
      }
    },
    //如果为编辑时填入初始数据
    addInitData() {
      this.typeName = this.info.type;
      this.typeId = this.info.typeid;
      this.desp = this.info.desp;
      this.content = this.info.content;
    },
    //清除数据
    clear() {
      this.typeName = '';
      this.typeId = '';
      this.desp = '';
      this.content = '';
    }
  }
};
</script>

<style>
.ql-editor {
  height: 600px;
}
</style>
<style lang="less" scoped>
.writeArticle {
  padding: 15px;
  .top {
    margin-bottom: 20px;
    & > div {
      margin-bottom: 30px;
    }
  }
  .bottom {
    margin-top: 20px;
  }
}
</style>
