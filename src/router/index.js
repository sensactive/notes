import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '@/pages/Main.vue';
import NoteList from '@/components/notes/List.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      {
        path: '/',
        name: 'noteList',
        component: NoteList,
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
