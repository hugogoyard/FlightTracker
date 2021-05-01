import Vue from 'vue'
import Vuex from 'vuex'
import * as $ from 'jquery';

Vue.use(Vuex)

const state = {
  planes: [],
  previousTimestamp: null,
  selected: null,
}

const mutations = {
  ADD_PLANE(state, plane){
    state.planes.push(plane)
  },
}

const getters = {
  planes: state => state.planes,
  previousTimestamp: state => state.previousTimestamp,
  selected: state => state.selected,
}

const actions = {
  addPlanes: (store, plane) => {
    store.commit('ADD_PLANE', plane)
  },
  updatePlanes: (store) => {
    $.ajax('https://hugogoyard:kehuyo39@opensky-network.org/api/states/all',{
      type: 'GET',
      dataType: 'json',
      timeout: 100000
    }).done(function (data) {
      if (state.previousTimestamp !== data['time'] && state.previousTimestamp <= data['time']) {
        state.previousTimestamp = data['time']
        state.planes.splice(0, state.planes.length)
        store.commit('ADD_PLANE', data['states'])
      }
    }).fail(function (xhr, ajaxOptions, thrownError) {
      console.log('An error has been found : ' + thrownError);
    })
  },
  setSelected: (store, airplane) => {
    store.commit('IS_SELECTED', airplane)
  }
}

export default new Vuex.Store({
  state: state,
  mutations: mutations,
  getters: getters,
  actions: actions
})
