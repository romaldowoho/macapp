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
          if (event.target.id !== 'top-bar') return;
          let target = event.target.parentNode;
          console.log(target);
          if (target.id == 'desktop') return;
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
          
          target.addEventListener('mouseup', () => {
            this.$el.removeEventListener('mousemove', onMouseMove);
          });
          target.addEventListener('mouseleave', () => {
            this.$el.removeEventListener('mousemove', onMouseMove);
          });
        }
    }
}
</script>

<style scoped>

</style>