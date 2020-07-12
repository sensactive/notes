<template lang="pug">
  .note-list-sc.m-3.p-2
    .note-list
      .note-list__item(v-for="(note, index) in notes" :key="index")
        .note-list__item-title.h0.uc {{ note.name }}
          button(@click="openEdit($event, index)") Edit
        .note-list__item-todos
          .note-todo(v-for="(todo, index) in note.todoList") {{ todo.text }}
    button.bg-green.mt-1(@click="openEdit") Add New Note
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
    grid-template-rows: 1fr 10vh;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
    background: white;
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
