<template lang="pug">
  .note-list-sc
    button(@click="openEdit") Add New Note
    .note-list
      .note-list__item(v-for="(note, index) in notes" :key="index")
        .note-list__item-title.h1 {{ note.name }}
          button(@click="openEdit($event, index)") Edit
        .note-list__item-todos
          .note-todo(v-for="(todo, index) in note.todoList") {{ todo.text }}
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'List',
  computed: {
    ...mapState({
      notes: (state) => state.notes.noteList,
    }),
  },
  data: () => ({
    showEdit: false,
  }),
  methods: {
    ...mapMutations(['setNoteList']),
    openEdit(e, index) {
      this.$router.push({ name: 'edit', params: { index } });
    },
  },
};
</script>

<style lang="scss">
  .note-list-sc {
    display: grid;
    grid-template-rows: 10vh 1fr;
    .note-list {
      display: grid;
      &__item {
        display: grid;
        &-title {
        }
      }
    }
  }
</style>
