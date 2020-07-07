<template>
    <div id="window" :style="{left, top, height, width}" :class="{transition}">
      <div id="top-bar" class='draggable'>
          <div v-if="isOpen" id="control-buttons" @mouseover="buttonsActive = true" @mouseleave="buttonsActive = false">
              <div 
                class="control-btn btn-close" 
                :class="{'btn-close-pressed': btnClosePressed}" 
                @mousedown="btnClosePressed = true" 
                @mouseleave="btnClosePressed = false"
                @click="closeWindow"
              >
                  <img v-show="buttonsActive" id="btn-cross" src="../assets/cross.svg" alt="">
              </div>
              <div class="control-btn btn-minimize" :class="{'btn-minimize-pressed': btnMinimizePressed}" @mousedown="btnMinimizePressed = true" @mouseleave="btnMinimizePressed = false">
                  <div v-show="buttonsActive" id="btn-line"></div>
              </div>
              <div class="control-btn btn-expand" :class="{'btn-expand-pressed': btnExpandPressed}" @mousedown="btnExpandPressed = true" @mouseleave="btnExpandPressed = false">
                  <img v-show="buttonsActive" id="btn-expand" src="../assets/expand.svg" alt="">
              </div>
          </div>
          <div id="title" v-if="isOpen">
              <img id="title-img" src="../assets/folder.png" alt="">
              <span id="title-name">{{folderName}}</span>
          </div>
      </div>
      <div id="main">
          <div id="sidebar"></div>
          <div id="content">
              <!-- <Selection /> -->
          </div>
      </div>
  </div>
</template>

<script>
// import Selection from "./Selection";

export default { 
    name: "WindowFolder",
    props: {
        folderName: String
    },
    components: {
        // Selection
    },
    data() {
        return {
            buttonsActive: false,
            btnClosePressed: false,
            btnMinimizePressed: false,
            btnExpandPressed: false
        }
    },
    mounted() {
        this.closeWindow();
    },
    methods: {
        closeWindow() {
            let window = this.$store.state.windows.folders[this.folderName];
            window.transition = true; 
            window.isOpen = false;
            window.prevLeft = window.left;
            window.prevTop = window.top;
            window.height = 0;
            window.width = 0;
            window.left = this.folderLeft + 30;
            window.top = this.folderTop + 30;
            setTimeout(() => {window.transition = false;}, 50);
            this.resetData();
        },
        resetData() {
            this.buttonsActive = false;
            this.btnClosePressed = false;
            this.btnMinimizePressed = false;
            this.btnExpandPressed = false;
        }
    },
    computed: {
        isOpen() {
            return this.$store.state.windows.folders[this.folderName].isOpen;
        },
        transition() {
            return this.$store.state.windows.folders[this.folderName].transition;
        },
        left() {
            return this.$store.state.windows.folders[this.folderName].left + 'px';
        },
        top() {
            return this.$store.state.windows.folders[this.folderName].top + 'px';
        },
        height() {
            return this.$store.state.windows.folders[this.folderName].height + 'px';
        },
        width() {
            return this.$store.state.windows.folders[this.folderName].width + 'px';
        },
        folderLeft() {
            return this.$store.state.folders[this.folderName].left;
        },
        folderTop() {
            return this.$store.state.folders[this.folderName].top;
        }
    }
}
</script>

<style scoped>
    #window {
        position: absolute;
        background-color: rgba(255, 255, 255, 0);
        border-radius: 6px;
        border: 0.5px solid rgba(0, 0, 0, 0.315);
        box-shadow: 10px 15px 50px 10px rgba(0, 0, 0, 0.473);
        z-index: 0;
    }

    .transition {
        transition: all 0.2s;
    }

    #top-bar {
        height: 50px;
        background: linear-gradient(rgb(238, 235, 238), rgb(207, 203, 207));
        border-radius: 6px 6px 0 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.288);
    }

    #title {
        font-size: 13px;
        vertical-align: middle;
        display: inline-block;
        position: relative;
        left: 50%;
        top: -10px;
    }

    #title-img {
        margin: 0;
        height: 16px;
        width: 16px;
    }

    #title-name {
        position: relative;
        top: -3px;
        left: 5px;
    }

    #main {
        width: 100%;
        height: 87.2%;
        display: flex;
    }

    #content {
        width: 80%;
        height: 100%;
        border-radius: 0 0 6px 0;
        background-color: white;
    }

    #sidebar {
        height: 100%;
        width: 20%;
        border-radius: 0 0 0 6px;
        background-color: rgba(220, 220, 220, 0.945);
        border-right: 1px solid rgba(0, 0, 0, 0.062);
    }

    #control-buttons {
        display: flex;
        position: relative;
        top: 5px;
        width: 60px;
    }

    .control-btn {
        height: 10px;
        width: 10px;
        border-radius: 10px;
        margin-left: 7px;
        background-color: rgb(209, 209, 209);
        border: 1px solid rgba(78, 77, 77, 0.274);
    }

    .btn-close {
        background-color: rgb(255, 69, 58);
    }

    .btn-minimize {
        background-color: rgb(255, 214, 10);
    }

    .btn-expand {
        background-color: rgb(50, 215, 75);
    }

    .btn-close-pressed {
        background-color: rgb(179, 46, 39);
    }

    .btn-minimize-pressed {
        background-color: rgb(189, 159, 8);
    }

    .btn-expand-pressed {
        background-color: rgb(37, 165, 56);
    }

    #btn-cross {
        width: 6px;
        height: 6px;
        position: relative;
        top: -6px;
        left: 2px;
    }

    #btn-line {
        width: 7px;
        height: 1px;
        background-color: black;
        position: relative;
        top: 5px;
        left: 1px;
    }

    #btn-expand {
        width: 7px;
        height: 6px;
        position: relative;
        left: 1px;
        top: -6px;
    }
</style>