import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: reslove => require(['../views/Home.vue'], reslove)
  },
  {
    path: '/backstage/:id',
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
  routes
});

export default router;
