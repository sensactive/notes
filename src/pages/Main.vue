<template lang="pug">
  .main-page-sc.h-100
    .title(
      :class=" getScreenOrientation === 3 ? '' : 'p-2'"
    ) My Notes
    note-list
</template>

<script>
import NoteList from '@/components/notes/List.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'Main',
  computed: {
    ...mapGetters(['getScreenOrientation']),
  },
  components: { NoteList },
};
</script>

<style lang="scss">
  .main-page-sc {
    display: grid;
    grid-template-columns: 1fr 2.5fr;
    .title {
      font-size: 5vw;
      font-weight: 700;
    }
  }
  .screen-vertical {
    .main-page-sc {
      grid-template-columns: 1fr;
      grid-template-rows: 10vh 90vh;
      .title {
        font-size: 5vh;
        font-weight: 700;
        text-align: center;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: white;
      }
    }
  }
</style>
