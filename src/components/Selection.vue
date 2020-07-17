<template>
  <div v-if="isVisible" class="selection" :style="{width, height, left, top}"></div>
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
        isVisible() {
            return this.height && this.width;
        },
        height() {
            return this.endY && this.startY ? `${Math.abs(this.startY - this.endY)}px` : 0;
        },
        width() {
             return this.endX  && this.startX ? `${Math.abs(this.startX - this.endX)}px` : 0;
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
        position: absolute;
        background-color: rgba(245, 245, 245, 0.233);
        border: 1px solid rgba(255, 255, 255, 0.452);
        z-index: 1;
    }
</style>