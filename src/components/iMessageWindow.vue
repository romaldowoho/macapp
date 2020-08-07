<template>
  <div id="imessage" v-show="isOpen">
      <div id="imessage-handle"></div>
      <ControlButtons :target="storeState()" />
      <input type="text" id="searchbar" placeholder="Search" />
      <button id="btn-compose"></button>
      <div id="left">
          <div id="left-top">
          </div>
          <div id="left-bottom">
              <div id="recipient">
                  <div id="photo">
                      <img src="../assets/me.jpg" alt="">
                  </div>
                  <div id="msg-info">
                      <div id="name-time">
                          <h5>Ramazan</h5>
                          <span id="last-msg-time"> {{lastMessageTime}} </span>
                      </div>
                      <p id="last-message">{{ lastMessage }}</p>
                  </div>
              </div>
          </div>
      </div>
      <div id="right">
          <div id="right-top">
              <div id="to">To: Ramazan</div>
          </div>
          <div ref="all_messages">
              <div id="msg-time" v-if="greetingSent">
                  Today, {{ getTime()}}
              </div>
              <Message v-for="msg in messages" :message="msg.text" :outgoing="msg.outgoing" :key="msg.key"/> 
              <audio ref="send_sound" src="../assets/imessage_send.mp3"></audio>
              <audio ref="receive_sound" src="../assets/imessage_receive.mp3"></audio>

          </div>
          <div id="message-field">
              <form method="POST" name="imessage" netlify netlify-honeypot="bot-field" @submit="send">
                  <input id="msg-input" v-model="currentMessage" type="text" label="Message" name="message" placeholder="iMessage" autocomplete="off" >
                  <input type="hidden" name="form-name" value="imessage">
              </form>
          </div>
      </div>
  </div>
</template>

<script>
import Message from "./Message"
import moment from 'moment';
import ControlButtons from './ControlButtons'

export default {
    name: "iMessage",
    components: {
        Message,
        ControlButtons
    },
    data() {
        return {
            messages: [],
            currentMessage: "",
            lastMessage: "",
            lastMessageTime: "",
            greetingSent: false
        }
    },
    mounted() {
        setTimeout(() => {
            let greeting = "Hey there! You can send me a message here and I'll respond as soon as I can. Don't forget to mention your name and email! 🙂";
            this.messages.push({
                text: greeting,
                outgoing: false
            });
            this.lastMessageTime = this.getTime();
            this.greetingSent = true;
            this.$refs['receive_sound'].play();
            this.lastMessage = greeting;
        }, 9000);
    },
    methods: {
        storeState() {
            return this.$store.state.windows.imessage; 
        },
        getTime() {
            return moment().format('LT');
        },
        send(e) {
            e.preventDefault();
            this.messages.push({
                text: this.currentMessage,
                outgoing: true,
                key: Math.random()
            });
            this.$refs['send_sound'].play();
            this.lastMessageTime = this.getTime();
            this.lastMessage = this.currentMessage;
            this.currentMessage = "";
            let messages = this.$refs['all_messages'];
            messages.scrollTop = messages.scrollHeight;
            // const formData = new FormData(e.target);
        },
        sendForm() {
            // eslint-disable-next-line no-unused-vars
            let message = "";
            for (let msg of this.messages) {
                message += (msg.text + '\n')
            }
            fetch('/', {
                method: 'POST',
                headers: {
                'Accept': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: new URLSearchParams(message).toString()
            })
            .then()
            .catch(err => {
                console.log(err);
            });
        }
    },
    computed: {
        isOpen() {
            return this.$store.state.windows.imessage.isOpen;
        }
    },
    watch: {
        // send the message if closing the window
        isOpen(state) {
            if(!state) {
                this.sendForm();
                this.messages = [];
            }
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
        z-index: 100;
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

    #all-messages {
        width: 100%;
        height: 311px;
        overflow: scroll;
    }

    #msg-time {
        text-align: center;
        color: rgb(123, 122, 126);
        font-size: 11px;
        font-weight: 500;
        margin: 7px 0 7px 0;
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
        height: 40px;
        position: absolute;
        bottom: 0px;
        background-color: rgb(236, 236, 236);
        border-top: 1px solid rgba(128, 128, 128, 0.281);
        border-radius: 0 0 6px 0;
    }

    #msg-input {
        width: 90%;
        height: 22px;
        display: block;
        position: relative;
        margin: 0 auto;
        top: 8px;
        padding-left: 5px;
        border: 1px solid rgba(128, 128, 128, 0.548);
        border-radius: 15px;
        font-size: 14px;
    }

    #msg-input:focus {
        outline: none;
    }

    #left-top {
        height: 50px;
        width: 100%;
        border-radius: 6px 0 0 0;
    }

    #searchbar {
        width: 200px;
        height: 20px;
        position: absolute;
        top: 21px;
        left: 18px;
        text-align: center;
        font-size: 13px;
        background-color: rgba(128, 128, 128, 0.192);
        z-index: 10;
        border: 0px;
        border-radius: 4px;
        transition: text-align 1s;
        background-image: url('../assets/search.png');
        background-repeat: no-repeat;
        background-size: 13px;
        background-position: 62px 5px;
    }

    #searchbar:focus {
        width: 178px;
        outline: none;
        text-align: left;
        padding-left: 24px;
        background-position: 5px 5px;
    }

    #btn-compose {
        position: absolute;
        left: 230px;
        top: 21px;
        height: 20px;
        width: 30px;
        z-index: 10;
        border: 1px solid rgba(128, 128, 128, 0.301);
        border-radius: 4px;
        background-color: white;
        box-shadow: 0px 1px rgba(128, 128, 128, 0.185);
        background-image: url('../assets/compose.png');
        background-repeat: no-repeat;
        background-size: 15px;
        background-position: center 1px;
    }

    #btn-compose:focus {
        outline: none;
        
    }

    #btn-compose:active {
        background-color: rgba(128, 128, 128, 0.151);
    }

    #left-bottom {
        height: 350px;
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
        padding-top: 6px;
    }

    h5, p {
        margin: 0;
    }

    #name-time {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
    }

    #last-msg-time {
        font-size: 12px;
        padding-right: 10px;
    }

    #last-message {
        font-size: 12px;
        width: 200px;
        height: 33px;
        line-height: 15px;
        overflow: hidden;
    }
    
    #photo {
        width: 80px;
        height: 100%;
    }

    img {
        height: 48px;
        width: 48px;
        border-radius: 100%;
        object-fit: cover;
        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-top: 7px;
    }
</style>