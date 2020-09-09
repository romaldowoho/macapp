<template>
  <div id="menubar">
      <div id="tabs">
          <img class="tab" src="../assets/apple.png" height="18" width="18" alt="apple logo">
          <div class="tab">Finder</div>
          <div class="tab">File</div>
      </div>
      <div id="right-btns">
          <div>{{time}}</div>
      </div>
  </div>
</template>

<script>
import moment from 'moment';
export default {
    name: "Menubar",
    data() {
        return {
            time: moment().format('ddd h:mm A')
        }
    }
}
</script>

<style scoped>
    #menubar {
        height: 20px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        background-color: rgb(37, 35, 35);
        position: fixed;
        color: white;
    }
    #tabs {
        width: 10%;
        display: flex;
        align-items: center;
    }

    .tab {
        margin-left: 20px;
    }

</style>