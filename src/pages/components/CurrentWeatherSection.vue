<template>
<div class=" clear-filter" filter-color="orange">
  <div class="container" v-if="wReport!=null">
    <h3 v-if="'' == wReport.name" class="title">Your Location</h3>
      <h3 v-else class="title">{{wReport.name}}, {{wReport.country}}</h3> 
    <p class="category">{{wReport.report.timezone}}</p>
    <el-tooltip class="item" content="Save Location" placement="bottom">
      <button  v-if="'' != wReport.name && sessionActive && showSaveOption" class="blank-btn" @click="saveLocation">
      <n-switch
        v-model="isSaved"
        on-text="Saved"
        off-text=""
      ></n-switch>
      </button>
    </el-tooltip>
    <div class="content">
      <div class="social-description">
        <h2 class="size-fit">{{calculateTime(wReport.report.current.dt, wReport.report.timezone_offset)}}</h2>
        <p>{{calculateDate(wReport.report.current.dt, wReport.report.timezone_offset)}}</p>
      </div>
      <div class="social-description">
        <h2>{{wReport.report.current.temp}}&#176;C</h2>
        <p>Feels like {{wReport.report.current.feels_like}}&#176;C</p>
      </div>
      <div class="social-description">
        <h2>{{wReport.report.current.weather[0].main}}</h2>
        <p>{{wReport.report.current.weather[0].description}}</p>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import {Switch} from '@/components';
import { Tooltip } from 'element-ui';
import { mapActions } from 'vuex';
export default {
  data() {
        return {
          savePayload: {
            email: this.$store.getters.getCurrentUser.email,
            location: {
              name: '',
              country: '',
              lat: 0,
              lon: 0
            }
          },
          removePayload: {
            email: this.$store.getters.getCurrentUser.email,
            location: {
              name: '',
              country: ''
            }
          },
          isSaved: false,
          savedLocations: [],
          sessionActive: false
        }
  },
  props: ['wReport','showSaveOption'],
  components: {
    [Switch.name]: Switch,
    [Tooltip.name]: Tooltip
  },
  watch: {
    wReport: function() {
      if(null != this.wReport){
        this.savedLocations = (null != localStorage.getItem('currentUser')) ? JSON.parse(localStorage.getItem('currentUser')).locations : null;
        this.savePayload.location.name = this.removePayload.location.name = this.wReport.name;
        this.savePayload.location.country = this.removePayload.location.country = this.wReport.country;
        this.savePayload.location.lat = this.wReport.report.lat;
        this.savePayload.location.lon = this.wReport.report.lon;
        let p=0;
        if(null != this.savedLocations){
          for(let j=this.savedLocations.length-1; j>=0;j--){
            if(this.savedLocations[j].name == this.wReport.name && this.savedLocations[j].country == this.wReport.country){
              p++;
              break;
            }
          }
        }
        this.isSaved = (p>0);
      }
        
    }
  },
  mounted(){
    setInterval(()=>{
      this.sessionActive = this.$store.getters.isSessionActive;
    },100);
  },
  methods : {
    ...mapActions([
      'addLocation',
      'removeLocation'
    ]),
    saveLocation: function(){
      if(this.isSaved){
        this.addLocation(this.savePayload).then(response => {
        });
      }
      else{
        this.removeLocation(this.removePayload).then(response => {
        });
      }
      
    },
    calculateDate : function(dt, td){
      return new Date((dt+td)*1000).toDateString();
    },
    calculateTime : function(dt, td){
      let t = new Date((dt+td)*1000).toISOString().split('T')[1].split('.')[0];
      let ampm = '';
      let h = parseInt(t.split(':')[0]);
      let m = parseInt(t.split(':')[1]);
      if(h<12){
        ampm = 'AM';
        if(h==0){
          h=12;
        }
      }
      else{
        ampm = 'PM';
        if(h!=12)
        h=h-12;
      }
      if(m<10){
        m='0'+m;
      }
      return h+":"+m+" "+ampm;
    }
  }
};
</script>
<style>
.social-description{
  display: inline-block;
    max-width: 175px;
    width: 175px;
    text-align: center;
    margin: 15px 0 0;
}
.margin-top-4em{
    margin-top: 4em;
}
.blank-btn{
  background: none!important;
  border: none!important;
}
.bootstrap-switch .bootstrap-switch-label{
      margin: 0px -8px !important;
}
.size-fit{
  font-size: 2.3em!important;
}
</style>
