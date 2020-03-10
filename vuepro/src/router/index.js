import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// 此处加上tt是为了nginx配置匹配
const routes = [
  {
    path: '/tt',
    name: 'Home',
    component: reslove => require(['../views/Home.vue'], reslove)
  },
  {
    path: '/tt/detail/:id',
    name: 'articledetail',
    component: reslove => require(['../components/ArticleDetail.vue'], reslove)
  },
  {
    path: '/tt/backstage/:id',
    name: 'backstage',
    component: reslove => require(['../views/BackStage.vue'], reslove),
    children: [
      {
        path: 'analyse',
        name: 'analyse',
        component: reslove => require(['../components/Analyse.vue'], reslove)
      },
      {
        path: 'article',
        name: 'article',
        component: reslove =>
          require(['../components/ArticleList.vue'], reslove)
      },
      {
        path: 'article1',
        name: 'article1',
        component: reslove => require(['../components/Article1.vue'], reslove)
      },
      {
        path: 'articletype',
        name: 'articletype',
        component: reslove =>
          require(['../components/ArticleType.vue'], reslove)
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
