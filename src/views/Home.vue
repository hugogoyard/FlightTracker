<template>
  <div id="home">
    <GmapMap
      id="map"
      ref="map"
      :center="{lat: 46,lng: 2}"
      :options="option"
      @click="selectAircraft(null)"
      @zoom_changed="updateUrl()"
      @dragend="updateUrl()"
    >
      <night-overlays></night-overlays>
      <plane-marker hidden></plane-marker>
    </GmapMap>
    <aircraft-info></aircraft-info>
  </div>
</template>
<script>
import {styles} from "../map/mapStyle";
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
      url: 'https://opensky-network.org/api/states/all',
      map: null,
      option: {
        center: {
          lat: 46,
          lng: 2
        },
        minZoom: 2,
        zoom: 8,
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
    ...vuex.mapActions(['updatePlanes', 'selectAircraft', 'setMapZoom']),
    updateUrl: function() {
      var mapZoom = this.map.getZoom()
      this.setMapZoom(mapZoom)
      var mapCenter = this.map.getCenter()
      var mapCenterLat = mapCenter.lat().toFixed(2)
      var mapCenterLng = mapCenter.lng().toFixed(2)
      window.history.pushState("new_zoom", "Title", '/'+mapCenterLat+','+ mapCenterLng+'/'+mapZoom)
      this.changeFetchUrl()

      /**
       * Save geolocation data in local storage
       */
      localStorage.setItem('map.latitude', mapCenter.lat());
      localStorage.setItem('map.longitude', mapCenter.lng());
      localStorage.setItem('map.zoom', mapZoom);
    },
    changeFetchUrl: function() {
      if (typeof this.map.getBounds() != 'undefined' && this.map != null) {
        var bounds = this.map.getBounds().toJSON();
        this.url = 'https://opensky-network.org/api/states/all'
            + '?lamin='+bounds.south
            + '&lomin='+bounds.west
            + '&lamax='+bounds.north
            + '&lomax='+bounds.east
      }
    },
  },
  computed: {
    ...vuex.mapGetters(['selectedAircraft']),
  },
  mounted: function () {
    this.$refs.map.$mapPromise.then((map) => {
      this.map = map
      if (localStorage.getItem('map.zoom')){
        this.option.zoom = parseInt(localStorage.getItem('map.zoom'))
      }
      if (localStorage.getItem('map.latitude') && localStorage.getItem('map.longitude')) {
        var mapCenterLat = parseFloat(localStorage.getItem('map.latitude'))
        var mapCenterLng = parseFloat(localStorage.getItem('map.longitude'))
        this.option.center.lat = mapCenterLat
        this.option.center.lng = mapCenterLng
      }
    });
    window.setInterval(() => {
      this.updatePlanes(this.url)
    }, 10000)
  },
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