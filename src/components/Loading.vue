<template>
  <transition name="loaded">
    <div id="main" v-if="!desktopImageLoaded">
    <img src="../assets/apple.webp" alt="apple">
    <div id="load-parent">
      <div id="loading"></div>
    </div>
  </div>
  </transition>
  
</template>

<script>
export default {
  name: "Loading",
  props: {
    desktopImageLoaded: Boolean
  },
  data() {
    return {
      width: window.innerWidth + 'px',
      height: window.innerHeight + 'px'
    }
  }
}
</script>

<style scoped>
    #main {
        position: absolute;
        background-color: black;
        width: 100%;
        height: 100%;
        z-index: 10003;
    }

    img {
      width: 122px;
      height: 150;
      display: block;
      position: relative;
      top: 400px;
      margin: 0 auto;
    }

    #load-parent {
      width: 300px;
      height: 5px;
      background-color:rgb(90, 86, 86);
      border: 1px solid white;
      border-radius: 8px;
      display: block;
      position: relative;
      top: 500px;
      margin: 0 auto;
    }

    #loading {
      width: 0px;
      height: 5px;
      background-color: white;
      border-radius: 7px 0px 0px 8px ;
      animation: loading 6s forwards;
    }

    .loaded-leave-active {
      animation: loaded 1s forwards;
    }

    @keyframes loading {
      0% {
        width: 0px;
      }
      10% {
        width: 40px;
      }

      20% {
        width: 40px;
      }
      30% {
        width: 100px;
      }

      50% {
        width: 130px;
      }
      60% {
        width: 130px;
      }
      70% {
        width: 130px;
      }
      80% {
        width: 200px;
      }
      100% {
        width: 300px;
      }
    }

    @keyframes loaded {
      0% {
        opacity: 1;
      }
      99% {
        opacity: 0;
      }
      100% {
        opacity: 0;
      }
    }
</style>