<template>
  <div id="dock">
      <!-- <img src="../assets/imessage.png" alt="imessage" height="48" width="48"> -->
      <Icon :target="imessageState" />
  </div>
</template>

<script>
import Icon from "./Icon.vue"
export default {
    name: "Dock",
    components: {
        Icon
    },
    computed: {
        imessageState() {
            return this.$store.state.windows.imessage; 
        }
    }
}
</script>

<style scoped>
    #dock {
        width: 800px;
        height: 50px;
        background-color: rgba(31, 31, 31, 0.8);
        border-radius: 6px 6px 0 0;
    }
</style>