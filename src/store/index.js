import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import notes from './notes';

Vue.use(Vuex);

const notesState = createPersistedState({
  paths: ['notes'],
});

export default new Vuex.Store({
  modules: {
    notes,
  },
  plugins: [notesState],
});
