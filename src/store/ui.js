export default {
  state: {
    screenOrientation: 1,
  },
  mutations: {
    setScreenOrientation(state, orientation) { state.screenOrientation = orientation; },
  },
  getters: {
    getScreenOrientation: (state) => state.screenOrientation,
  },
};
