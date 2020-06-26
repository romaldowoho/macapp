import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      folders: {
          Games: {
              isActive: false,
              left: window.innerWidth - 100,
              top: 50
          },
          Projects: {
              isActive: false,
              left: window.innerWidth - 100,
              top: 150
          }
      }
  }
});