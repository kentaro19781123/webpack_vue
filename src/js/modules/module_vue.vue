<template>
  <div id="app" class="container">
    <h1 class="p-h1">
      {{ message }}
    </h1>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      message: 'hello'
    }
  }
}
</script>

<style scoped>
#app {
  color: #f00;
  h1 {
    font-size: 20px;
    transform:translate3d(0,0,0);
  }
}
</style>
