<template>
  <div id="alert" v-if="isOpen">
      <div id="left">
          <div id="expand-icon">
              <img src="../assets/expand.svg" alt="" />
          </div>
          <div id="content">
              <div style="font-weight: bold; display: inline;">Try fullscreen mode</div><br>
              <div style="font-size: 12px; display: inline;">Consider going fullscreen for better experience</div>
          </div>
      </div>
      <div id="right">
          <div id="top" :class="{active: closeActive}" @mousedown="closeActive = true" @mouseup="closeActive = false" @mouseleave="closeActive = false" @click="isOpen = false">
              Close
          </div>
          <div id="bottom" :class="{active: fsActive}" @mousedown="fsActive = true" @mouseup="fsActive = false" @mouseleave="fsActive = false" @click="goFullScreen">
              Fullscreen
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: "Alert",
    data() {
        return {
            closeActive: false,
            fsActive: false,
            isOpen: true,
            isFullscreen: false
        }
    },
    methods: {
        goFullScreen(){
            var elem = document.documentElement;
            if (
                document.fullscreenEnabled || 
                document.webkitFullscreenEnabled || 
                document.mozFullScreenEnabled ||
                document.msFullscreenEnabled
            ) {
                if(!this.isFullscreen){
                if (elem.requestFullscreen) {
                    elem.requestFullscreen().then().catch(err => {console.log(err)});
                    this.isFullscreen = true;
                } else if (elem.webkitRequestFullscreen) {
                    elem.webkitRequestFullscreen().then().catch(err => {console.log(err)});
                    this.isFullscreen = true;
                } else if (elem.mozRequestFullScreen) {
                    elem.mozRequestFullScreen().then().catch(err => {console.log(err)});
                    this.isFullscreen = true;
                } else if (elem.msRequestFullscreen) {
                    elem.msRequestFullscreen().then().catch(err => {console.log(err)});
                    this.isFullscreen = true;
                }
                this.isOpen = false;
                } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen().then().catch(err => {console.log(err)});
                    this.isFullscreen = false;
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen().then().catch(err => {console.log(err)});
                    this.isFullscreen = false;
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen().then().catch(err => {console.log(err)});
                    this.isFullscreen = false;
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen().then().catch(err => {console.log(err)});
                    this.isFullscreen = false;
                }
                }
            }
        }
    }
}
</script>

<style scoped>
    #alert {
        width: 325px;
        height: 64px;
        position: relative;
        float: right;
        left: 350px;
        top: 50px;
        z-index: 100;
        display: flex;
        border-radius: 8px;
        background: linear-gradient(rgb(203, 219, 218), rgb(236, 236, 236));
        box-shadow: 10px 15px 50px 10px rgba(0, 0, 0, 0.473);
        animation: slide-left 0.5s forwards ease-out;
        animation-delay: 10s;
    }

    #left {
        width: 250px;
        height: 64px;
        border-right: 1px solid rgba(128, 128, 128, 0.5);
        display: flex;
        align-items: center;
    }

    #expand-icon {
        height: 30px;
        width: 30px;
        min-width: 30px;
        min-height: 30px;
        max-height: 30px;
        max-width: 30px;
        border-radius: 15px;
        position: relative;
        left: 15px;
        display: flex;
        justify-content: center;
        background-color: rgb(50, 215, 75);
        border: 1px solid rgba(128, 128, 128, 0.2);
    }

    #content {
        width: 193px;
        position: relative;
        left: 25px;
        font-size: 14px;
    }
    #right {
        width: 75px;
        height: 64px;
    }

    #top, #bottom {
        width: 75px;
        height: 32px;
        font-size: 14px;
        font-weight: 500;
        text-align: center;
        vertical-align: center;
        line-height: 32px;
    }

    #top {
        border-bottom: 1px solid rgba(128, 128, 128, 0.5);
        border-radius: 0 8px 0 0;
    }

    #bottom {
        border-radius: 0 0 8px 0;
    }

    .active {
        background-color: rgb(59, 113, 212);
        color: white;
    }

    @keyframes slide-left {
        100% {
            left: -20px;
        }
    }
</style>