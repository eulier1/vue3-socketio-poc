<template>
  <div>
    <span>{{ $socket.connected ? "Connected" : "Disconnected" }}</span>
    <ul id="messages" v-for="(data, i) in messages" :key="i">
      <li>
        <span>{{ data.username }} </span> {{ data.message }}
      </li>
    </ul>
    <form id="form" @submit.prevent="clickButton">
      <input id="input" v-model="msg" autocomplete="off" />
      <input type="submit" value="Submit" />
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "",
      messages: [],
    }
  },
  sockets: {
    connect() {
      console.log("socket connected")
    },
    newMessage(data) {
      console.log(
        'this method was fired by the socket server. eg: io.emit("customEmit", data)',
        data
      ),
        this.messages.push(data)
      this.msg = ""
    },
  },
  methods: {
    clickButton() {
      // this.$socket.client is `socket.io-client` instance
      this.$socket.client.emit("newMessage", this.msg)
    },
  },
}
</script>

<style>
#form {
  background: rgba(0, 0, 0, 0.15);
  padding: 0.25rem;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  height: 3rem;
  box-sizing: border-box;
  backdrop-filter: blur(10px);
}
#input {
  border: none;
  padding: 0 1rem;
  flex-grow: 1;
  border-radius: 2rem;
  margin: 0.25rem;
}
#input:focus {
  outline: none;
}
#form > button {
  background: #333;
  border: none;
  padding: 0 1rem;
  margin: 0.25rem;
  border-radius: 3px;
  outline: none;
  color: #fff;
}
#messages {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
#messages > li {
  padding: 0.5rem 1rem;
}
#messages > li:nth-child(odd) {
  background: #efefef;
}
</style>
