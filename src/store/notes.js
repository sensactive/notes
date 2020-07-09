export default {
  state: {
    noteList: [],
  },
  mutations: {
    setNoteList(state, list) { state.noteList = list; },
    addNote(state, item) { state.noteList.unshift(item); },
    updateNote(state, { idx, item }) { state.noteList[idx] = item; },
  },
};
