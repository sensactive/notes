<template lang="pug">
  .main-page-sc
    div
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
  .main-page-sc {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
</style>
