import Vue from 'vue'
import Vuex from 'vuex'
// import * as $ from 'jquery';

Vue.use(Vuex)

var previousTimestamp = null;

const state = {
  planes: [],
  selectedAircraft: null,
  mapZoom: null,
}

const mutations = {
  ADD_PLANE(state, plane){
    state.planes.push(plane)
  },
  SET_SELECTED(state, plane) {
    state.selectedAircraft = plane
  },
  SET_MAP_ZOOM(state, mapZoom) {
    state.mapZoom = mapZoom
  }
}

const getters = {
  planes: state => state.planes,
  selectedAircraft: state => state.selectedAircraft,
  mapZoom: state => state.mapZoom,
}

const actions = {
  updatePlanes: (store, url) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.send()
    xhr.onload = function() {
      let obj = xhr.response;
      if (previousTimestamp !== obj['time'] && previousTimestamp < obj['time']) {
        previousTimestamp = obj['time']
        state.planes.splice(0, state.planes.length)
        if (obj['states'] != null && obj['states'].length > 0) {
          for (let i = 0; i < obj['states'].length; i++) {
            if (state.selectedAircraft !== null && obj['states'][i][0] === state.selectedAircraft[0]){
              store.commit('SET_SELECTED', obj['states'][i])
            }
            store.commit('ADD_PLANE', obj['states'][i])
          }
        }else {
          xhr.onabort
        }
      }
    }
  },
  selectAircraft: (store, aircraft) => {
    store.commit('SET_SELECTED', aircraft)
  },
  setMapZoom: (store, mapZoom) => {
    store.commit('SET_MAP_ZOOM', mapZoom)
  }
}

export default new Vuex.Store({
  state: state,
  mutations: mutations,
  getters: getters,
  actions: actions
})
