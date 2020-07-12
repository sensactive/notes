<template lang="pug">
  .main-page-sc.h-100
    .title.p-2 My Notes
    note-list
</template>

<script>
import NoteList from '@/components/notes/List.vue';

export default {
  name: 'Main',
  components: { NoteList },
};
</script>

<style lang="scss">
  .screen-horizontal {
    .main-page-sc {
      display: grid;
      grid-template-columns: 1fr 2.5fr;
      .title {
        font-size: 5vw;
        font-weight: 700;
      }
    }
  }
</style>
