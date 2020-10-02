<template>
  <div class="page-header clear-filter" filter-color="orange">
    <div
      class="page-header-image"
      style="background-image: url('img/login.jpg')"
    ></div>
    <div class="content">
      <div class="container">
        <div class="col-md-5 ml-auto mr-auto">
          <card type="login" plain>

            <fg-input
              class="no-border input-lg"
              addon-left-icon="now-ui-icons users_circle-08"
              placeholder="Email..."
              type="email"
              v-model="loginData.email"
              v-on:blur="checkEmail"
            >
            </fg-input>
            <p class="text-danger" v-show="showUNErr">{{unErr}}</p>
            <fg-input
              class="no-border input-lg"
              addon-left-icon="now-ui-icons text_caps-small"
              placeholder="Password..."
              type="password"
              v-model="loginData.password"
              v-on:blur="checkPwd"
            >
            </fg-input>
            <p class="text-danger" v-show="showPwdErr">{{pwdErr}}</p>
            <p class="text-danger" v-show="showErrMsg">{{errMsg}}</p>
            <template slot="raw-content">
              <div class="card-footer text-center">
                <button
                  class="btn btn-primary btn-round btn-lg btn-block"
                  @click="signin"
                  :disabled="isDisabled"
                  >Login</button>
              </div>
              <div class="pull-left">
                <h6>
                  <n-button type="primary" class="link create-acc-btn" @click.native="modals.classic = true">
                    Create Account
                  </n-button>
                </h6>
              </div>
              <div class="pull-right">
                <h6>
                  <a href="#/about" class="link footer-link">Need Help?</a>
                </h6>
              </div>
            </template>
          </card>
        </div>
      </div>
      <!-- Classic Modal -->
    <modal :show.sync="modals.classic" headerClasses="justify-content-center">
      <signup-form></signup-form>
    </modal>
    </div>
    <main-footer></main-footer>
  </div>
</template>
<script>
import { Card, Button, Modal, FormGroupInput } from '@/components';
import MainFooter from '@/layout/MainFooter';
import SignupForm from './components/SignupForm';
import {mapActions} from 'vuex';

export default {
  name: 'login-page',
  bodyClass: 'login-page',
  components: {
    Card,
    MainFooter,
    Modal,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
    SignupForm
  },
  data() {
    return {
      modals: {
        classic: false
      },
      loginData: {
        email: '',
        password: ''
      },
      errMsg: 'Invalid Username or Password.',
      unErr: 'Email is a required field',
      pwdErr: 'Password is a required field',
      showErrMsg: false,
      showUNErr: false,
      showPwdErr: false
    };
  },
  computed: {
    isDisabled(){
        return  ('' == this.loginData.email || '' == this.loginData.password);
      }
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    checkPwd: function(){
      this.showPwdErr = ('' == this.loginData.password);
      this.showErrMsg = false;
    },
    checkEmail: function(){
      this.showUNErr = ('' == this.loginData.email);
      this.showErrMsg = false;
    },
    signin: function(){
      this.login(this.loginData).then(response => {
        console.log(response);
        if('LOGIN_SUCCESS' == response)
          this.$router.push('/');
        else
          this.showErrMsg = true;
      })
    }
  }
};
</script>
<style>
.modal-content .modal-header{
  padding-top: 0!important;
  padding-right: 0!important;
  padding-left: 0!important;
}
.modal-content .modal-body{
  padding-top: 0!important;
  padding-right: 0!important;
  padding-left: 0!important;
  padding-bottom: 0!important;
  height: 480px!important;
}
.modal .modal-header .close{
  color: white!important;
  z-index: 5;
}
.create-acc-btn:hover{
  box-shadow: none!important;
}
.create-acc-btn{
  background: none!important;
  padding: 0!important;
  font-weight: 900!important;
  font-size: 10px!important;
  text-transform: uppercase!important;
  margin: 0!important;
}
</style>
