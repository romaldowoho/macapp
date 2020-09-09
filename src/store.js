import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      folders: {
          games: {
              isActive: false,
              left: window.innerWidth - 100,
              top: 50
          },
          projects: {
              isActive: false,
              left: window.innerWidth - 100,
              top: 150
          }
      },
      items: {
          github: {

          }
      },
      windows: {
        folders: {
            games: {
                isOpen: false,
                left: 300,
                top: 200,
                prevLeft: 300, 
                prevTop: 200, 
                height: 400,
                width: 700,
                transition: false
            },
            projects: {
                isOpen: false,
                left: 0,
                top: 0
            }
        },
        imessage: {
            isOpen: false,
            isMinimized: false,
            isMaximized: false,
            left: 300,
            top: 200,
            prevLeft: 300, 
            prevTop: 200
        }
      }
  }
});