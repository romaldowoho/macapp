<template>
  <div id="folder" @click="activate" @dblclick="openFolder" :style="{left, top}">
    <div class='outline' :class="{activeFolder: isActive}"></div>
    <img  src="../assets/folder.png" width="64px" height="64px" />
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
    return {}
  },
  methods: {
    activate() {
      this.$store.state.folders[this.folderName].isActive = true;
    },
    openFolder() {
      let folder = this.$store.state.windows.folders[this.folderName];
      folder.transition = true;
      folder.isOpen = true;
      folder.height = 400;
      folder.width = 700;
      folder.left = folder.prevLeft;
      folder.top = folder.prevTop;
      setTimeout(() => {folder.transition = false;}, 50);
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
      width: 70px;
      height: 90px;
      position: absolute;
      z-index: 0;
    }
    .outline {
      height: 65px;
      width: 68px;
      border: 2px solid darkgray;
      border-radius: 5px;
      background-color: black;
      opacity: 0;
      position: absolute;
    }

    .activeFolder {
      opacity: 0.4;
    }

    .activeFolderName {
      background-color: rgb(31, 94, 211);
      border-radius: 3px;
    }
    
    img {
      position: absolute;
      left: 2px;
    }

    .name {
      position: relative;
      top: 72px;
      text-align: center;
      font-weight: bold;
      color: white;
      cursor: default;
    }
</style>
