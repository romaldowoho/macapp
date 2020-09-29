<template>
  <div id="alert" v-if="inView" :class="{slidein: inView}">
      <div id="left">
          <div id="icon">
              <img :src="require(`../assets/${icon}`)" alt="icon" height="36" width="36"/>
          </div>
          <div id="content">
              <div style="font-weight: bold; display: inline;">{{ title }}</div><br>
              <div style="font-size: 12px; display: inline;">{{ content }}</div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: "AutoAlert",
    props: {
        title: String,
        content: String,
        delay: Number,
        icon: String
    },
    data() {
        return {
            isOpen: true,
            inView: false
        }
    },
    beforeMount() {
        setTimeout(() => {
           this.inView = true;
        }, this.delay);
        setTimeout(() => {
           this.inView = false;
        }, this.delay + 10000);
    },
    methods: {
        
    }
}
</script>

<style scoped>
    #alert {
        width: 335px;
        height: 64px;
        position: absolute;
        float: right;
        left: 360px;
        top: 50px;
        z-index: 100;
        display: flex;
        border-radius: 8px;
        background: linear-gradient(rgb(203, 219, 218), rgb(236, 236, 236));
        color: rgb(40, 40, 40);
        box-shadow: 10px 15px 50px 10px rgba(0, 0, 0, 0.473);
        
    }

    .slidein {
        animation: slide-left 0.5s forwards ease-out;
    }

    .slideout {
        animation: slide-right 0.5s forwards ease-out;
    }

    #left {
        width: 250px;
        height: 64px;
        border-right: 1px solid rgba(128, 128, 128, 0.5);
        display: flex;
        align-items: center;
    }

    #icon {
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
        /* background-color: rgb(50, 215, 75);
        border: 1px solid rgba(128, 128, 128, 0.2); */
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
        width: 85px;
        height: 32px;
        font-size: 13px;
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

    @keyframes slide-right {
        100% {
            left: 360px;
        }
    }
</style>