<template>
  <div class="home">
    <h3 style="text-align: left">
      <img width="45" alt="Vue logo" src="../assets/logo.png" /> 3
    </h3>
    <Chat />
  </div>
</template>

<script>
// @ is an alias to /src
import Chat from "@/components/Chat.vue"

export default {
  name: "Home",
  components: {
    Chat,
  },
}
</script>
