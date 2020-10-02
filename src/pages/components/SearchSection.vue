<template>
   <div id="inputs">
     <div class="row" v-if="showSpinner">
         <div class="col-sm-12 col-lg-12">
          <div class="spinner-grow text-light"></div>
          <div class="spinner-grow text-light"></div>
          <div class="spinner-grow text-light"></div>
        </div>
      </div>
      <div class="row justify-center">
        <div class="col-sm-1 col-lg-1" v-if="showingBrowserLoc">
          <el-tooltip class="item" content="Update Your Curent Location" placement="top">
            <a
              class="nav-link"
              rel="tooltip"
              data-placement="bottom"
              href="#"
              @click.prevent="getLocation"
            >
              <i class="fa fa-location-arrow color-cfb"></i>
              <p class="d-lg-none d-xl-none">Reload</p>
            </a>
          </el-tooltip>
        </div>
        <div class="col-sm-1 col-lg-1" v-else>
          <el-tooltip class="item" content="Your Current Location" placement="top">
            <a
              class="nav-link"
              rel="tooltip"
              data-placement="bottom"
              href="#"
              @click.prevent="getLocation"
            >
              <i class="fa fa-map-marker color-cfb"></i>
              <p class="d-lg-none d-xl-none">GPS</p>
            </a>
          </el-tooltip>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 col-lg-12">
          <fg-input
              addon-right-icon="now-ui-icons ui-1_zoom-bold"
              placeholder="Search Cities.."
              class="no-transparent"
              v-model="cityField"
            >
            </fg-input>
            <ul class="suggestions">
              <li class="sug-items" @click="updateCity(city)" v-for="city in citySuggestions" :key="city.lat">{{city.name}}, {{city.country}}</li>
            </ul>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 col-lg-12">
          <div class="section section-notifications" id="notifications">
            <fade-transition>
              <div class="alert alert-danger" role="alert" v-show="showGPSError">
                <div class="container">
                  <slot name="dismiss-icon">
                    <slot>
                      <div class="alert-icon">
                        <i class="now-ui-icons objects_support-17"></i>
                        </div>
                        <strong>Sorry!&emsp;</strong> {{gpsError}}
                    </slot>
                    <button
                      type="button"
                      class="close"
                      aria-label="Close"
                      @click="closeAlert"
                    >
                      <span aria-hidden="true">
                        <i class="now-ui-icons ui-1_simple-remove"></i>
                      </span>
                    </button>
                  </slot>
                </div>
              </div>
            </fade-transition>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
// import { Navbar } from '@/components';
import {FormGroupInput} from '@/components';
import { FadeTransition } from 'vue2-transitions';
import { Tooltip } from 'element-ui';
export default {
  data() {
        return {
          cityField: '',
          city: '',
          citySuggestions : new Array(),
          allCities : require('../../assets/city.data.json'),
          showGPSError: false,
          showingBrowserLoc: false,
          gpsError: '',
          showSpinner: false
        }
  },
  watch : {
		cityField : function() {
			this.city = '';
			if(this.cityField.length >= 3){
				this.fetchSuggestions();
      }
      else{
        this.citySuggestions = new Array();
      }
		}
  },
  methods : {
    fetchSuggestions : function() {
      this.citySuggestions = new Array();
      let sugCount = 0;
      for(let i=0;i<this.allCities.length;i++){
        if(this.allCities[i].name.toLowerCase().indexOf(this.cityField.toLowerCase()) == 0){
          this.citySuggestions.push(this.allCities[i])
          sugCount++;
        }
        if(sugCount==10)
          break;
      }
    },
    updateCity : function(city) {
      this.showSpinner = true;
      this.cityField = '';
      this.citySuggestions = new Array();
      this.fetchWeather(city.name, city.country, city.lat, city.lon);
      this.showingBrowserLoc = false;
      localStorage.setItem('owa-last-searched-loc', '{"name":"'+city.name+'","country":"'+city.country+'","lat":'+city.lat+',"lon":'+city.lon+'}');
    },
    fetchWeather : function(name, country, lat, lon){
      this.axios.get('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&exclude=hourly,daily,minutely&appid=661a41de4aac8cec7f809c212cad96b4&units=metric')
      .then((response) => {
        let finalObj = JSON.parse('{"name":"'+name+'","country":"'+country+'","report":null}');
        finalObj.report = response.data
        this.$emit('report:update', finalObj);
        this.showSpinner = false;
      })
    },
    getLocation : function(){
      this.showSpinner = true;
      if(!navigator.geolocation) {
        this.showError('Geolocation is not supported by your browser');
      } else {
        navigator.geolocation.getCurrentPosition(this.getLocationSuccess, this.getLocationError);
      }
    },
    getLocationError : function(){
      this.showError('There was some problem feteching your location.');
    },
    getLocationSuccess : function(position) {
        localStorage.setItem('owa-last-gps-loc', '{"name":"","country":"","lat":'+position.coords.latitude+',"lon":'+position.coords.longitude+'}');
        this.fetchWeather('', '', position.coords.latitude, position.coords.longitude);
        this.showingBrowserLoc = true;
        this.closeAlert();
    },
    showError : function(err) {
      this.gpsError = err;
      this.showGPSError = true;
    },
    closeAlert : function() {
      this.gpsError = '';
      this.showGPSError = false;
    },
  },
  mounted() {
    let loc = JSON.parse(localStorage.getItem('owa-last-gps-loc'));
    this.showingBrowserLoc = true;
    if(null == loc){
      this.showingBrowserLoc = false;
      loc = JSON.parse(localStorage.getItem('owa-last-searched-loc'));
    }
    if(null != loc){
      this.showSpinner = true;
      this.fetchWeather(loc.name, loc.country, loc.lat, loc.lon);
    }
  },
  components: {
    [FormGroupInput.name]: FormGroupInput,
    FadeTransition,
    [Tooltip.name]: Tooltip
  }
};
</script>
<style>
.no-transparent > .input-group > input{background-color: white !important;}
ul{
	list-style:none;
}
.sug-items{
  font-size:1.1em;
  cursor:pointer;
}
.sug-items:hover{
  background: radial-gradient(#000000, transparent);
}
.color-cfb{
  color: cornflowerblue!important;
}
.input-group .input-group-append .input-group-text, .form-group .input-group-append .input-group-text {
    padding: 10px 18px 10px 4px !important;
}
.justify-center{
  justify-content: center!important;
}
</style>
