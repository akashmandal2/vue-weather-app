<template>
  <div>
    <div class="page-header clear-filter" filter-color="orange">
      <parallax
        class="page-header-image"
        style="background-image:url('img/bg5.jpg')"
      >
      </parallax>
      <div class="container">
        <h3 class="title tt-caps">{{user.firstName}} {{user.lastName}}</h3>
        <p class="category tt-none">{{user.email}}</p>
        <div class="content">
          <div class="social-description">
            <h2>{{user.locations.length}}</h2>
            <p id="weather-report">Saved Locations</p>
          </div>
        </div>
        <current-weather-section v-show="showWeather" :wReport="currentWeather" :showSaveOption="false"></current-weather-section>
        <h3 class="title" v-if="user.locations.length > 0">My Saved Locations</h3>
        <div class="row">
          <div class="col-lg-3 col-sm-12"></div>
          <div class="col-lg-6 col-sm-12">
            <card class="text-center" v-for="loc in savedLocations" :key="loc.lat">
              <h4 class="card-title">{{loc.name}}, {{loc.country}}</h4>
              <div class="row">
                <div class="col-lg-6 col-sm-12">
                  <button class="btn btn-info btn-round btn-block" @click="getWeather(loc)">Get Weather</button>
                </div>
                <div class="col-lg-6 col-sm-12">
                  <button class="btn btn-danger btn-round  btn-block" @click="deleteLocation(loc.name, loc.country)">Delete Location</button>
                </div>
              </div>
            </card>
          </div>
          <div class="col-lg-3 col-sm-12"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Card } from '@/components';
import { mapActions } from 'vuex';
import CurrentWeatherSection from './components/CurrentWeatherSection';

export default {
  name: 'profile',
  bodyClass: 'profile-page',
  components: {
    Card,
    CurrentWeatherSection
  },
  data(){
    return{
      user: this.$store.getters.getCurrentUser,
      savedLocations: {},
      currentWeather: null,
      showWeather: false
    }
  },
  watch: {
    currentWeather: function(){
      if(this.currentWeather != null)
        this.showWeather=true;
      else
        this.showWeather=false;
    }
  },
  methods: {
    ...mapActions([
      'removeLocation'
    ]),
    deleteLocation: function(n, c){
      this.removeLocation({
        email: this.user.email,
        location: {
          name: n,
          country: c
        }
      }).then(response => {
        for(let j=this.savedLocations.length-1; j>=0;j--){
              if(this.savedLocations[j].name === n && this.savedLocations[j].country === c)
              this.savedLocations.splice(j,1);
              this.currentWeather = null;
          }
      })
    },
    getWeather: function(loc){
      this.axios.get('https://api.openweathermap.org/data/2.5/onecall?lat='+loc.lat+'&lon='+loc.lon+'&exclude=hourly,daily,minutely&appid=661a41de4aac8cec7f809c212cad96b4&units=metric')
      .then((response) => {
        let finalObj = JSON.parse('{"name":"'+loc.name+'","country":"'+loc.country+'","report":null}');
        finalObj.report = response.data
        this.currentWeather = finalObj;
        document.getElementById('weather-report').scrollIntoView({behavior: "smooth"});      
      })
    }
  },
  mounted(){
    this.savedLocations = this.user.locations;
  }
};
</script>
<style scoped>
.card{
  background: transparent!important;
}
.card-body{
  padding: 0!important
}
.page-header{
      max-height: max-content!important;
}
.tt-caps{
  text-transform: capitalize!important;
}
.tt-none{
  text-transform: none!important;
}
</style>
