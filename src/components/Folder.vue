<template>
  <div id="folder" @click="activate" :style="{left, top}">
    <div class='outline' :class="{activeFolder: isActive}"></div>
    <img src="../assets/folder.png" width="64px" height="64px" />
    <div class="name" :class="{activeFolderName: isActive}">{{folderName}}</div>
  </div>
</template>

<script>
export default {
  name: 'Folder',
  props: {
    folderName: String
  },
  data() {
    return {
    }
  },
  methods: {
    activate() {
      this.$store.state.folders[this.folderName].isActive = true;
    }
  },
  computed: {
    isActive() {
      return this.$store.state.folders[this.folderName].isActive;
    },
    left() {
      return this.$store.state.folders[this.folderName].left + 'px';
    },
    top() {
      return this.$store.state.folders[this.folderName].top + 'px';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #folder {
      width: 70px ;
      position: absolute;
    }
    .outline {
      height: 70px;
      width: 70px;
      border: 2px solid darkgray;
      border-radius: 5px;
      background-color: black;
      opacity: 0;
      position: relative;
    }

    .activeFolder {
      opacity: 0.4;
    }

    .activeFolderName {
      background-color: rgb(31, 94, 211);
      border-radius: 3px;
    }
    
    img {
      position: relative;
      top: -70px;
      left: 5px;
    }

    .name {
      position: relative;
      top: -65px;
      width: 70px;
      text-align: center;
      font-weight: bold;
      color: white;
      cursor: default;
    }
</style>
