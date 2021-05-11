import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
  state: {
    token: localStorage.getItem('token') || null,
    user: null,
  },
  mutations: {
    setUser(state, user){
      state.user = user
    },
    setToken(state, token){
      state.token = token
    },
    logout(state){
      state.user = null
      state.token = null
      sessionStorage.clear();
  },
  },
  actions: {
    async login({commit}, User) {
      const res = await axios.post('auth/login', User);
      const {token, user} = res.data;
      commit('setUser', user);
      commit('setToken', token);
    },
    async logout({commit, state}){
      let user = null
      await axios.post('auth/logout', {}, { 
        headers: {
          'Authorization': `Bearer ${state.token}`
        },
      });
      commit('logout', user)
    },
    async signup({dispatch}, form) {
      await axios.post('auth/signup', form)
      await dispatch('login', {
        email: form.email,
        password: form.password
      })
    },
  },
  getters: {
    isLoggedIn(state) {
      return !!state.token;
    },
    currentUser(state) {
      return state.user;
    },
    token(state) {
      return state.token;
    }
  }
})
