<template>
  <navbar
    position="fixed"
    type="primary"
    :transparent="transparent"
    :color-on-scroll="colorOnScroll"
    menu-classes="ml-auto"
  >
    <template>
      <router-link v-popover:popover1 class="navbar-brand" to="/">
        Weather App
      </router-link>
      <el-popover
        ref="popover1"
        popper-class="popover"
        placement="bottom"
        width="200"
        trigger="hover"
      >
        <div class="popover-body">
          Simple Intuitive Weather App
        </div>
      </el-popover>
    </template>
    <template slot="navbar-menu">
      <drop-down
              tag="li"
              title="Profile"
              icon="now-ui-icons users_single-02"
              class="nav-item"
      >
        <nav-link to="/login"
          v-show="!sessionActive"
        >
          <i class="now-ui-icons objects_key-25"></i> Login
        </nav-link>
        <button
            @click="signout"
            class="blank-btn dropdown-item router-link-active"
            v-show="sessionActive"
        >
            <i class="now-ui-icons ui-1_lock-circle-open"></i> Logout
        </button>
        <nav-link to="/locations">
          <i class="now-ui-icons location_compass-05"></i> Locations
        </nav-link>
      </drop-down>
      <li class="nav-item">
        <a
          class="nav-link"
          rel="tooltip"
          title="Follow us on Twitter"
          data-placement="bottom"
          href="https://twitter.com/"
          target="_blank"
        >
          <i class="fab fa-twitter"></i>
          <p class="d-lg-none d-xl-none">Twitter</p>
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          rel="tooltip"
          title="Like us on Facebook"
          data-placement="bottom"
          href="https://www.facebook.com/"
          target="_blank"
        >
          <i class="fab fa-facebook-square"></i>
          <p class="d-lg-none d-xl-none">Facebook</p>
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          rel="tooltip"
          title="Follow us on Instagram"
          data-placement="bottom"
          href="https://www.instagram.com/"
          target="_blank"
        >
          <i class="fab fa-instagram"></i>
          <p class="d-lg-none d-xl-none">Instagram</p>
        </a>
      </li>
    </template>
  </navbar>
</template>

<script>
import { DropDown, Navbar, NavLink } from '@/components';
import { Popover } from 'element-ui';
import {mapActions} from 'vuex';
export default {
  name: 'main-navbar',
  data() {
    return {
      sessionActive: false
    }
  },
  props: {
    transparent: Boolean,
    colorOnScroll: Number
  },
  methods: {
    ...mapActions(['logout']),
    signout: function() {
      this.logout().then(response => {
        if(window.location.hash != '#/')
          this.$router.push('/');
      });
    }
  },
  mounted() {
    setInterval(()=>{
      this.sessionActive = this.$store.getters.isSessionActive;
    },100);
  },
  components: {
    DropDown,
    Navbar,
    NavLink,
    [Popover.name]: Popover
  }
};
</script>

<style scoped>
.blank-btn{
  background: none!important;
  border: none!important;
}
.blank-btn:hover{
  background-color: rgba(222, 222, 222, 0.3)!important;
}
.blank-btn.active{
    background-color: #f96332!important;
    color: white!important;
}
</style>
