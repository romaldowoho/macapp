<template>
  <div id="desktop" :style="{backgroundImage: `url(${currentBackground})`}" @click="deactivateFolders" @mousedown="createSelection">
    <Draggable>
      <WindowFolder />
    </Draggable>
    <Folder name="Games" folderName="Games" @mousedown.native="drag"/>
    <Folder name="Projects" folderName="Projects" @mousedown.native="drag"/>
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
      let target = e.target.id === 'desktop' ? 'desktop' : e.target.parentNode.getAttribute('name');
        let folders = this.$store.state.folders;
        for (let folder in folders) {
          if(folder !== target) {
            folders[folder].isActive = false;
          }
        }
    },
    createSelection(e) {
      console.log(e.target);
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
    }, 
    drag(event) {
      let target = event.target.parentNode;
      if (target.id == 'desktop') return;
      let shiftX = event.clientX - target.getBoundingClientRect().left;
      let shiftY = event.clientY - target.getBoundingClientRect().top;

      target.style.position = 'absolute';
      target.style.zIndex = 1000;
      // document.body.append(target);

      moveAt(event.pageX, event.pageY);

      // moves the target at (pageX, pageY) coordinates
      // taking initial shifts into account
      function moveAt(pageX, pageY) {
        target.style.left = pageX - shiftX + 'px';
        target.style.top = pageY - shiftY + 'px';
      }

      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
      }

      // move the target on mousemove
      this.$el.addEventListener('mousemove', onMouseMove);

      // drop the target, remove unneeded handlers

      target.ondragstart = function() {
        return false;
      };
      
      target.addEventListener('mouseup', (e) => {
        this.$store.state.folders[target.getAttribute('name')].left = e.pageX - shiftX;
        this.$store.state.folders[target.getAttribute('name')].top = e.pageY - shiftY;
        this.$el.removeEventListener('mousemove', onMouseMove);
      });
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