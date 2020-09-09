<template>
  <div>
      <img ref="img" 
           src="../assets/imessage.webp"
           alt="imessage icon"
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
            // this.target.isOpen = true;
            this.$store.state.windows.imessage.isOpen = true;
        }
    },
    computed: {
        isOpen() {
            // return this.target.isOpen;
            return this.$store.state.windows.imessage.isOpen;
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
        will-change: transform;
    }

    @keyframes updown {
        0% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-15px);
        }
        100% {
            transform: translateY(0px);
        }
    }
</style>