1<template>
  <div class="Footer">
    <footer>
      <!-- <p>{{routerUrl}}</p> -->
      <ul>
        <li :class='routerUrl === "Home" ? "action" : ""'>
          <router-link to="/">
            <i class="iconfont icon-shouye"></i>
            <p>首页</p>
          </router-link>
        </li>
        <li :class='routerUrl === "Classify" ? "action" : ""'>
          <router-link to="/Classify">
            <i class="iconfont icon-liebiaomoshi"></i>
            <p>分类</p>
          </router-link>
        </li>
        <li :class='routerUrl === "Vip" ? "action" : ""'>
          <router-link to="/Vip">
            <i class="iconfont icon-vip"></i>
            <p>会员购</p>
          </router-link>
        </li>
        <li :class='routerUrl === "Shop" ? "action" : ""'>
          <router-link to="/Shop">
            <i class="iconfont icon-gouwuche"></i>
            <p>购物车</p>
          </router-link>
        </li>
        <li :class='routerUrl === "My" ? "action" : ""'>
          <router-link to="/My">
            <i class="iconfont icon-31wode"></i>
            <p>我的</p>
          </router-link>
        </li>
      </ul>
    </footer>
  </div>
</template>
  
<script>
  export default {
    name: 'Footer',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
    }
  },
  // 单向数据流
  // 在子组件当中接受父组件的传值，当父组件的值发生更改，子组件的值也会发生更改
  props: ['routerUrl']
}
</script>
<style scoped>

html {
  font-size: 4.26667vw;
}

* {
  margin: 0;
  padding: 0;
}
/* 底部导航栏 */
footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  border-top: 1px solid #999;
}

footer > ul {
  display: flex;
  justify-content: space-around;
}

footer li a {
  color: black;
}

footer p {
  font-size: 1rem;
}

footer i.iconfont {
  font-size: 1.4rem;
}

li {
  list-style: none;
}
a {
  text-decoration: none;
}
.action a {
  color: skyblue;
}
</style>