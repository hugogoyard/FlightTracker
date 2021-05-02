<template>
  <div id="home">
    <GmapMap
      id="map"
      ref="map"
      :center="{ lat: 46, lng: 2 }"
      :options="option"
    >
      <GmapMarker
        v-for="(plane) in planes"
        :key="plane[0]"
        :position="{lat: parseFloat(plane[6]), lng: parseFloat(plane[5])}"
        :clickable="true"
        :title="plane[1]"
        :icon="{
          url: getIconOrientedUrl(plane[10]),
          anchor: {x: 12.5, y: 12.5},
          scaledSize: {width: 25, height: 25, f: 'px', b: 'px'},
        }"
      />
    </GmapMap>
  </div>
</template>
<script>
import { iconManager } from '../map/markerIcon'
import vuex from 'vuex'
import { styles } from "../map/mapStyle";
export default {
  name: 'Home',
  data () {
    return {
      map: null,
      option: {
        minZoom: 2,
        zoom: 6,
        tilt: 0,
        backgroundColor: '#121415',
        zoomControl: false,
        panControl: false,
        fullscreenControl: false,
        scaleControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        clickableLabels: false,
        clickableIcons: false,
        gestureHandling: "greedy",
        mapSphere: true,
        restriction: {
          latLngBounds: {
            north: 85,
            south: -85,
            west: -180,
            east: 180,
          },
        },
        styles,
      },
    }
  },
  methods: {
    ...vuex.mapActions(['updatePlanes']),
    getIconOrientedUrl(angle) {
      return iconManager.getIconOrientedUrl(angle)
    },
    changeUrl(northEast, southWest) {
    // changeUrl() {
      const url = 'https://opensky-network.org/api/states/all'
        + '?lamin='+southWest.lat()
        + '&lomin='+southWest.lng()
        + '&lamax='+northEast.lat()
        + '&lomax='+northEast.lng()
        // + '?extended=false'
      this.updatePlanes(url)
    }
  },
  computed: {
    ...vuex.mapGetters(['planes']),
  },
  mounted: function () {
    window.setInterval(() => {
      this.$nextTick(() => {
        this.$refs.map.$mapPromise.then((map) => {
          var bounds = map.getBounds();
          var screenNorthEast = bounds.getNorthEast(); // LatLng of the north-east screen corner
          var screenSouthWest = bounds.getSouthWest(); // LatLng of the south-west screen corner
          this.changeUrl(screenNorthEast, screenSouthWest)
        });
      })
    }, 10000)
  }
}
</script>
<style lang="scss">
#home {
  width: 100vw;
  height: 100vh;
  color: white;

  #map {
    width: 100%;
    height: 100%;
  }
}
</style>