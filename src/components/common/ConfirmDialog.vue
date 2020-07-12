<template lang="pug">
  div.h-100
    div.h-100(@click.stop="show = true")
      slot(name="activator" )
    .confirm-dialog-sc.p-2(v-if="show")
      .confirm-dialog__inner.round.elevation
        .header.h0.uc.mt-1
          .header-text.text-center {{ title }}
        .question(v-if="question")
          .question-text.text-center {{ question }}
        .actions.p-2
          .my-btn.mr-1(@click.stop="cancel") No
          .my-btn(@click.stop="accept") Yes
</template>

<script>
export default {
  name: 'ConfirmDialog',
  props: {
    title: { type: String, default: () => 'Are you sure?' },
    question: { type: String, default: () => '' },
  },
  data: () => ({
    show: false,
  }),
  methods: {
    closeDialog() {
      this.show = false;
    },
    cancel() {
      this.closeDialog();
    },
    accept() {
      this.$emit('click');
      this.closeDialog();
    },
  },
};
</script>

<style lang="scss">
  .confirm-dialog {
    &-sc {
      position: fixed;
      display: flex;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.3);
    }
    &__inner {
      width: 20vw;
      height: 20vh;
      background: white;
      margin: auto;
      display: grid;
      grid-template-rows: repeat(auto-fill, 1fr) 5vh;
      .header { align-self: center }
      .actions {
        display: grid;
        grid-template-columns: 1fr 1fr;
        justify-self: center;
        align-self: center;
      }
    }
  }
</style>
