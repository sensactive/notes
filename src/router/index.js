import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '@/pages/Main.vue';
import Edit from '@/pages/Edit.vue';
import Layout from '@/components/Layout.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'main',
        component: Main,
      },
      {
        path: '/edit/:index',
        name: 'edit',
        component: Edit,
        props: true,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
