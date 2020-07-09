<template lang="pug">
  .edit-sc
    .edit-inner
      .edit-inner__form
        div {{ formData }}
        input(
          v-model="formData.name"
          placeholder="Insert Title"
        )
        div(
          v-for="(todo, index) in formData.todoList"
          :key="index"
        )
          input(v-model="todo.text")
          input(v-model="todo.done" type="checkbox")
        .edit-inner__form-add(
          @click="addTodo"
        ) +
        .edit-inner__form-additional-actions(v-if="itemIndex")
          button(
            v-if="changedData"
            @click="cancelChanges"
          ) Cancel Changes
          button(
            v-if="canceledChanges"
            @click="returnChanges"
          ) Return Changes
      .edit-inner__actions
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
      box-sizing: border-box;
      border-radius: 10px;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
      display: grid;
      grid-template-rows: 5fr 1fr;
      &__form {
        &-add {
          font-size: 3vw;
          font-weight: 700;
          color: green;
          cursor: pointer;
        }
      }
      &__actions {
        align-self: flex-end;
        justify-self: flex-end;
        button {
          margin: .3vw;
        }
      }
    }
  }
</style>
