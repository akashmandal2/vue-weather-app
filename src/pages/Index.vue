<template>
  <div>
    <div class="page-header clear-filter" filter-color="orange">
      <parallax
        class="page-header-image"
        style="background-image:url('img/header.jpg')"
      >
      </parallax>
      <div class="container">
        <div class="content-center brand top-48p">
          <!-- <img class="n-logo" src="img/now-logo.png" alt="" /> -->
          <h1 class="h1-seo">Weather App</h1>
          <h3>A beautiful Bootstrap 4 UI Vue JS Weather app integrated with OpenWeather.</h3>
          <current-weather-section v-show="showWeather" :wReport="currentWeather" :showSaveOption="true"></current-weather-section>
          <search-section @report:update="updateReport"></search-section>
        </div>
        
      </div>
    </div>
  </div>
</template>
<script>
import SearchSection from './components/SearchSection';
import CurrentWeatherSection from './components/CurrentWeatherSection';

export default {
  name: 'index',
  bodyClass: 'index-page',
  components: {
    SearchSection,
    CurrentWeatherSection
  },
  data() {
        return {
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
    updateReport: function(data){
      this.currentWeather = data;
    }
  }
};
</script>
<style>
.less-height{height:320px !important}
.top-48p{top:48%!important}
</style>
