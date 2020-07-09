export default {
  state: {
    noteList: [],
    currentItemIndex: '',
  },
  mutations: {
    setNoteList(state, list) { state.noteList = list; },
    setCurrentItemIdx(state, idx) { state.currentItemIndex = idx; },
    addNote(state, item) { state.noteList.unshift(item); },
    updateNote(state, { idx, item }) { state.noteList[idx] = item; },
  },
};
