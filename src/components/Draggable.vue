<template>
  <div @mousedown="drag">
      <slot></slot>
  </div>
</template>

<script>
export default {
    name: "Draggable",
    methods: {
        drag(event) {
          if (!event.target.classList.contains('draggable')) return;
          let target = event.target.parentNode;
          let shiftX = event.clientX - target.getBoundingClientRect().left;
          let shiftY = event.clientY - target.getBoundingClientRect().top;

          target.style.position = 'absolute';
          target.style.zIndex = 1000;

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
          
          let self = this;
          function onMouseUp(e) {
            // if the target was a folder add the final location to the store
            if (target.id === 'folder') {
              self.$store.state.folders[target.getAttribute('name')].left = e.pageX - shiftX;
              self.$store.state.folders[target.getAttribute('name')].top = e.pageY - shiftY;
            }
            if(target.id === 'window') {
              self.$store.state.windows.folders[target.getAttribute('name')].left = e.pageX - shiftX;
              self.$store.state.windows.folders[target.getAttribute('name')].top = e.pageY - shiftY;
            }
            target.removeEventListener('mouseup', onMouseUp);
            self.$el.removeEventListener('mousemove', onMouseMove);
          }
          target.addEventListener('mouseup', onMouseUp);
          target.addEventListener('mouseleave', () => {
            this.$el.removeEventListener('mousemove', onMouseMove);
          });
        }
    }
}
</script>

<style scoped>

</style>