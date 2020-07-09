<template lang="pug">
  .edit-dialog-sc
    .edit-dialog-inner
      .edit-dialog-inner__form
        div {{ formData }}
        input(
          v-model="formData.name"
          placeholder="Insert Title"
        )
      .edit-dialog-inner__actions
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
  },
  data: () => ({
    formData: {},
  }),
  mounted() {
    if (this.isEditing) {
      this.formData = JSON.parse(JSON.stringify(this.notes[this.itemIndex]));
    }
  },
  props: {
    value: { type: Boolean, default: () => false },
    item: { type: Object, default: () => null },
  },
  watch: {
    item(to) {
      if (to) {
        this.formData = { ...{}, ...this.formData, ...to };
      }
    },
  },
  methods: {
    ...mapMutations(['addNote', 'updateNote', 'setCurrentItemIdx']),
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
  },
};
</script>

<style lang="scss">
  .edit-dialog {
    &-sc {
      display: flex;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: rgba(0, 0, 0, .3);
    }
    &-inner {
      width: 30vw;
      height: 40vw;
      background: white;
      margin: auto;
      padding: 3vw;
      box-sizing: border-box;
      border-radius: 10px;
      box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.25);
      display: grid;
      grid-template-rows: 5fr 1fr;
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
