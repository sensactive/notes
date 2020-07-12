<template lang="pug">
  .edit-sc
    .edit-inner
      .edit-inner__form.w-100
        input.edit-inner__form-title(
          v-model="formData.name"
          placeholder="Insert a Note Title"
        )
        .todo
          .todo-item.ml-4(
            v-for="(todo, idx) in formData.todoList"
            :key="idx"
          )
            .index {{ idx + 1 }}
            input(v-model="todo.text")
            input.mr-2(v-model="todo.done" type="checkbox")
            .remove-sc
              .edit-inner__form-remove(
                @click="removeTodo(idx)"
              ) +
        .edit-inner__form-add
          span Add Todo
          span.mx-3.btn(
            @click="addTodo"
          ) +
      .edit-inner__actions
        .edit-inner__form-additional-actions(v-if="isEditing")
          button(
            v-if="changedData"
            @click="cancelChanges"
          ) Cancel Changes
          button(
            v-if="canceledChanges"
            @click="returnChanges"
          ) Return Changes
        button(@click="cancel") Cancel
        button(@click="saveRecord") Save
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'Edit',
  computed: {
    ...mapState({
      notes: (state) => state.notes.noteList,
    }),
    itemIndex() {
      return this.$route.params.index;
    },
    isEditing() {
      return this.itemIndex !== undefined;
    },
    item() {
      return this.notes[this.itemIndex];
    },
    canceledChanges() {
      return Object.keys(this.canceledFormData).length && !this.changedData;
    },
  },
  data: () => ({
    formData: {
      name: '',
      todoList: [],
    },
    canceledFormData: {},
    changedData: false,
  }),
  mounted() {
    if (this.isEditing) {
      this.formData = JSON.parse(JSON.stringify(this.item));
    }
    // отслеживание изменений данных формы
    this.$el.addEventListener('input', () => {
      if (!this.changedData) { this.changedData = true; }
    });
  },
  methods: {
    ...mapMutations(['addNote', 'updateNote']),
    clearState() {
      this.formData = {};
    },
    cancel() {
      this.clearState();
      this.$router.push('/');
    },
    saveRecord() {
      if (this.isEditing) {
        this.updateNote({ idx: this.itemIndex, item: this.formData });
        this.cancel();
      } else {
        this.addNote(this.formData);
        this.cancel();
      }
    },
    async addTodo() {
      this.changedData = true;
      const todoEl = document.querySelector('.todo');
      // создаем промис для добавления элемента в список todos
      const addedNewTodo = new Promise((resolve) => {
        this.formData.todoList.push({
          text: '',
          done: false,
        });
        resolve();
      });
      await addedNewTodo;
      // скролл вниз
      todoEl.scrollTo(0, todoEl.scrollHeight);
    },
    removeTodo(index) {
      this.formData.todoList.splice(index, 1);
      this.changedData = true;
    },
    cancelChanges() {
      this.canceledFormData = JSON.parse(JSON.stringify(this.formData));
      this.formData = JSON.parse(JSON.stringify(this.item));
      this.changedData = false;
    },
    returnChanges() {
      this.formData = JSON.parse(JSON.stringify(this.canceledFormData));
      this.canceledFormData = {};
      this.changedData = true;
    },
  },
  beforeDestroy() {
    this.$el.removeEventListener('input', () => {
      if (!this.changedData) { this.changedData = true; }
    });
  },
};
</script>

<style lang="scss">
  @import "@/_scss/animations.scss";
  .edit {
    &-sc {
      display: flex;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
    &-inner {
      min-width: 30vw;
      background: white;
      margin: auto;
      padding: 3vw;
      border-radius: 10px;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
      display: grid;
      grid-template-rows: 5fr 1fr;
      &__form {
        display: grid;
        grid-template-rows: 7vh auto 7vh;
        &-title {
          width: 100%;
          height: 5vh!important;
          font-size: 3vh;
          text-align: center;
          font-weight: 700;
        }
        .todo {
          min-height: 20vw;
          max-height: 20vw;
          overflow-y: auto;
          &-item {
            display: grid;
            grid-template-columns: 2vw 3fr 2vw 2vw;
            border-bottom: 1px solid gray;
            animation: 1s fade-in;
            * {
              align-self: center;
            }
            .index {
              display: inline-flex;
              border: 1px solid gray;
              border-radius: 50%;
              width: 1.5vw;
              height: 1.5vw;
              align-items: center;
              justify-content: center;
            }
            .remove-sc {
              position: relative;
              display: grid;
            }
          }
        }
        &-add {
          justify-self: right;
          span {
            font-size: 1.2vw;
            font-weight: 700;
            opacity: .6;
          }
          .btn {
            opacity: 1;
            font-size: 2vw;
            color: green;
            cursor: pointer;
            user-select: none;
          };
        }
        &-remove {
          user-select: none;
          font-size: 2vw;
          font-weight: 700;
          color: red;
          cursor: pointer;
          transform: rotate(45deg);
          position: absolute;
        }
      }
      &__actions {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: .5vw;
        align-self: center;
        justify-self: flex-end;
      }
    }
  }
</style>
