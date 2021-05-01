<template>
  <div id="home">
    <GmapMap
        id="map"
        :center="{ lat: 46, lng: 2 }"
        :options="option"
    >
<!--      <GmapMarker-->
<!--          v-for="(s) in starlinks"-->
<!--          :key="s['spaceTrack']['OBJECT_NAME']"-->
<!--          :position="{lat: parseFloat(s['latitude']), lng: parseFloat(s['longitude'])}"-->
<!--          :clickable="true"-->
<!--          :title="s['spaceTrack']['OBJECT_NAME'].toUpperCase() + ' | ' + Math.round(s['height_km']) + 'km'"-->
<!--          :icon="markerStarlinkOptions"-->
<!--      />-->
    </GmapMap>
  </div>
</template>

<script>
import { styles } from '../map/mapStyle'
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