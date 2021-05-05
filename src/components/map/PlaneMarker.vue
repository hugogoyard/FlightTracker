<template>
  <div id="marker">
    <GmapMarker
        v-for="(plane) in planes"
        :key="plane[0]"
        :position="{lat: parseFloat(plane[6]), lng: parseFloat(plane[5])}"
        :clickable="true"
        @click="selectAircraft(plane)"
        :title="plane[1]"
        :icon="{
          url: getIconOrientedUrl(plane[10]),
          anchor: {x: 12.5, y: 12.5},
          scaledSize: {width: 25, height: 25, f: 'px', b: 'px'},
        }"
    />
  </div>
</template>
<script>
import vuex from 'vuex'
import { iconManager } from "../../assets/map/markerIcon";
export default {
  name: "PlaneMarker",
  methods: {
    ...vuex.mapActions(['selectAircraft']),
    getIconOrientedUrl(angle) {
      return iconManager.getIconOrientedUrl(angle)
    },
  },
  computed: {
    ...vuex.mapGetters(['planes']),
  },

}
</script>

<style scoped>

</style>