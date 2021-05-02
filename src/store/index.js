import Vue from 'vue'
import Vuex from 'vuex'
// import * as $ from 'jquery';

Vue.use(Vuex)

const state = {
  planes: [],
  previousTimestamp: null,
}

const mutations = {
  ADD_PLANE(state, plane){
    state.planes.push(plane)
  },
}

const getters = {
  planes: state => state.planes,
  previousTimestamp: state => state.previousTimestamp,
}

const actions = {
  updatePlanes: (store, url) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.send()
    xhr.onload = function() {
      let obj = xhr.response;
      if (state.previousTimestamp !== obj['time'] && state.previousTimestamp <= obj['time']) {
        state.previousTimestamp = obj['time']
        state.planes.splice(0, state.planes.length)
        if (obj['states'] != null || typeof obj['states'] !== undefined) {
          for (let i = 0; i < obj['states'].length; i++) {
            store.commit('ADD_PLANE', obj['states'][i])
          }
        }
      }
    }
  },
}

export default new Vuex.Store({
  state: state,
  mutations: mutations,
  getters: getters,
  actions: actions
})
