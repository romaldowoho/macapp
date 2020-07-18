<template>
  <div id="imessage">
      <div id="imessage-handle"></div>
      <div id="left">
          <div id="left-top" ></div>
          <div id="left-bottom">
              <div id="recipient">
                  <div id="photo">
                      <img src="../assets/me.jpg" alt="">
                  </div>
                  <div id="msg-info">
                      <h5>Ramazan</h5>
                      <p>{{ lastMessage }}</p>
                  </div>
              </div>
          </div>
      </div>
      <div id="right">
          <div id="right-top">
              <div id="to">To: Ramazan</div>
          </div>
          <div id="message-field">
              <form method="POST" name="imessage" netlify netlify-honeypot="bot-field" @submit="handleFormSubmit">
                  <input v-model="currentMessage" type="text" label="Message" name="message" placeholder="iMessage">
                  <input type="hidden" name="form-name" value="imessage">
              </form>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: "iMessage",
    data() {
        return {
            currentMessage: "",
            lastMessage: "",
            lastMessageTime: "4:17 PM"
        }
    },
    methods: {
        handleFormSubmit(e) {
            e.preventDefault();
            const formData = new FormData(e.target);
            fetch('/', {
                method: 'POST',
                headers: {
                'Accept': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: new URLSearchParams(formData).toString()
            })
            .then(res => {
                if (res) {
                    this.lastMessage = this.currentMessage;
                    this.currentMessage = "";
                }
            }).catch(err => {
                console.log(err);
            });
        }
    }
}
</script>

<style scoped>
    #imessage {
        position: absolute;
        display: flex;
        left: 800px;
        top: 200px;
        height: 400px;
        width: 780px;
        border-radius: 6px;
        border: 1px solid rgba(128, 128, 128, 0.377);
        box-shadow: 10px 15px 50px 10px rgba(0, 0, 0, 0.473);
    }

    #imessage-handle {
        width: 100%;
        height: 50px;
        position: absolute;
        z-index: 10;
    }

    #left {
        height: 100%;
        width: 270px;
        background-color:rgba(250, 246, 246, 0.897);
        backdrop-filter: blur(10px);
        border-right: 1px solid rgba(128, 128, 128, 0.281);
        -webkit-backdrop-filter: blur(20px) brightness(150%);
        border-radius: 6px 0 0 6px;
    }

    #right {
        height: 100%;
        width: 560px;
        position: relative;
        border-radius: 0 6px 6px 0;
        background-color: white;
    }

    #right-top {
        width: 100%;
        height: 50px;
        border-radius: 0 6px 0 0;
        border-bottom: 1px solid rgba(128, 128, 128, 0.281);
        background-color: rgb(236, 236, 236);
    }

    #to {
        font-size: 13px;
        position: relative;
        top: 25px;
        left: 20px;
    }

    #message-field {
        width: 100%;
        height: 38px;
        position: absolute;
        bottom: 0px;
        background-color: rgb(236, 236, 236);
        border-top: 1px solid rgba(128, 128, 128, 0.281);
        border-radius: 0 0 6px 0;
    }

    input {
        width: 90%;
        height: 18px;
        display: block;
        position: relative;
        margin: 0 auto;
        top: 8px;
        padding-left: 5px;
        border: 1px solid rgba(128, 128, 128, 0.548);
        border-radius: 10px;
    }

    input:focus {
        outline: none;
    }

    #left-top {
        height: 50px;
        width: 100%;
        border-radius: 6px 0 0 0;
    }

    #left-bottom {
        height: 375px;
        widows: 100%;
    }

    #recipient {
        width: 100%;
        height: 60px;
        display: flex;
        color: white;
        background-color: rgba(8, 84, 226, 0.7);
    }

    #msg-info {
        padding-top: 8px;
    }

    h5, p {
        margin: 0;
    }

    p {
        font-size: 13px;
    }
    
    #photo {
        width: 80px;
        height: 100%;
    }

    img {
        height: 48px;
        width: 48px;
        border-radius: 50%;
        object-fit: cover;
        display: block;
        margin-left: auto;
        margin-right: auto;
        padding-top: 6px;
    }
</style>