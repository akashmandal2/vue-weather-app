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
            The website features a Signup / Login Option. The Forms haev basic validations.This allows users to save Locations with help of toggle button(shown only when logged in).
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

</style>
