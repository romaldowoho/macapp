<template>
  <div id="menubar">
      <img src="../assets/apple.png" height="18" width="18" alt="apple logo">
  </div>
</template>

<script>
export default {
    name: "Menubar"
}
</script>

<style scoped>
    #menubar {
        height: 20px;
        width: 100%;
        display: flex;
        padding-left: 20px;
        background-color: rgb(37, 35, 35);
        position: fixed;
        color: white;
    }
</style>