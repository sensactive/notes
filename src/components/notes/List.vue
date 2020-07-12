<template lang="pug">
  .note-list-sc.m-3.p-2
    .note-list.py-2(v-if="notes.length")
      .note-list__item.mx-3(v-for="(note, index) in notes" :key="index")
        .note-list__item-title.h0.uc {{ note.name }}
          .my-btn(@click="openEdit($event, index)") edit
          confirm-dialog(@click="deleteNote($event, index)")
            template(v-slot:activator)
              .my-btn.bg-red delete
        .note-list__item-todos
          li.note-todo.ml-5(v-for="(todo, index) in note.todoList.slice(0, 3)")
           | {{ todo.text }}
          a.ml-5(href="" @click.prevent="openEdit($event, index)" v-if="note.todoList.length > 3" )
           | more...
    .d-flex.a-i-c.j-c-c.pelg(v-else) Empty...
    .my-btn.bg-green.mt-1(@click="openEdit") Add New Note
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import ConfirmDialog from '../common/ConfirmDialog.vue';

export default {
  name: 'List',
  components: { ConfirmDialog },
  computed: {
    ...mapState({
      notes: (state) => state.notes.noteList,
    }),
  },
  data: () => ({
    showEdit: false,
  }),
  methods: {
    ...mapMutations(['deleteNote']),
    openEdit(e, index) {
      this.$router.push({ name: 'edit', params: { index } });
    },
    deleteNote(e, index) {
      this.deleteNote(index);
    },
  },
};
</script>

<style lang="scss">
  .note-list-sc {
    display: grid;
    grid-template-rows: 1fr 10vh;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(2, 2, 2, 0.5);
    background: white;
    .note-list {
      display: grid;
      grid-row-gap: 1vh;
      max-height: 80vh;
      overflow-y: scroll;
      &__item {
        &-todos {
          .note-todo {
            word-break: break-all;
          }
        }
        &-title {
          display: grid;
          grid-template-columns: 1fr 10vw 10vw;
          grid-column-gap: 1vw;
        }
      }
    }
  }
</style>
