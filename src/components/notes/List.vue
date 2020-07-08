<template lang="pug">
  div
    button(@click="openEdit") Create
    div(v-for="(note, index) in notes" :key="index") {{ note }}
      button(@click="openEdit($event, index)") Edit
    edit(
      v-model="showEdit"
      :item="notes[currentIndex]"
    )
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import Edit from '@/components/notes/Edit.vue';

export default {
  name: 'List',
  components: { Edit },
  computed: {
    ...mapState({
      notes: (state) => state.notes.noteList,
      currentItemIndex: (state) => state.notes.currentItemIndex,
    }),
    currentIndex: {
      get() { return this.currentItemIndex; },
      set(idx) { this.setCurrentItemIdx(idx); },
    },
  },
  data: () => ({
    showEdit: false,
  }),
  methods: {
    ...mapMutations(['setNoteList', 'setCurrentItemIdx']),
    openEdit(e, index) {
      this.currentIndex = index;
      this.showEdit = true;
    },
  },
};
</script>

<style scoped>

</style>
