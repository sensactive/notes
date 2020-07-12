<template lang="pug">
  #app.h-100.black
    router-view
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import ConfirmDialog from './components/common/ConfirmDialog.vue';

export default {
  name: 'App',
  components: { ConfirmDialog },
  computed: {
    ...mapGetters(['getScreenOrientation']),
  },
  methods: {
    ...mapMutations(['setScreenOrientation']),
    // детектор соотношений экрана для адаптива
    onResize() {
      const el = document.body;
      const ar = window.innerWidth / window.innerHeight;
      if (ar > 1.3) {
        el.classList.remove('screen-vertical');
        this.setScreenOrientation(1);
        el.classList.add('screen-horizontal');
      } else {
        el.classList.remove('screen-horizontal');
        this.setScreenOrientation(3);
        el.classList.add('screen-vertical');
      }
    },
  },
  mounted() {
    this.onResize();
    window.addEventListener('resize', this.onResize);
  },
};
</script>
