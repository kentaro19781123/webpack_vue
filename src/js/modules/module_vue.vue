<template>
  <div id="app" class="container">
    <h1>{{ message }}</h1>
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

<style scope>
#app {
  color: #f00;
  h1 {
    font-size: 20px;
  }
}
</style>
