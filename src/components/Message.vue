<template>
  <div id="message-row" :style="{'text-align': outgoing ? 'right' : 'left'}">
      <div id="message" :style="style">
              {{message}}
      </div>
  </div>
</template>

<script>
export default {
    name: "Message",
    props: {
        message: String,
        outgoing: Boolean
    },
    data() {
        return {
            publicPath: process.env.BASE_URL
        }
    },
    computed: {
        style() {
            if (this.outgoing) {
                return {
                    'background-color': 'rgb(79,132,232)',
                    'margin-right': '8px',
                    'color': 'white'
                }
            } else {
                return {
                    'background-color': 'rgb(221,221,221)',
                    'margin-left': '8px'
                }
            }
        }
    }
}
</script>

<style scoped>
    #message-row {
        width: 100%;
        height: auto;
        margin-top: 5px;
    }

    #message {
        font-size: 13px;
        display: inline-block;
        width: auto;
        max-width: 250px;
        padding: 3px 8px 5px 8px;
        border-radius: 15px;
    }
</style>