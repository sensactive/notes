<template lang="pug">
  .edit-sc
    form.edit-inner.elevation.round(
      @keyup.enter.prevent="saveRecord"
      @submit.prevent="saveRecord"
    )
      .edit-inner__form.w-100
        input.edit-inner__form-title(
          v-model="formData.name"
          placeholder="Insert a Note Title"
          required
        )
        .todo
          .todo-item(
            v-for="(todo, idx) in formData.todoList"
            :key="idx"
            :class="getScreenOrientation === 1 ? 'ml-4' : 'mx-2'"
          )
            .index {{ idx + 1 }}
            input(v-model="todo.text" required)
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
        confirm-dialog.delete(@click="deleteItem" v-if="isEditing")
          template(#activator)
            .my-btn.bg-red delete
        .edit-inner__form-additional-actions(v-if="isEditing")
          .my-btn.bg-yellow(
            v-if="changedData"
            @click="cancelChanges"
          ) Cancel Changes
          .my-btn.bg-yellow(
            v-if="canceledChanges"
            @click="returnChanges"
          ) Return Changes
        confirm-dialog.cancel(
          title="Canceling"
          question="Are you sure you want to cancel editing?"
          @click="cancel"
        )
          template(#activator)
            .my-btn Cancel
        button.my-btn.save(type="submit") Save
</template>

<script>
import { mapMutations, mapState, mapGetters } from 'vuex';
import ConfirmDialog from '@/components/common/ConfirmDialog.vue';

export default {
  name: 'Edit',
  components: { ConfirmDialog },
  computed: {
    ...mapState({
      notes: (state) => state.notes.noteList,
    }),
    ...mapGetters(['getScreenOrientation']),
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
    ...mapMutations(['addNote', 'updateNote', 'deleteNote']),
    clearState() {
      this.formData = {};
    },
    deleteItem() {
      this.deleteNote(this.itemIndex);
      this.$router.push('/');
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
      height: 80vh;
      min-width: 30vw;
      background: white;
      margin: auto;
      padding: 3vw;
      border-radius: 5px;
      display: grid;
      grid-template-rows: 5fr 1fr;
      &__form {
        display: grid;
        grid-template-rows: 7vh auto 7vh;
        &-additional-actions {
          grid-area: 1 / 1 / 1 / 3;
        }
        &-title {
          width: 100%;
          height: 5vh!important;
          font-size: 3vh;
          text-align: center;
          font-weight: 700;
        }
        .todo {
          min-height: 60vh;
          max-height: 60vh;
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
              user-select: none;
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
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr;
        grid-row-gap: 1vh;
        grid-gap: .5vw;
        align-self: center;
        justify-self: flex-end;
        .delete { grid-area: 2 / 1 }
        .cancel { grid-area: 2 / 2 }
        .save { grid-area: 2 / 3  }
      }
    }
  }

  .screen-vertical {
    .edit {
      &-inner {
        height: 80vh;
        &__form {
          .todo {
            min-height: 50vh;
            max-height: 50vh;
            &-item {
              grid-template-columns: 3vh 3fr 3vh 5vh;
              .index {
                width: 2vh;
                height: 2vh;
              }
            }
          }
          &-add {
            span {
              font-size: 2.2vh;
            }
            .btn {
              font-size: 3vh;
            };
          }
          &-remove {
            font-size: 4vh;
            justify-self: center;
          }
          &-additional-actions {
            grid-area: 1 / 1 / 1 / 3;
          }
        }
        &__actions {
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-rows: 1fr 1fr 1fr;
          grid-row-gap: 1vh;
          .delete { grid-area: 2 / 1 }
          .cancel { grid-area: 2 / 2 }
          .save { grid-area: 2 / 3  }
        }
      }
    }
  }
</style>
