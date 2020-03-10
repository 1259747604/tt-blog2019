<template>
  <div id="app">
    <div class="header b-b1">
      <div @click="backHome">
        <span class="c-y1" style="letter-spacing: 10px;">TT</span>
        <span style="color:#fff">帮</span>
      </div>
      <div>
        <Button @click="showLogin" v-if="!ifLogin">进入江湖</Button>
        <Button @click="inAccount" v-if="ifLogin">帮派大厅</Button>
        <Button @click="exit" v-if="ifLogin">退隐江湖</Button>
      </div>
    </div>
    <div class="container">
      <router-view></router-view>
    </div>
    <Modal v-model="modal" :footer-hide="true">
      <div slot="header" class="c-y1">用户登录</div>
      <Form
        ref="formValidate"
        :model="formItem"
        :rules="ruleValidate"
        :label-width="80"
      >
        <FormItem label="用户名" prop="username">
          <Input
            v-model="formItem.username"
            style="width:350px"
            placeholder="请输入用户名"
          />
        </FormItem>
        <FormItem label="密码" prop="pwd">
          <Input
            v-model="formItem.pwd"
            type="password"
            style="width:350px"
            password
            placeholder="密码"
          />
        </FormItem>
      </Form>
      <div class="footer">
        <Button @click="loginUser">登录</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modal: false,
      ifLogin: false,
      formItem: {
        username: '',
        pwd: ''
      },
      userInfo: {},
      ruleValidate: {
        username: {
          required: true,
          message: '用户名不能为空',
          trigger: 'blur'
        },
        pwd: { required: true, message: '密码不能为空', trigger: 'blur' }
      }
    };
  },
  mounted() {
    this.checkUser();
  },
  methods: {
    // 检测用户状态
    checkUser() {
      this.$axios
        .get('/checkLogin')
        .then(res => res.data)
        .then(res => {
          console.log('checkUser -> res', res);
          if (res.keepStatus) {
            this.ifLogin = true;
            this.userInfo = res.session;
          } else {
            this.$router.push({ name: 'Home' }).catch(err => err);
          }
        });
    },
    // 显示登录模态框
    showLogin() {
      this.modal = true;
    },
    // 登录用户
    loginUser() {
      this.$refs.formValidate.validate(valid => {
        if (valid) {
          this.$axios
            .post('/login', [this.formItem.username, this.formItem.pwd])
            .then(res => res.data)
            .then(res => {
              if (res.data.length) {
                this.$Message.success({ content: '登录成功' });
                this.modal = false;
                this.ifLogin = true;
                this.userInfo = res.session;
                return;
              } else {
                this.$Message.error({ content: '用户名或密码不正确' });
              }
            });
        }
      });
    },
    //进入个人中心
    inAccount() {
      this.$router
        .push({
          name: 'backstage',
          params: { id: this.userInfo.id }
        })
        .catch(err => {
          err;
        });
    },
    // 退出
    exit() {
      this.$axios
        .post('/exit')
        .then(res => res.data)
        .then(res => {
          if (res.result) {
            this.ifLogin = false;
            if (this.$route.name !== 'Home') {
              this.backHome();
            }
          }
        });
    },
    // 回到主页
    backHome() {
      this.$router.push({ name: 'Home' }).catch(err => err);
    }
  }
};
</script>
<style lang="less">
@import './common/style.less';
html,
body {
  width: 100%;
  height: 100%;
}
</style>
<style lang="less" scoped>
#app {
  width: 100%;
  height: 100%;
  user-select: none;
  overflow: hidden;
  & > div:nth-child(1) {
    padding: 0 15px;
    height: 60px;
    display: flex;
    line-height: 60px;
    border-bottom: 1px solid #565454;
    & > div:nth-child(1) {
      width: 83%;
      padding-left: 15px;
      font-size: 32px;
      font-weight: bold;
      cursor: pointer;
    }
    & > div:nth-child(2) {
      width: 17%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 20px;
      & button {
        border-radius: 100px;
        width: 120px;
        /deep/ span {
          font-size: 16px;
          color: #7d7c6c;
        }
      }
    }
  }
  & > div:nth-child(2) {
    height: calc(100% - 60px);
  }
}
/deep/ .ivu-modal-header {
  background: #000;
}
/deep/ .ivu-modal {
  top: 200px;
}
.footer {
  display: flex;
  justify-content: flex-end;
  padding: 0 50px;
}
</style>
