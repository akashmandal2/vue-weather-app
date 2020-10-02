<template>
  <footer
    class="footer"
    :class="{ [`footer-${type}`]: type }"
    :data-background-color="backgroundColor"
  >
    <div class="container">
      <nav>
        <ul>
          <li>
           Powered By :
          </li>
          <li>
            <a href="https://vuejs.org/">
              Vue
            </a>
          </li>
          <li>
            <a href="https://openweathermap.org/">
              Open Weather
            </a>
          </li>
          <li>
            <a href="https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API">
              Geolocation API
            </a>
          </li>
          <!-- <li>
            <a href="https://firebase.google.com/">
              Firebase
            </a>
          </li> -->
        </ul>
      </nav>
      <div class="copyright">
        &copy; {{ year }}, Designed for
        <a href="#/about" rel="noopener"
          >Learning Purpose</a> by
        <a href="#/about" rel="noopener"
          >Akash</a>.
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  props: {
    backgroundColor: String,
    type: String
  },
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>
<style></style>
