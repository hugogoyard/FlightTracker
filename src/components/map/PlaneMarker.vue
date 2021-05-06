<template>
  <div id="marker">
    <GmapMarker
      v-for="(plane) in planes"
      :key="'marker_'+plane[0]"
      :position="{lat: parseFloat(plane[6]), lng: parseFloat(plane[5])}"
      :clickable="true"
      @click="selectAircraft(plane)"
      :title="plane[1]"
      :icon="{
        url: getIcon(plane),
        anchor: {x: 15, y: 15},
        scaledSize: {width: 30, height: 30, f: 'px', b: 'px'},
        rotation: 10
      }"
    />
    <custom-marker
      v-for="(plane) in planes"
      :key="'label_'+plane[0]"
      :marker="{lat: parseFloat(plane[6]), lng: parseFloat(plane[5])}"
    >
      <div>
        <div class="aircraft-info">
          <span class="callsign">{{ plane[1] }}</span>
          <span class="icao">{{ plane[0] }}</span>
        </div>
      </div>
    </custom-marker>
  </div>
</template>
<script>
import vuex from 'vuex'
import { iconManager } from "../../assets/map/markerIcon";
import CustomMarker from "./CustomMarker";
export default {
  name: "PlaneMarker",
  components: {
    CustomMarker,
  },
  methods: {
    ...vuex.mapActions(['selectAircraft']),
    getIcon: function(aircraft) {
      if (this.selectedAircraft != null && this.selectedAircraft[0] === aircraft[0]) {
        return iconManager.getActiveIconOrientedUrl(aircraft[10]);
      } else {
        return iconManager.getIconOrientedUrl(aircraft[10]);
      }
    },
  },
  computed: {
    ...vuex.mapGetters(['planes', 'selectedAircraft']),
  },
}
</script>

<style lang="scss" scoped>
.marker {
  width: 30px;
  height: auto;
  background: no-repeat 15px center;
  cursor: pointer;
}

.aircraft-info {
  position: absolute;
  top: 20%;
  transform: translate(40%);
  display: flex;
  flex-direction: column;

  div button {
    -webkit-appearance: none;
    background: none;
    border: none;
  }

  .callsign {
    font-size: 13px;
    font-weight: 500;
    color: white;
    text-transform: uppercase;
  }

  .icao {
    font-size: 11px;
    color: white;
    text-transform: uppercase;
  }
}
</style>