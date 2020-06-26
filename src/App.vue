<template>
  <div id="app">
    <desktop />
  </div>
</template>

<script>
import Desktop from './components/Desktop.vue'

export default {
  name: 'App',
  components: {
    Desktop
  }
  
}
</script>

<style>
    #app {
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 16px;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      -webkit-user-select: none;
      user-select: none;
    }
</style>
