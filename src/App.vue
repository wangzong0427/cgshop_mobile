<template>
  <div id="app">
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view />
    <!-- 将子组件编写进当前组件模板 -->
    <Footer :routerUrl = 'routerUrl'></Footer>
  </div>
</template>

<script>
// 引入组件
import Footer from './components/Footer';
export default {
  name: "App",
  data () {
    return {
      routerUrl: 'Home'
    }
  },
  // 定义为子组件
  components: {
    Footer
  },
  // 监听
  watch: {
    $route (to) {
      var str = to.path.substr(1)
      // 因为Home哈希值为空，所以若str存在，则使用本来的值，若不存在，则使用Home
      str = str ? str : 'Home'
      this.routerUrl = str
    }
  },
  mounted () {
    // console.log(location.hash);
    var str = location.hash.substr(2)
    // 因为Home哈希值为空，所以若str存在，则使用本来的值，若不存在，则使用Home
    str = str ? str : 'Home'
    this.routerUrl = str
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
