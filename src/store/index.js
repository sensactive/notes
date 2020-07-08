import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import notes from './notes';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    notes,
  },
  plugins: [createPersistedState()],
});
