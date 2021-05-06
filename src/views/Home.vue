<template>
  <div id="home">
    <GmapMap
      id="map"
      ref="map"
      :center="{ lat: 46, lng: 2 }"
      :options="option"
      @click="selectAircraft(null)"
      @drag="resize()"
      @zoom_changed="resize()"
    >
      <night-overlays></night-overlays>
      <plane-marker hidden></plane-marker>
    </GmapMap>
    <aircraft-info></aircraft-info>
  </div>
</template>
<script>
import { styles } from "../assets/map/mapStyle";
import vuex from "vuex";
/*
COMPONENTS
 */
import PlaneMarker from "../components/map/PlaneMarker";
import NightOverlays from "../components/map/NightOverlays";
import AircraftInfo from "../components/info/AircraftInfo";
export default {
  name: 'Home',
  components: {
    AircraftInfo,
    PlaneMarker,
    NightOverlays,
  },
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
    ...vuex.mapActions(['updatePlanes', 'selectAircraft']),
    resize: function() {
      console.log('resized')
    },
    changeUrl: function(northEast, southWest) {
      const url = 'https://opensky-network.org/api/states/all'
          + '?lamin='+southWest.lat()
          + '&lomin='+southWest.lng()
          + '&lamax='+northEast.lat()
          + '&lomax='+northEast.lng()
      this.updatePlanes(url)
    },
  },
  computed: {
    ...vuex.mapGetters(['selectedAircraft']),
  },
  mounted: function () {
    this.$refs.map.$mapPromise.then((map) => {
      this.map = map
    });
    window.setInterval(() => {
      var bounds = this.map.getBounds();
      var screenNorthEast = bounds.getNorthEast(); // LatLng of the north-east screen corner
      var screenSouthWest = bounds.getSouthWest(); // LatLng of the south-west screen corner
      this.changeUrl(screenNorthEast, screenSouthWest)
    }, 10000)
  }
}
</script>
<style lang="scss">
#home {
  width: 100vw;
  height: 100vh;

  #map {
    width: 100%;
    height: 100%;
  }
}
</style>