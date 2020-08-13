<template>
  <div>
      <img ref="img" 
           src="../assets/imessage.png" 
           height="48" 
           width="48" 
           :class="{overlay: active, animate: isOpen}" 
           @mousedown="active = true" 
           @mouseleave="active = false" 
           @mouseup="active = false"
           @click="open"
    >
  </div>
</template>

<script>
export default {
    name: "Icon",
    props: {
        target: Object
    },
    data() {
        return {
            active: false
        }
    },
    mounted() {
        this.$refs.img.ondragstart = () => false;
    },
    methods: {
        open() {
            this.target.isOpen = true;
        }
    },
    computed: {
        isOpen() {
            return this.target.isOpen
        }
    }
}
</script>

<style scoped>
    .overlay {
        filter: brightness(0.5)
    }

    .animate {
        animation: updown 1s ease-out;
    }

    @keyframes updown {
        50% {
            transform: translateY(-15px);
        }
        100% {
            transform: translateY(0px);
        }
    }
</style>