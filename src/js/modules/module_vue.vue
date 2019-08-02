<template>
  <div id="app" class="container">
    <h1 class="p-h1">
      {{ message }}
    </h1>
    <ul v-for="(item, index) in items" :key="index">
      <li>
        {{ item.pref }}
      </li>
      <li>
        {{ item.pref_code }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: function () {
    return {
      message: 'hello',
      items: [],
      loading: true,
      errored: false
    }
  },
  mounted() {
    axios.get("http://localhost:8888/test/")
    .then(response => this.items = response.data.item)
    .catch(error => {
      console.log(error)
      this.errored = true
    })
    .finally(() => this.loading = false)
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
