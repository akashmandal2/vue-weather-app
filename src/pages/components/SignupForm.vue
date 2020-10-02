<template>
    <div class="container">
      <div class="row">
        <card class="card-signup" header-classes="text-center" color="black">
          <template slot="header">
            <h3 class="card-title title-up">Sign Up</h3>
            <div class="social-line">
              <a
                href="#"
                class="btn btn-neutral btn-facebook btn-icon btn-round"
              >
                <i class="fab fa-facebook-square"></i>
              </a>
              <a
                href="#"
                class="btn btn-neutral btn-twitter btn-icon btn-lg btn-round"
              >
                <i class="fab fa-twitter"></i>
              </a>
              <a
                href="#"
                class="btn btn-neutral btn-google btn-icon btn-round"
              >
                <i class="fab fa-google-plus"></i>
              </a>
            </div>
          </template>
          <template>
            <fg-input
              class="no-border"
              placeholder="First Name..."
              addon-left-icon="now-ui-icons users_circle-08"
              @required=true
              v-model="user.firstName"
              v-on:blur="checkFn"
            >
            </fg-input>
            <p class="text-danger" v-show="showFnErr">{{fnErr}}</p>
            <fg-input
              class="no-border"
              placeholder="Last Name..."
              addon-left-icon="now-ui-icons text_caps-small"
              @required=true
              v-model="user.lastName"
              v-on:blur="checkLn"
            >
            </fg-input>
            <p class="text-danger" v-show="showLnErr">{{lnErr}}</p>
            <fg-input
              class="no-border"
              placeholder="Email"
              type="email"
              addon-left-icon="now-ui-icons ui-1_email-85"
              @required=true
              v-model="user.email"
              v-on:blur="checkEmail"
            >
            </fg-input>
            <p class="text-danger" v-show="showUNErr">{{unErr}}</p>
            <fg-input
              class="no-border"
              placeholder="Password"
              type="password"
              addon-left-icon="now-ui-icons ui-1_email-85"
              @required=true
              v-model="user.password"
              v-on:blur="checkPwd"
            >
            </fg-input>
            <p class="text-danger" v-show="showPwdErr">{{pwdErr}}</p>
          </template>
          <p class="text-danger" v-show="showErrMsg">{{errMsg}}</p>
          <p class="text-success" v-show="showSuccessMsg">{{successMsg}}</p>
          <div class="card-footer text-center">
            <n-button type="neutral" round size="lg" @click="signup" :disabled="isDisabled">Signup</n-button>
          </div>
        </card>
      </div>
    </div>
</template>
<script>
import { Card, FormGroupInput, Button } from '@/components';
import {mapActions} from 'vuex';
export default {
  data() {
    return {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        locations: []
      },
      errMsg: 'Email exists! Try with different email',
      fnErr: 'First name is a required field',
      lnErr: 'Last name is a required field',
      unErr: 'Email is a required field',
      pwdErr: 'Password is a required field',
      successMsg: 'Registration Successful! Login to continue',
      showErrMsg: false,
      showUNErr: false,
      showPwdErr: false,
      showFnErr: false,
      showLnErr: false,
      showSuccessMsg: false
    }
  },
  computed: {
    isDisabled(){
        return  ('' == this.user.firstName || '' == this.user.lastName || '' == this.user.email || '' == this.user.password);
      }
  },
  components: {
    Card,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput
  },
  methods: {
    ...mapActions([
      'register'
    ]),
    checkPwd: function(){
      this.showPwdErr = ('' == this.user.password);
      this.showErrMsg = false;
    },
    checkEmail: function(){
      this.showUNErr = ('' == this.user.email);
      this.showErrMsg = false;
    },
    checkFn: function(){
      this.showFnErr = ('' == this.user.firstName);
      this.showErrMsg = false;
    },
    checkLn: function(){
      this.showLnErr = ('' == this.user.lastName);
      this.showErrMsg = false;
    },
    signup: function(){
      this.register(this.user).then(response => {
        if('REGISTRATION_SUCCESS' == response){
          this.showSuccessMsg = true;
        }
        else if('EMAIL_EXISTS' == response){
          this.showErrMsg = true;
        }
      });
    }
  }
};
</script>
<style>
.card-signup
{
  max-width: 1000px!important;
}
</style>
