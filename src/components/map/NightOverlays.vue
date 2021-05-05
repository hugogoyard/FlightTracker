<template>
  <div>
    <GmapCircle
        class="nite-overlays"
        :center="this.getShadowPosition()"
        :radius="this.getShadowRadiusFromAngle(0.56666)"
        :options="{
          fillColor: '#000000',
          fillOpacity: 0.1,
          strokeOpacity: 0
        }"
        @click="selectAircraft(null)"
        :draggable="false"
        :editable="false"
    />
    <GmapCircle
        class="nite-overlays"
        :center="this.getShadowPosition()"
        :radius="this.getShadowRadiusFromAngle(6)"
        :options="{
          fillColor: '#000000',
          fillOpacity: 0.1,
          strokeOpacity: 0
        }"
        @click="selectAircraft(null)"
        :draggable="false"
        :editable="false"
    />
    <GmapCircle
        class="nite-overlays"
        :center="this.getShadowPosition()"
        :radius="this.getShadowRadiusFromAngle(12)"
        :options="{
          fillColor: '#000000',
          fillOpacity: 0.1,
          strokeOpacity: 0
        }"
        @click="selectAircraft(null)"
        :draggable="false"
        :editable="false"
    />
    <GmapCircle
        class="nite-overlays"
        :center="this.getShadowPosition()"
        :radius="this.getShadowRadiusFromAngle(18)"
        :options="{
          fillColor: '#000000',
          fillOpacity: 0.1,
          strokeOpacity: 0
        }"
        @click="selectAircraft(null)"
        :draggable="false"
        :editable="false"
    />
  </div>
</template>

<script>
/* Nite v1.7 re-adapted version Version with vuejs and vue2-gooogle-maps
* A tiny library to create a night overlay over the map
* Author: Rossen Georgiev @ https://github.com/rossengeorgiev
* Requires: GMaps API 3
*/
import vuex from "vuex";

export default {
  name: 'niteOverlays',
  data() {
    return {
      center: this.getShadowPosition(),
      date: null,
      sun_position: this.calculatePositionOfSun(),
      earth_radius_meters: 6371008,
    }
  },
  methods: {
    ...vuex.mapActions(['selectAircraft']),
    getShadowRadiusFromAngle: function(angle) {
      var shadow_radius =  this.earth_radius_meters * Math.PI * 0.5;
      var twilight_dist = ((this.earth_radius_meters * 2 * Math.PI) / 360) * angle;
      return shadow_radius - twilight_dist;
    },
    getSunPosition: function() {
      return this.sun_position;
    },
    getShadowPosition: function() {
      return (this.sun_position) ? { lat: -this.sun_position.lat, lng: this.sun_position.lng + 180 } : null;
    },
    refresh: function() {
      this.sun_position = this.calculatePositionOfSun(this.date);
      var shadow_position = this.getShadowPosition();
      this.center = {lat: shadow_position.lat, lng: shadow_position.lng}
    },
    jday: function(date) {
      return (date.getTime() / 86400000.0) + 2440587.5;
    },
    calculatePositionOfSun: function(date) {
      date = (date instanceof Date) ? date : new Date();

      var rad = 0.017453292519943295;

      // based on NOAA solar calculations
      var ms_past_midnight = ((date.getUTCHours() * 60 + date.getUTCMinutes()) * 60 + date.getUTCSeconds()) * 1000 + date.getUTCMilliseconds();
      var jc = (this.jday(date) - 2451545)/36525;
      var mean_long_sun = (280.46646+jc*(36000.76983+jc*0.0003032)) % 360;
      var mean_anom_sun = 357.52911+jc*(35999.05029-0.0001537*jc);
      var sun_eq = Math.sin(rad*mean_anom_sun)*(1.914602-jc*(0.004817+0.000014*jc))+Math.sin(rad*2*mean_anom_sun)*(0.019993-0.000101*jc)+Math.sin(rad*3*mean_anom_sun)*0.000289;
      var sun_true_long = mean_long_sun + sun_eq;
      var sun_app_long = sun_true_long - 0.00569 - 0.00478*Math.sin(rad*125.04-1934.136*jc);
      var mean_obliq_ecliptic = 23+(26+((21.448-jc*(46.815+jc*(0.00059-jc*0.001813))))/60)/60;
      var obliq_corr = mean_obliq_ecliptic + 0.00256*Math.cos(rad*125.04-1934.136*jc);

      var lat = Math.asin(Math.sin(rad*obliq_corr)*Math.sin(rad*sun_app_long)) / rad;

      var eccent = 0.016708634-jc*(0.000042037+0.0000001267*jc);
      var y = Math.tan(rad*(obliq_corr/2))*Math.tan(rad*(obliq_corr/2));
      var rq_of_time = 4*((y*Math.sin(2*rad*mean_long_sun)-2*eccent*Math.sin(rad*mean_anom_sun)+4*eccent*y*Math.sin(rad*mean_anom_sun)*Math.cos(2*rad*mean_long_sun)-0.5*y*y*Math.sin(4*rad*mean_long_sun)-1.25*eccent*eccent*Math.sin(2*rad*mean_anom_sun))/rad);
      var true_solar_time_in_deg = ((ms_past_midnight+rq_of_time*60000) % 86400000) / 240000;

      var lng = -((true_solar_time_in_deg < 0) ? true_solar_time_in_deg + 180 : true_solar_time_in_deg - 180);

      return {lat: lat,lng: lng };
    },
    setDate: function(date) {
      this.date = date;
      this.refresh();
    },
  },
  computed: {
    ...vuex.mapGetters(['selected'])
  },
  mounted() {
    window.setInterval(() => {
      this.refresh()
    }, 8000)
  }
}
</script>

<style scoped>

</style>