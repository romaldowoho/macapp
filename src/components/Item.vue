<template>
  <div id="icon" @dblclick="open">
      <img id="img" :src="require(`@/assets/${icon}`)" width="49" height="49" alt="github">
  </div>
</template>

<script>
export default {
    name: "Item",
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
        position: absolute;
    }

    #img {
        position: relative;
        top: -1px;
        left: -1px;
    }
</style>