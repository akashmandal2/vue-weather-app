<template>
  <div>
    <div class="page-header clear-filter" filter-color="orange">
      <parallax
        class="page-header-image"
        style="background-image:url('img/bg4.jpg')"
      >
      </parallax>
      <div class="container">
        <h3 class="title tt-caps">About the Website</h3>
        <ul>
          <li>
            The website features a Signup / Login Option. The Forms have basic validations.This allows users to save Locations with help of toggle button(shown only when logged in).
          </li>
          <li>
           On toggling OFF, it deletes the location. User can also delete from Locations page.
           </li>
          <li>
            Search can be done from Home page and suggestions are given after typing 3 or more characters. Selecting them will fetch the weather.
          </li>
          <li>
            On top of search bar, is button to fetch current location of the device. This is saved and will be shown in future when website is opened. When current locaiton is shown, the button changed to update current location.
          </li>
          <li>
            App uses Geolocation API to fetch current location, OpenWeather API to fetch the location's weather, Vuex for session management.
          </li>
          <li>
            The app uses Responsive design which makes is compatible in mobile devices as well.
          </li>
          <li>
            App is built using Visual Studio Code for mainly 2 reasons - It is User friendly & I have been using it for 2 years now developing simple HTML/CSS as well as Angular/Vue websites. It has easy options for integrating with plugins needed by me.
          </li>
          <li>
            App source code is hosted in Github - https://github.com/akashmandal2/vue-weather-app
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'about-us'
}
</script>
<style scoped>
ul{
  padding: 0!important;
  font-size: 18px!important;
}
</style>
