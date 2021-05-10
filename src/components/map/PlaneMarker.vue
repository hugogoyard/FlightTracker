<template>
  <div id="marker">
    <GmapMarker
      v-for="(plane) in planes"
      ref="markers"
      :key="'marker_'+plane[0]"
      :position="{lat: parseFloat(plane[6]), lng: parseFloat(plane[5])}"
      @click="selectAircraft(plane);"
      :title="plane[1]"
      :icon="{url: getIcon(plane),anchor: {x: 15, y: 15},scaledSize: {width: 30, height: 30, f: 'px', b: 'px'}}"
    />
  </div>
</template>
<script>
import vuex from 'vuex'
import { iconManager } from "../../map/markerIcon";
export default {
  name: "PlaneMarker",
  methods: {
    ...vuex.mapActions(['selectAircraft']),
    getIcon: function(aircraft) {
      if (this.selectedAircraft != null && this.selectedAircraft[0] === aircraft[0]) {
        return iconManager.getActiveIconOrientedUrl(aircraft[10]);
      } else {
        return iconManager.getIconOrientedUrl(aircraft[10]);
      }
    },
    // getHoveredIcon: function (aircraft, key) {
    //   this.$refs.planes[key].$markerObject.setIcon({
    //     url: iconManager.getActiveIconOrientedUrl(aircraft[10]),
    //     anchor: {x: 15, y: 15},
    //     scaledSize: {width: 30, height: 30, f: 'px', b: 'px'},
    //   })
    // },
    // removeHoveredIcon: function (aircraft, key) {
    //   if (this.selectedAircraft == null || this.selectedAircraft[0] !== aircraft[0]) {
    //     this.$refs.planes[key].$markerObject.setIcon({
    //       url: iconManager.getIconOrientedUrl(aircraft[10]),
    //       anchor: {x: 15, y: 15},
    //       scaledSize: {width: 30, height: 30, f: 'px', b: 'px'},
    //     })
    //   }
    // }
  },
  computed: {
    ...vuex.mapGetters(['planes', 'selectedAircraft', 'mapZoom']),
  },
}
</script>

<style lang="scss">
//label marker
//:label="{
//text: plane[1],
//color: '#ffffff',
//className: 'markerLabel',
//fontSize: '13',
//fontWeight: '600',
//paddingLeft: '50px'
//}"
.markerLabel {
  position: fixed;
  padding: 7px 10px;
  border: 1px solid transparent;
  border-radius: 5px;
  margin: -5px 0 0 20px;
  white-space: nowrap;
  hyphens: none;
  text-shadow: 0 0 0 1px #000;
  line-height: 1.1em;
  user-select: none;
  background: rgba(0,0,0,0.3);
  display: none;
}
</style>