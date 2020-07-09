<template lang="pug">
  div
    button(@click="openEdit") Create
    div(v-for="(note, index) in notes" :key="index") {{ note }}
      button(@click="openEdit($event, index)") Edit
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

<style scoped>

</style>
