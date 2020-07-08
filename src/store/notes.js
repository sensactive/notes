export default {
  state: {
    noteList: [],
    currentItemIndex: '',
  },
  mutations: {
    setNoteList(state, list) { state.noteList = list; },
    setCurrentItemIdx(state, idx) { state.currentItemIndex = idx; },
    setNewNote(state, { idx, item }) {
      console.log(idx);
      if (idx) {
        state.noteList[idx] = item;
      } else state.noteList.push(item);
    },
  },
};
