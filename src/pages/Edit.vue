<template lang="pug">
  .edit-sc
    .edit-inner
      .edit-inner__form
        input.edit-inner__form-title(
          v-model="formData.name"
          placeholder="Insert Title"
        )
        .todo-item.ml-4(
          v-for="(todo, index) in formData.todoList"
          :key="index"
        )
          .mr-2.index {{ index + 1 }}
          input(v-model="todo.text")
          input.mr-2(v-model="todo.done" type="checkbox")
          .remove-sc.d-flex
            .edit-inner__form-remove(
              @click="removeTodo(index)"
            ) +
        .edit-inner__form-add(
          @click="addTodo"
        ) +
      .edit-inner__actions
        .edit-inner__form-additional-actions.mr-1(v-if="isEditing")
          button.mt-1(
            v-if="changedData"
            @click="cancelChanges"
          ) Cancel Changes
          button(
            v-if="canceledChanges"
            @click="returnChanges"
          ) Return Changes
        button.mr-1(@click="cancel") Cancel
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
    addTodo() {
      this.formData.todoList.push({
        text: '',
        done: false,
      });
      this.changedData = true;
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
      width: 30vw;
      height: 30vw;
      background: white;
      margin: auto;
      padding: 3vw;
      border-radius: 10px;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
      display: grid;
      grid-template-rows: 5fr 1fr;
      &__form {
        &-title {
          height: 5vh!important;
          font-size: 3vh;
          text-align: center;
          font-weight: 700;
        }
        .todo-item {
          display: grid;
          grid-template-columns: 2vw 3fr 2vw 2vw;
          border-bottom: 1px solid gray;
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
            height: 100%;
          }
        }
        &-add {
          font-size: 2vw;
          font-weight: 700;
          color: green;
          cursor: pointer;
          display: inline-block;
          user-select: none;
        }
        &-remove {
          user-select: none;
          font-size: 2vw;
          font-weight: 700;
          color: red;
          cursor: pointer;
          transform: rotate(45deg);
          position: absolute;
          right: 0;
          max-height: 2vw;
        }
      }
      &__actions {
        display: flex;
        align-self: center;
        justify-self: flex-end;
      }
    }
  }
</style>
