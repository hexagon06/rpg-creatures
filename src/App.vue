<template>
  <div id="app" class="container-fluid mh-100 h-100 d-flex flex-column">
    <div id="nav" class="header">
      <router-link to="/">Home</router-link> |
      <router-link to="/creatures">Creatures</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view class="flex-1-1-0" />
    <div class="footer"></div>
  </div>
</template>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.header {
}
.footer {
  height: $footer-height;
}
</style>

<style src="../node_modules/vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss">
.multiselect__tags {
  padding: 0 40px 0 8px;
}
</style>
