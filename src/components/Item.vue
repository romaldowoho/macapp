<template>
  <div id="item" @dblclick="open">
      <img id="img" :src="require(`@/assets/${icon}`)" width="49" height="49" alt="icon">
      <div id="name">{{name}}</div>
  </div>
</template>

<script>
export default {
    name: "Item",
    props: {
        icon: String,
        link: String,
        name: String
    },
    methods: {
        open() {
            window.open(`${this.link}`, "_blank");
        }
    }
}
</script>

<style scoped>
    #item {
        height: 47px;
        width: 47px;
        position: absolute;
        left: 96%;
        top: 30%;
    }

    #img {
        position: relative;
        top: -1px;
        left: -1px;
    }

    #name {
      position: relative;
      left: -5px;
      text-align: center;
      font-weight: bold;
      color: white;
      cursor: default;
    }
</style>