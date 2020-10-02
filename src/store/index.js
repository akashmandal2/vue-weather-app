import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const db = (null != localStorage.getItem('weather-app-db')) ? JSON.parse(localStorage.getItem('weather-app-db')):JSON.parse('{"users":[]}');
export default new Vuex.Store({
  modules: {

  },
  state: {
    loggedIn: (null != localStorage.getItem('currentUser')),
    sessionActive: (null != sessionStorage.getItem('sessionActive')) ? sessionStorage.getItem('sessionActive'):false,
    curentUser: (null != localStorage.getItem('currentUser')) ? JSON.parse(localStorage.getItem('currentUser')):{}
  },
  actions: {
    addLocation(state, payload){
      for(let i=0;i<db.users.length;i++){
        if(db.users[i].email == payload.email){
          for(let j=db.users[i].locations.length-1; j>=0;j--){
            if(db.users[i].locations[j].name === payload.location.name && db.users[i].locations[j].country === payload.location.country)
              return;
          }
          db.users[i].locations.push(payload.location);
          state.commit('setCurrentUser', db.users[i]);
          localStorage.setItem('weather-app-db', JSON.stringify(db));
          return "SAVED";
        }
      }
    },
    removeLocation(state, payload){
      for(let i=0;i<db.users.length;i++){
        if(db.users[i].email == payload.email){
          for(let j=db.users[i].locations.length-1; j>=0;j--){
              if(db.users[i].locations[j].name === payload.location.name && db.users[i].locations[j].country === payload.location.country)
              db.users[i].locations.splice(j,1);
          }
          state.commit('setCurrentUser', db.users[i]);
          localStorage.setItem('weather-app-db', JSON.stringify(db));
          return "REMOVED";
        }
      }
    },
    login(state, payload){
      let users = db.users;
        for(let i=0;i<users.length;i++){
          if(users[i].email == payload.email){
            if(users[i].password == payload.password){
              state.commit('setSessionActive', true);
              state.commit('setLoggedIn', true);
              state.commit('setCurrentUser', users[i]);
              return 'LOGIN_SUCCESS';
            }
            else
              return 'WRONG_PASSWORD';
          }
        }
        return 'INVALID_EMAIL';
    },
    register(state, payload){
      let users = db.users;
        for(let i=0;i<users.length;i++){
          if(users[i].email == payload.email){
              return 'EMAIL_EXISTS';
          }
        }
        db.users.push(payload);
        localStorage.setItem('weather-app-db', JSON.stringify(db));
        return 'REGISTRATION_SUCCESS';
    },
    logout(state, payload){
      state.commit('setSessionActive', false);
      state.commit('setLoggedIn', false);
      state.commit('setCurrentUser', {});
      localStorage.removeItem('currentUser');
      sessionStorage.removeItem('sessionActive');
    }
  },
  getters: {
    isLoggedIn: state => state.loggedIn,
    isSessionActive: state => state.sessionActive,
    getCurrentUser: state => state.curentUser
  },
  mutations: {
    setLoggedIn(state, payload){
      state.loggedIn = payload;
    },
    setSessionActive(state, payload){
      sessionStorage.setItem('sessionActive',payload);
      state.sessionActive = payload;
    },
    setCurrentUser(state, payload){
      localStorage.setItem('currentUser',JSON.stringify(payload))
      state.curentUser = payload;
    }
  }
})