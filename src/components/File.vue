<template>
  <div id="icon" class="draggable" @dblclick="open">
      <img id="img" class="draggable" :src="require(`@/assets/${icon}`)" width="49" height="49" alt="github">
  </div>
</template>

<script>
export default {
    name: "File",
    props: {
        icon: String,
        fileName: String
    },
    methods: {
        open() {
            window.open("https://github.com/romaldowoho/macapp", "_blank");
        }
    }
}
</script>

<style scoped>
    #icon {
        height: 47px;
        width: 47px;
        background-color: whitesmoke;
        border-radius: 50%;
    }

    #img {
        position: relative;
        top: -1px;
        left: -1px;
    }
</style>