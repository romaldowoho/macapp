<template>
  <div id="buttons" @click="log" @mouseover="buttonsActive = true" @mouseleave="buttonsActive = false">
      <div 
        class="btn btn-close" 
        :class="{'btn-close-active': buttonsActive, 'btn-close-pressed': btnClosePressed}"
        @mousedown="btnClosePressed = true"
        @mouseup="btnClosePressed = false"
        @mouseout="btnClosePressed = false"
      >
      </div>
      <div 
        class="btn btn-minimize" 
        :class="{'btn-minimize-active': buttonsActive, 'btn-minimize-pressed': btnMinimizePressed}"
        @mousedown="btnMinimizePressed = true"
        @mouseup="btnMinimizePressed = false"
        @mouseout="btnMinimizePressed = false"
      >
      </div>
      <div 
        class="btn btn-expand" 
        :class="{'btn-expand-active': buttonsActive, 'btn-expand-pressed': btnExpandPressed}"
        @mousedown="btnExpandPressed = true"
        @mouseup="btnExpandPressed = false"
        @mouseout="btnExpandPressed = false"

      >
      </div>
  </div>
</template>

<script>
export default {
    name: "ControlBtns",
    data() {
        return {
            buttonsActive: false,
            btnClosePressed: false,
            btnMinimizePressed: false,
            btnExpandPressed: false
        }
    },
    // watch: {
    //     buttonsActive(val) {
    //         console.log(val);
    //     }
    // },
    methods: {
        log() {
            console.log("hey");
        }
    }
}
</script>

<style scoped> 
    #buttons {
        width: 50px;
        position: absolute;
        top: 5px;
        left: 5px;
        display: flex;
        justify-content: space-between;
        z-index: 100;
        
    }

    .btn {
        height: 12px;
        width: 12px;
        border-radius: 50%;
    }

    .btn-close {
        background-color: rgb(255, 69, 58);
    }

    .btn-close-active {
        background-image: url('../assets/close.svg');
        background-repeat: no-repeat;
        background-size: cover;
    }

    .btn-close-pressed {
        background-image: url('../assets/close_pressed.svg');
        background-repeat: no-repeat;
        background-size: cover;
    }

    .btn-minimize {
        background-color: rgb(255, 214, 10);
    }

    .btn-minimize-active {
        background-image: url('../assets/minimize.svg');
        background-repeat: no-repeat;
        background-size: cover;
    }

    .btn-minimize-pressed {
        background-image: url('../assets/minimize_pressed.svg');
        background-repeat: no-repeat;
        background-size: cover;
    }

    .btn-expand {
        background-color: rgb(50, 215, 75);
    }

    .btn-expand-active {
        background-image: url('../assets/expand.svg');
        background-repeat: no-repeat;
        background-size: cover;
    }

    .btn-expand-pressed {
        background-image: url('../assets/expand_pressed.svg');
        background-repeat: no-repeat;
        background-size: cover;
    }
</style>