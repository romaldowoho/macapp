<template>
  <div id="desktop" :style="{backgroundImage: `url(${currentBackground})`}" @mousedown="comboHandler">
    <Draggable>
      <WindowFolder folderName="games" />
    </Draggable>
    <Draggable>
      <Folder name="games" folderName="games"/>
    </Draggable>
    <Draggable>
      <Folder name="projects" folderName="projects"/>
    </Draggable>
    <Selection :startX="selectionStartX" :startY="selectionStartY" :endX="selectionEndX" :endY="selectionEndY" />
  </div>
</template>

<script>
import Folder from './Folder.vue';
import Selection from './Selection.vue'
import WindowFolder from './WindowFolder.vue'
import Draggable from './Draggable.vue'

export default {
    name: "Desktop",
    components: {
        Folder,
        Selection,
        WindowFolder,
        Draggable
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
      publicPath: process.env.BASE_URL
    }
  },
  mounted() {
    this.changeBackground();
    setInterval(this.changeBackground, 30000);
  },
  methods: {
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
      }
      newImg.src = `${this.publicPath}${newBackground}.jpg`;
    },
    deactivateFolders(e) {
      console.log("selection off");
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

        let self = this;
        function selectionEndsAt(x, y) {
            self.selectionEndX = x;
            self.selectionEndY = y;

            let folders = self.$store.state.folders;
            for (let folder in folders) {
              let x = folders[folder].left;
              let y = folders[folder].top;
              if (x <= self.selectionEndX && x >= self.selectionStartX && y >= self.selectionStartY && y <= self.selectionEndY) {
                // self.foldersInSelection = true;
                folders[folder].isActive = true;
              } else {
                // self.foldersInSelection = false;
                folders[folder].isActive = false;
              }
            }
            
        }
    }
  }
}
</script>

<style scoped>
    #desktop {
        background-size: cover;
        height: 100vh;
        width: 100vw;
        transition: background-image 4s;
    }


</style>