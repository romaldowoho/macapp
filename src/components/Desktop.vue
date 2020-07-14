<template>
  <div id="desktop" :style="{backgroundImage: `url(${currentBackground})`, height: windowHeight, width: windowWidth}" @mousedown="comboHandler">
    <Loading :desktopImageLoaded="desktopImageLoaded"/>
      <WindowFolder folderName="games" name="games" />
      <Folder name="games" folderName="games"/>
      <Folder name="projects" folderName="projects"/>
      <Selection :startX="selectionStartX" :startY="selectionStartY" :endX="selectionEndX" :endY="selectionEndY" />
      <File icon="github.png" />
      <button @click="goFullScreen">Fullscreen</button>
  </div>
</template>

<script>
import Folder from './Folder.vue';
import Selection from './Selection.vue'
import WindowFolder from './WindowFolder.vue'
import Loading from './Loading.vue'
import File from './File.vue'
import Draggable from 'draggable'



export default {
    name: "Desktop",
    components: {
        Folder,
        Selection,
        WindowFolder,
        Loading,
        File
    },
    data() {
      return {
        selectionStartX: 0,
        selectionStartY: 0,
        selectionEndX: 0,
        selectionEndY: 0,
        foldersInSelection: false,
        backgrounds: ["ElCapitan", "AntelopeCanyon", "AbstractShapes", "Lake", "ColorBurst1", "Yosemite", "Yosemite3"],
        currentBackground: "",
        publicPath: process.env.BASE_URL,
        desktopImageLoaded: false,
        windowHeight: window.screen.height + 'px',
        windowWidth: window.screen.width + 'px',
        isFullscreen: false
      }
  },
  mounted() {
    this.changeBackground();
    setInterval(this.changeBackground, 30000);
    const folders = document.querySelectorAll("#folder");
    folders.forEach(folder => {
      new Draggable(folder, {onDragEnd: this.updateFolderLocation, limit: this.$el});
    });
  },
  methods: {
    log() {
      console.log("done");
    },
    goFullScreen(){
      var elem = document.documentElement;
      console.log(elem);
      if (
        document.fullscreenEnabled || 
        document.webkitFullscreenEnabled || 
        document.mozFullScreenEnabled ||
        document.msFullscreenEnabled
      ) {
        if(!this.isFullscreen){
          if (elem.requestFullscreen) {
            console.log(elem.requestFullscreen);
            elem.requestFullscreen().then(() => {console.log("done")}).catch(err => {console.log(err)});
            this.isFullscreen = true;
            return;
          } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
            this.isFullscreen = true;
            return;
          } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
            this.isFullscreen = true;
            return;
          } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
            this.isFullscreen = true;
            return;
          }
        }else{
          if (document.exitFullscreen) {
            document.exitFullscreen();
            this.isFullscreen = false;
            return;
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
            this.isFullscreen = false;
            return;
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
            this.isFullscreen = false;
            return;
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
            this.isFullscreen = false;
            return;
          }
        }
      }
    },
    updateFolderLocation(folder, x, y) {
      this.$store.state.folders[folder.getAttribute('name')].left  = x;
      this.$store.state.folders[folder.getAttribute('name')].top  = y;
    },
    comboHandler(e) {
      this.deactivateFolders(e);
      this.createSelection(e);
    },
    changeBackground() {
      let rndIndex = Math.floor(Math.random() * this.backgrounds.length);
      let newBackground = this.backgrounds[rndIndex];
      let newImg = new Image();
      newImg.onload = () => {
        this.currentBackground = `${this.publicPath}${newBackground}.jpg`;
        setTimeout(() => {this.desktopImageLoaded = true;}, 6000);
      }
      newImg.src = `${this.publicPath}${newBackground}.jpg`;
    },
    deactivateFolders(e) {
      let target = e.target.id === 'desktop' ? 'desktop' : e.target.parentNode.getAttribute('name');
        let folders = this.$store.state.folders;
        for (let folder in folders) {
          if(folder !== target) {
            folders[folder].isActive = false;
          }
        }
    },
    createSelection(e) {
        if (e.target.id !== 'desktop') return;
        this.selectionStartX = e.clientX;
        this.selectionStartY = e.clientY;
        let self = this;

        this.$el.addEventListener('mousemove', onMouseMove);
        this.$el.addEventListener('mouseup', () => {
            this.$el.removeEventListener('mousemove', onMouseMove);
            this.selectionStartX = 0;
            this.selectionStartY = 0;
            this.selectionEndX = 0;
            this.selectionEndY = 0;        
        })

        function onMouseMove(e) {
            selectionEndsAt(e.clientX, e.clientY);
        }

        
        function selectionEndsAt(x, y) {
            self.selectionEndX = x;
            self.selectionEndY = y;

            let folders = self.$store.state.folders;
            for (let folder in folders) {
              let fldrLeft = folders[folder].left;
              let fldrTop = folders[folder].top;
              if (self.folderInSelection(fldrTop, fldrLeft + 70, fldrTop + 90, fldrLeft, self.selectionStartY, x, y, self.selectionStartX)) {
                folders[folder].isActive = true;
              } else {
                folders[folder].isActive = false;
              }
            }
            
        }
    },
    folderInSelection(fldrTop, fldrRight, fldrBottom, fldrLeft, selTop, selRight, selBottom, selLeft) {
      // create a standart box
      let top = Math.min(selTop, selBottom);
      let bottom = Math.max(selTop, selBottom);
      let left = Math.min(selRight, selLeft);
      let right = Math.max(selRight, selLeft); 
      return !(right < fldrLeft || bottom < fldrTop || left > fldrRight || top > fldrBottom);
    }
  }
}
</script>

<style scoped>
    #desktop {
        transition: background-image 4s;
        background-size: cover;
    }


</style>