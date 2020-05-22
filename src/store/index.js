import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    screenShots: [],
    uploadedVideo: null,
    markedVideo: '',
  },
  mutations: {
    SET_SCREENSHOTS(state, images) {
      state.screenShots = images;
    },
    SET_UPLOADED_VIDEO(state, video) {
      state.uploadedVideo = video;
    },
    SET_MARKED_VIDEO(state, video) {
      state.markedVideo = video;
    }
  },
  actions: {

  },
  modules: {

  }
})
