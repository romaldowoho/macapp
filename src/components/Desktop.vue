<template>
  <div id="desktop" :style="{backgroundImage: `url(${currentBackground})`}" @mousedown="comboHandler">
    <Menubar />
    <Loading :desktopImageLoaded="desktopImageLoaded"/>
    <WindowFolder folderName="games" name="games" />
    <Folder name="games" folderName="games"/>
    <Folder name="projects" folderName="projects"/>
    <Selection :startX="selectionStartX" :startY="selectionStartY" :endX="selectionEndX" :endY="selectionEndY" />
    <!-- <Item icon="github.png" /> -->
    <Alert />
    <iMessage />
    <button @click="open">Imessage</button>
  </div>
</template>

<script>
import Folder from './Folder.vue'
import Selection from './Selection.vue'
import WindowFolder from './WindowFolder.vue'
import Loading from './Loading.vue'
// import Item from './Item.vue'
import Draggable from 'draggable'
import Alert from './Alert'
import Menubar from './Menubar'
import iMessage from './iMessageWindow'



export default {
    name: "Desktop",
    components: {
        Folder,
        Selection,
        WindowFolder,
        Loading,
        // Item,
        Alert,
        Menubar,
        iMessage
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
        windowHeight: window.innerHeight + 'px',
        windowWidth: window.screen.width + 'px',
      }
  },
  mounted() {
    this.changeBackground();
    setInterval(this.changeBackground, 30000);

    const folders = document.querySelectorAll("#folder");
    folders.forEach(folder => {
      new Draggable(folder, {onDragEnd: this.updateItemLocation, limit: {y: [20, this.windowHeight], x: null}});
    });

    const windows = document.querySelectorAll("#window");
    windows.forEach(window => {
      new Draggable(window, {onDragEnd: this.updateItemLocation, 
                             handle: document.querySelector('#top-bar'),
                             limit: {y: [20, this.windowHeight], x: null}});
    });
    const imessage = document.querySelector('#imessage');
     new Draggable(imessage, { handle: document.querySelector('#imessage-handle'),
                             limit: {y: [20, this.windowHeight], x: null},
                             setPosition: false});
  },
  methods: {
    log() {
      console.log("done");
    },
    open() {
      this.$store.state.windows.imessage.isOpen = true;    
    },
    updateItemLocation(item, newX, newY) {
      if (item.id == 'folder') {
        this.$store.state.folders[item.getAttribute('name')].left  = newX;
        this.$store.state.folders[item.getAttribute('name')].top  = newY;
      } else if (item.id == 'window') {
        this.$store.state.windows.folders[item.getAttribute('name')].left  = newX;
        this.$store.state.windows.folders[item.getAttribute('name')].top  = newY;
      }
      
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
        height: 100vh;
        width: 100vw;
        min-height: 720px;
        min-width: 1280px;
        transition: background-image 4s;
        background-size: cover;
        overflow: hidden;
    }


</style>