<template lang="pug">
  .note-list-sc.p-2
    .note-list.py-2(v-if="notes.length")
      .note-list__item.py-1.mx-3(v-for="(note, index) in notes" :key="index")
        .note-list__item-title.h0.uc
          span.text {{ note.name }}
          .edit.my-btn(
            @click="openEdit($event, index)"
          )
            span(:class="getScreenOrientation === 3 ? 'pxs' : ''") edit
          confirm-dialog.delete(@click="deleteItem($event, index)")
            template(v-slot:activator)
              .my-btn.bg-red
                span(:class="getScreenOrientation === 3 ? 'pxs' : ''") delete
        .note-list__item-todos
          li.note-todo.ml-5(v-for="(todo, index) in note.todoList.slice(0, 3)")
           | {{ todo.text }}
          a.ml-5(href="" @click.prevent="openEdit($event, index)" v-if="note.todoList.length > 3" )
           | more...
    .d-flex.a-i-c.j-c-c.pelg(v-else) Empty...
    .my-btn.bg-green.mt-1(@click="openEdit")
      span.h0 Add New Note
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import ConfirmDialog from '@/components/common/ConfirmDialog.vue';

export default {
  name: 'List',
  components: { ConfirmDialog },
  computed: {
    ...mapState({
      notes: (state) => state.notes.noteList,
    }),
    ...mapGetters(['getScreenOrientation']),
  },
  data: () => ({
    showEdit: false,
  }),
  methods: {
    ...mapMutations(['deleteNote']),
    openEdit(e, index) {
      this.$router.push({ name: 'edit', params: { index } });
    },
    deleteItem(e, index) {
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
        position: relative;
        border-bottom: 1px solid lightgray;
        &-todos {
          .note-todo {
            word-break: break-all;
          }
        }
        &-title {
          display: grid;
          grid-template-columns: 1fr 10vw 10vw;
          grid-column-gap: 1vw;
          span {
            margin-top: auto;
            margin-bottom: auto;
          }
        }
      }
    }
  }
  .screen-vertical {
    .note-list-sc {
      border-radius: unset;
      box-shadow: inset 0 0 15px rgba(2, 2, 2, 0.5);
      background: none;
      .note-list {
        max-height: 70vh;
        &__item {
          &-title {
            grid-template-columns: 1fr 17vw;
            grid-template-rows: 1fr 1fr;
            grid-row-gap: 1vh;
            .text {
              grid-area: 1 / 1 / 3 / 2;
            }
          }
        }
      }
    }
  }
</style>
