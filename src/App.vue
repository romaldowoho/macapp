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
      width: 100vw;
      height: 100vh;
      font-family: -apple-system, BlinkMacSystemFont, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-size: 16px;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      -webkit-user-select: none;
      user-select: none;
    }

    ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
}
</style>
