<template>
  <transition name="slide-right">
    <div
        class="ac-panel-wrapper ac-info-wrapper"
        v-if="selectedAircraft != null"
    >
      <section class="aircraft-info">
        <h2 v-if="selectedAircraft[1] !== null && selectedAircraft[1].length > 0">
          {{ selectedAircraft[1].toUpperCase() }}
        </h2>
        <h2 v-else>
          No callsign
        </h2>
        <a class="close-trigger" @click="selectAircraft(null)">
          <img :src="require('../../assets/close-icon.svg')" alt="Close icon">
        </a>
      </section>
      <section class="aircraft-sub-info">
        <section>
          <div class="aircraft-icon-panel">
          <!--TODO-->
          </div>
          <div class="aircraft-wrapper">
            <div class="row">
              <div v-if="!!selectedAircraft[2]">
                <span >Country of registration</span>
                <span>
                  {{ selectedAircraft[2] }}
                </span>
              </div>
            </div>
          </div>
        </section>
      </section>
      <section class="aircraft-position">
        <span class="section-name">Aircraft informations</span>
        <section>
          <div class="aircraft-icon-panel">
          <!--TODO-->
          </div>
          <div class="aircraft-wrapper">
            <div class="row">
              <div>
                <span>Ground Speed</span>
                <span v-if="selectedAircraft[9] != null">
                  {{ selectedAircraft[9] }} m/s
                </span>
                <span v-else>
                  N/A
                </span>
              </div>
              <div class="--underline">
                <span>Is on Tarmac</span>
                <span v-if="selectedAircraft[8] === true" style="color: green">
                  Yes
                </span>
                <span v-else-if="selectedAircraft[8] === false" style="color: red">
                  No
                </span>
              </div>
            </div>
            <div class="row">
              <div>
                <span>Baro Altitude</span>
                <span v-if="selectedAircraft[7] !== null">
                  {{ selectedAircraft[7] }} m
                </span>
                <span v-else>
                  0 m
                </span>
              </div>
              <div>
                <span>Vertical speed</span>
                <span v-if="selectedAircraft[11] !== null">
                  {{ selectedAircraft[11] }} m/s
                </span>
                <span v-else>
                  0 m/s
                </span>
              </div>
            </div>
            <div class="row">
              <div>
                <span>Geo Altitude</span>
                <span v-if="selectedAircraft[13] !== null">
                  {{ selectedAircraft[13] }}m
                </span>
                <span v-else>
                  N/A
                </span>
              </div>
              <div>
                <span>Track</span>
                <span v-if="selectedAircraft[10] !== null">
                  {{ selectedAircraft[10] }}°
                </span>
              </div>
            </div>
          </div>
        </section>
      </section>
      <section class="aircraft-lat-and-long-and-com">
        <span class="section-name">Aircraft position & communication</span>
        <section>
          <div class="aircraft-icon-panel">
          <!--TODO-->
          </div>
          <div class="aircraft-wrapper">
            <div class="row">
              <div>
                <span>Icao Address</span>
                <span v-if="selectedAircraft[0] !== null">
                  {{ selectedAircraft[0].toUpperCase() }}
                </span>
                <span v-else>
                  N/A
                </span>
              </div>
              <div>
                <span>Squawk</span>
                <span v-if="selectedAircraft[14] !== null">
                  {{ selectedAircraft[14] }}
                </span>
                <span v-else>
                  N/A
                </span>
              </div>
            </div>
            <div class="row">
              <div>
                <span>Latitude</span>
                <span v-if="!!selectedAircraft[6]">
                  {{ selectedAircraft[6] }}
                </span>
              </div>
              <div>
                <span>Longitude</span>
                <span v-if="!!selectedAircraft[5]">
                  {{ selectedAircraft[5] }}
                </span>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  </transition>
</template>

<script>
import vuex from "vuex";
export default {
  name: "AircraftInfo",
  methods: {
    ...vuex.mapActions(['selectAircraft']),
  },
  computed: {
    ...vuex.mapGetters(['selectedAircraft']),
  },
}
</script>

<style lang="scss">
/** PANEL TRANSITION **/
.slide-right-enter-active, .slide-right-enter {
  animation: showSpaceCraftPanel 300ms ease-out;
}

.slide-right-leave-active, .slide-right-leave-to {
  animation: hideSpaceCraftPanel 300ms ease-in;
}

@keyframes showSpaceCraftPanel {
  0% {transform: translate3d(-100%, 0, 0);}
  100% {transform: translate3d(0, 0, 0);}
}

@keyframes hideSpaceCraftPanel {
  0% {transform: translate3d(0, 0, 0);}
  100% {transform: translate3d(-100%, 0, 0);}
}

.ac-panel-wrapper {
  left: 0;
  top: 0;
  border-radius: 10px;
  position: fixed;
  margin: 10px;
  max-height: calc(100vh - 50px);

  .aircraft-info {
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
  }

  .aircraft-lat-and-long-and-com {
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
  }
}

.ac-info-wrapper {
  display: flex;
  width: 350px;
  flex-direction: column;
  color: white;

  .aircraft-info {
    //background: rgba(0,0,0,0.5);
    //backdrop-filter: saturate(180%) blur(20px);
    background: rgba(43, 43, 44, 1);
    padding: 10px;
    min-height: 40px;

    h2 {
      margin: unset;
      color: #ffc900;
      font-size: 18px;
      font-weight: 600;
      letter-spacing: 1px;
    }

    .close-trigger {
      position: absolute;
      padding: 5px;
      top: 5px;
      right: 5px;
      cursor: pointer;
      transition: 300ms opacity ease-in-out;

      img {
        width: 15px;
        height: 15px;
        filter: invert(1);
      }
    }

    .close-trigger:hover {
      opacity: 0.5;
    }
  }
}

.aircraft-sub-info {
  background: #fff;
  position: relative;
  color: #2b2b2c;
  overflow: auto;
  width: inherit;

  section {
    display: flex;
    padding: 0;
    flex-direction: row;
    width: inherit;

    .aircraft-icon-panel {
      display: flex;
      width: 50px;
      flex-direction: column;
      padding: 5px 0;
      align-items: center;
      justify-content: space-between;
      background: #ddd;
      border-right: 2px solid #fff;

      img {
        width: 32px;
        height: auto;
      }
    }

    .aircraft-wrapper {
      padding: 10px 0 10px 10px;
      background: #efefef;
      width: inherit;
      position: relative;

      .row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;

        div {
          display: flex;
          flex-direction: column;
          width: inherit;
          margin-right: 10px;
          flex-basis: 100%;

          span {
            font-size: 14px;
            font-weight: 600;
            color: #2b2b2c;
          }

          span:first-child {
            text-transform: uppercase;
            font-weight: 400;
            color: #585a5d;
            margin-bottom: 1px;
          }

          span img {
            width: 1.333em;
            height: 1em;
            vertical-align: middle;
            margin: 0;
            padding: 0;
            border: 0.067em solid #dcdcdc;
          }
        }
      }
    }
  }
}

.aircraft-position {
  background: #fff;
  position: relative;
  color: #2b2b2c;
  overflow: auto;
  width: inherit;

  .section-name {
    width: 100%;
    background: #0090ff;
    color: white;
    display: flex;
    font-size: 15px;
    padding: 10px 0;
    justify-content: center;
    align-content: center;
  }

  section {
    display: flex;
    padding: 0;
    flex-direction: row;
    width: inherit;

    .aircraft-icon-panel {
      display: flex;
      width: 50px;
      flex-direction: column;
      padding: 5px 0;
      align-items: center;
      justify-content: space-between;
      background: #ddd;
      border-right: 2px solid #fff;

      img {
        width: 32px;
        height: auto;
      }
    }

    .aircraft-wrapper {
      padding: 10px 0 10px 10px ;
      background: #efefef;
      width: inherit;
      position: relative;

      .row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;

        div {
          display: flex;
          flex-direction: column;
          width: inherit;
          margin-right: 10px;
          flex-basis: 100%;

          span {
            font-size: 14px;
            font-weight: 600;
            color: #2b2b2c;
          }

          span:first-child {
            text-transform: uppercase;
            font-weight: 400;
            color: #585a5d;
            margin-bottom: 1px;
          }

          span img {
            width: 1.333em;
            height: 1em;
            vertical-align: middle;
            margin: 0;
            padding: 0;
            border: 0.067em solid #dcdcdc;
          }
        }
      }
    }
  }
}

.aircraft-lat-and-long-and-com {
  background: #fff;
  position: relative;
  color: #2b2b2c;
  overflow: auto;
  width: inherit;

  .section-name {
    width: 100%;
    background: #0090ff;
    color: white;
    display: flex;
    font-size: 15px;
    padding: 10px 0;
    justify-content: center;
    align-content: center;
  }

  section {
    display: flex;
    padding: 0;
    flex-direction: row;
    width: inherit;

    .aircraft-icon-panel {
      display: flex;
      width: 50px;
      flex-direction: column;
      padding: 5px 0;
      align-items: center;
      justify-content: space-between;
      background: #ddd;
      border-right: 2px solid #fff;

      img {
        width: 32px;
        height: auto;
      }
    }

    .aircraft-wrapper {
      padding: 10px 0 10px 10px ;
      background: #efefef;
      width: inherit;
      position: relative;

      .row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;

        div {
          display: flex;
          flex-direction: column;
          width: inherit;
          margin-right: 10px;
          flex-basis: 100%;

          span {
            font-size: 14px;
            font-weight: 600;
            color: #2b2b2c;
          }

          span:first-child {
            text-transform: uppercase;
            font-weight: 400;
            color: #585a5d;
            margin-bottom: 1px;
          }

          span img {
            width: 1.333em;
            height: 1em;
            vertical-align: middle;
            margin: 0;
            padding: 0;
            border: 0.067em solid #dcdcdc;
          }
        }
      }
    }
  }
}
</style>