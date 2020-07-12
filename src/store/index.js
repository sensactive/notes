import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import notes from './notes';
import ui from './ui';

Vue.use(Vuex);

const notesState = createPersistedState({
  paths: ['notes'],
});

export default new Vuex.Store({
  modules: {
    notes,
    ui,
  },
  plugins: [notesState],
});
