<template>
  <div id="home">
    <GmapMap
        id="map"
        :center="{ lat: 46, lng: 2 }"
        :options="option"
    >
      <GmapMarker
          v-for="(plane) in planes[0]"
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
import { styles } from '../map/mapStyle'
import { iconManager } from '../map/markerIcon'
import vuex from 'vuex'
export default {
  name: 'Home',
  data () {
    return {
      option: {
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
    ...vuex.mapActions(['addPlanes','updatePlanes','setSelected']),
    getIconOrientedUrl(angle) {
      return iconManager.getIconOrientedUrl(angle)
    }
  },
  computed: {
    ...vuex.mapGetters(['planes', 'selected']),
  },
  mounted: function () {
    window.setInterval(() => {
      this.updatePlanes()
    }, 5000)
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