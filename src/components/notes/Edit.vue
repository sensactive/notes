<template lang="pug">
  .edit-dialog-sc(v-if="value")
    .edit-dialog-inner
      .edit-dialog-inner__form
        div {{ formData }}
        input(v-model="formData.name")
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
      currentItemIndex: (state) => state.notes.currentItemIndex,
    }),
  },
  data: () => ({
    formData: {},
  }),
  created() {
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
    ...mapMutations(['setNewNote', 'setCurrentItemIdx']),
    cancel() {
      this.setCurrentItemIdx('');
      this.$emit('input', false);
    },
    saveRecord() {
      this.setNewNote({ idx: this.currentItemIndex, item: this.formData });
      console.log(this.currentItemIndex)
      this.cancel();
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
