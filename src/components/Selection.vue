<template>
  <div class="selection" :style="{width, height, left, top}">

  </div>
</template>

<script>
export default {
    name: "Selection",
    props: {
        startX: Number,
        startY: Number,
        endX: Number,
        endY: Number
    },
    computed: {
        height() {
            if (this.endY && this.startY && this.endY < this.startY) {
                return `${this.startY - this.endY}px`;
            } else {
                return `${this.endY - this.startY}px`;
            }
            
        },
        width() {
            if (this.endX && this.startX && this.endX < this.startX) {
                return `${this.startX - this.endX}px`;
            } else {
                return `${this.endX - this.startX}px`;
            }
            
        },
        left() {
            if (this.endX && this.startX && this.endX < this.startX) {
                return `${this.endX}px`;
            } else {
                return `${this.startX}px`;
            }
            
        },
        top() {
            if (this.endY && this.startY && this.endY < this.startY) {
               return `${this.endY}px`; 
            } else {
               return `${this.startY}px`;
            }
            
        }
    }
}
</script>

<style scoped>
    .selection {
        position: relative;
        background-color: rgba(245, 245, 245, 0.233);
        border: 1px solid rgba(255, 255, 255, 0.452);
    }
</style>